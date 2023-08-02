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
  messageList: string[] = [];
  userName!: string;

  constructor(private chatService: ChatService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openUserInput();
    this.getUserName();
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
  getUserName() {
    this.chatService.exchangeUserNames().subscribe((user: string) => {
      this.userName = user;
    });
  }

  //
  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  //
  getMessages() {
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }
}
