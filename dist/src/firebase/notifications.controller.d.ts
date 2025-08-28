import { FirebaseService } from './firebase.service';
export declare class NotificationsController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    send(body: {
        token: string;
        title: string;
        message: string;
    }): Promise<string>;
}
