import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchFilterDto } from 'src/pagination/dto/search-filter.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  // 🔹 Create product with multiple images
  async create(createProductDto: CreateProductDto) {
    const { images, ...productData } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...productData,
        images: images?.length
          ? {
            create: images.map((img) => ({
              url: img.url,
              altText: img.altText,
              isMain: img.isMain ?? false,
              sortOrder: img.sortOrder ?? 0,
            })),
          }
          : undefined,
      },
      include: { images: true },
    });
  }

  async findAll(query: SearchFilterDto) {
    const { search, limit = 10, page = 1, minPrice } = query;

    const skip = (page - 1) * limit;

    // build where condition
    const where: any = {
      AND: [
        search
          ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
          : {},
        minPrice
          ? {
            discountedPrice: { lt: minPrice }, // ✅ filter by discountedPrice
          }
          : {},
      ],
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        include: { images: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return new PaginationResponseDto(data, total, page, limit);
  }



  // 🔹 Get product by ID
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  // 🔹 Update product (including images)
  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...productData } = updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(images
          ? {
            images: {
              deleteMany: {}, // remove old images
              create: images.map((img) => ({
                url: img.url,
                altText: img.altText,
                isMain: img.isMain ?? false,
                sortOrder: img.sortOrder ?? 0,
              })),
            },
          }
          : {}),
      },
      include: { images: true },
    });
  }

  // 🔹 Delete product
  async remove(id: string) {
    if (!(await this.prisma.product.findUnique({ where: { id } }))) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prisma.product.delete({ where: { id } });
  }
}
