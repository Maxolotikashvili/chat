import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userName!: string;

  constructor(private chatService: ChatService, private dialog: MatDialog) {}

  //
  sendUserName() {
    this.chatService.sendUser(this.userName)
    this.dialog.closeAll();
  }
}
