import { Controller, Post, Get, Patch, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @UseGuards(JwtAuthGuard)
    @Post(':productId')
    create(
        @Request() req,
        @Param('productId') productId: string,
        @Body() dto: CreateReviewDto,
    ) {
        return this.reviewService.create(req.user.id, productId, dto);
    }

    @Get('product/:productId')
    findAll(@Param('productId') productId: string) {
        return this.reviewService.findAll(productId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':reviewId')
    update(
        @Request() req,
        @Param('reviewId') reviewId: string,
        @Body() dto: UpdateReviewDto,
    ) {
        return this.reviewService.update(req.user.id, reviewId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':reviewId')
    remove(@Request() req, @Param('reviewId') reviewId: string) {
        return this.reviewService.remove(req.user.id, reviewId);
    }
}
