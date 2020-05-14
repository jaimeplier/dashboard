import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users;
  currentIdx: number;
  listMode = true;
  showModal = false;

  userForm = this.fb.group({
    picture: ['http://www.fillmurray.com/200/300'],
    name: [],
    fathersLastName: [],
    mothersLastName: [],
    email: [],
    roleId: [],
    active: [false]
  });

  constructor(private userService: UsersService, private fb: FormBuilder) { }

  ngOnInit() {
    this.users = this.userService.userArr;
  }

  getRole(id) {
    return this.userService.roles.find(rol => rol.id === id).position;
  }

  changeStatus(idx) {
    this.userService.userArr[idx].active = !this.userService.userArr[idx].active;
  }

  removeUser(idx) {
    this.userService.userArr.splice(idx, 1);
  }

  displayModal() {
    this.showModal = true;
  }

  hideModal() {
    this.currentIdx = null;
    this.showModal = false;
    this.clearForm();
  }

  changeView() {
    this.listMode = !this.listMode;
  }

  setStatus(value) {
    this.userForm.patchValue({active: value});
  }

  editUser(idx) {
    this.currentIdx = idx;
    const user = this.userService.userArr[idx];
    this.userForm.patchValue({
      picture: user.picture,
    name: user.name,
    fathersLastName: user.fathersLastName,
    mothersLastName: user.mothersLastName,
    email: user.email,
    roleId: user.roleId,
    active: user.active
    });

    this.showModal = true;
  }

  clearForm() {
    this.userForm.patchValue({
      picture: 'http://www.fillmurray.com/200/300',
      name: null,
      fathersLastName: null,
      mothersLastName: null,
      email: null,
      roleId: null,
      active: false,
    });
  }

  saveForm() {
    this.userForm.patchValue({roleId: +this.userForm.get('roleId').value});
    if (!this.currentIdx) {
      this.userService.userArr.splice(this.currentIdx, 1, this.userForm.value);
    } else {
      this.userService.userArr.push(this.userForm.value);
    }
    this.showModal = false;
    this.clearForm();
    this.currentIdx = null;
  }
}
