import { Injectable, OnInit } from '@angular/core';
import users from '../../assets/users.json';
import { roles } from '../../assets/roles.json';

interface Usuario {
  picture: string;
  name: string;
  fathersLastName: string;
  mothersLastName: string;
  email: string;
  roleId: number;
  active: boolean;
}

interface Role {
  id: number;
  position: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService  {
  userArr: Usuario[];
  roles: Role[];

  constructor() {
    this.start();
  }

  start() {
    this.userArr = users.users;
    this.roles = roles;
  }

}
