import { Component, Input } from '@angular/core';
import { User } from '../model';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent {
  @Input() USERS_CONNECTED!: User[];

  constructor() {}
}
