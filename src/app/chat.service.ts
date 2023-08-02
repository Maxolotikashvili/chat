import { Injectable } from "@angular/core";
import { API_URL } from "./api-url";
import { io } from "socket.io-client";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    public message$: BehaviorSubject<string> = new BehaviorSubject('');
    public user$: BehaviorSubject<string> = new BehaviorSubject('');

    socket = io(API_URL);

    constructor() { };

    //
    sendMessage(message: string) {
        this.socket.emit('message', message);
    }

    //
    getNewMessage = () => {
        this.socket.on('message', (message) => {
            this.message$.next(message);
        });

        return this.message$.asObservable();
    };

    //
    exchangeUserNames(user?: string) {
        if (user) {
            this.user$.next(user);
        }
        
        return this.user$.asObservable();
    }
}