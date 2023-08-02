import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat';
  newMessage!: string;
  data: {user: string, id: string, message: string}[] = [];
  usersList: {name: string, id: string}[] = [];

  constructor(private chatService: ChatService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openUserInput();
    this.getUserList();
    this.getMessages();
  }

  //
  openUserInput() {
    this.dialog.open(UserComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
  }

  //
  getUserList() {
    this.chatService.getUserList().subscribe((usersList) => {
      this.usersList = usersList;
      console.log(this.usersList)
      console.log(this.data)
      // console.log(this.data[0].id! === usersList[0].id!);
    })
  }

  //
  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  //
  getMessages() {
    this.chatService.getNewMessage().subscribe((data: {user: string, id: string, message: string}) => {
      if (data?.user) {
        this.data.push(data);
      }
    })
  }
}
