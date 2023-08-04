import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from './user/user.component';
import { Data, User } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat';
  newMessage!: string;
  data: Data[] = [];
  usersList: User[] = [];
  mainUser!: string;
  sendMessageSound: HTMLAudioElement = new Audio('/assets/sent-sound.mp3');
  receivedMessageSound: HTMLAudioElement = new Audio('/assets/received-sound.mp3');
  userConnectedNotification!: string;
  disconnectedUser!: string;

  constructor(private chatService: ChatService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.openUserInput();
    this.getMainUser();
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
  getMainUser() {
    this.chatService.mainUser$.subscribe((mainUser: string) => {
      this.mainUser = mainUser;
    })
  }

  //
  getUserList() {
    this.chatService.getUserList().subscribe((usersList: User[]) => {

      if (usersList) {
        if (this.usersList.length > usersList.length) {
          for (let user of usersList) {
            this.disconnectedUser = this.usersList.find((item) => item.id !== user.id)?.name!;

            setTimeout(() => {
              this.disconnectedUser = '';
            }, 5000);
          }
        }

        this.userConnectedNotification = usersList[usersList.length - 1].name;
        this.usersList = Array.from(usersList);

      }
    })
  }

  //
  sendMessage() {
    this.sendMessageSound.pause()
    this.sendMessageSound.currentTime = 0;
    this.chatService.sendMessage(this.newMessage);
    this.sendMessageSound.play();
    this.newMessage = '';
  }

  //
  getMessages() {
    this.chatService.getNewMessage().subscribe((data: Data) => {
      if (data?.user) {
        this.data.push(data);
        if (this.mainUser !== data.user) {
          this.receivedMessageSound.pause();
          this.receivedMessageSound.currentTime = 0;
          this.receivedMessageSound.play();
        }
      }
    })
  }
}
