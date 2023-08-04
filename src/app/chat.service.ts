import { Injectable } from "@angular/core";
import { API_URL } from "./api-url";
import { io } from "socket.io-client";
import { BehaviorSubject } from "rxjs";
import { Data } from "./model";
import { User } from "./model";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    data!: Data;
    usersList!: User[];

    public mainUser$: BehaviorSubject<string> = new BehaviorSubject('');
    public data$: BehaviorSubject<Data> = new BehaviorSubject(this.data);
    public userList$: BehaviorSubject<User[]> = new BehaviorSubject(this.usersList);

    socket = io(API_URL);

    constructor() { }

    //
    sendUserToSocket(user: string) {
        this.socket.emit('user', user);
        this.mainUser$.next(user)
        return this.mainUser$.asObservable();
    }

    //
    getUserList() {
        this.socket.on('userlist', (userlist: User[]) => {
            this.userList$.next(userlist);
        });

        return this.userList$.asObservable();
    }

    //
    sendMessage(message: string) {
        this.socket.emit('message', message);
    }

    //
    getNewMessage() {
        this.socket.on('data', (data) => {
            this.data$.next(data);
        });

        return this.data$.asObservable();
    };
}