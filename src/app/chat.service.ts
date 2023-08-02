import { Injectable } from "@angular/core";
import { API_URL } from "./api-url";
import { io } from "socket.io-client";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    data!: {user: string, id: string, message: string}
    user!: {name: string, id: string}[];

    public data$: BehaviorSubject<{user: string, id: string, message: string}> = new BehaviorSubject(this.data);
    public userLisT$: BehaviorSubject<{name: string, id: string}[]> = new BehaviorSubject(this.user);
    socket = io(API_URL);

    constructor() { }

    //
    sendUser(user: string) {
        this.socket.emit('user', user);
    }

    //
    getUserList() {
        this.socket.on('userlist', (userlist: {name: string, id: string}[]) => {
            this.userLisT$.next(userlist);
        });

        return this.userLisT$.asObservable();
    }

    //
    sendMessage(message: string) {
        this.socket.emit('message', message);
    }

    //
    getNewMessage = () => {
        this.socket.on('data', (data) => {
            this.data$.next(data);
        });

        return this.data$.asObservable();
    };
}