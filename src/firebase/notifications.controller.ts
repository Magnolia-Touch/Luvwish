import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly firebaseService: FirebaseService) { }

    @Post('send')
    async send(@Body() body: { token: string; title: string; message: string }) {
        return this.firebaseService.sendNotification(
            body.token,
            body.title,
            body.message,
        );
    }
}
