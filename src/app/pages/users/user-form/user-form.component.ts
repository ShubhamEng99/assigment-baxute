import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from '../../../core/models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  selectedUser!: User;
  selectedUserSubscription!: Subscription;
  error = '';
  success = '';
  constructor(
    public dataService: DataService,
    public userService: UserService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
    });
    this.selectedUserSubscription = this.dataService.selectedUser.subscribe(
      (res) => {
        if (res) {
          this.selectedUser = res;
          this.userForm.patchValue(this.selectedUser);
        }
      }
    );
  }

  submit() {
    let payload = { ...this.userForm.value };
    if (this.selectedUser) {
      payload.id = this.selectedUser.id;
      this.updateUser(payload);
    } else {
      payload.id = Math.floor(1000 + Math.random() * 9000);
      this.addUser(payload);
    }
  }

  addUser(user: User) {
    this.userService.addUser(user).subscribe({
      next: (res) => {
        this.dataService.userAction.next(true);
        this.success = 'User added successfully';
        setTimeout(() => {
          this.success = '';
        }, 2000);
      },
      error: (err) => {
        this.error = 'Something went wrong';
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe({
      next: (res) => {
        this.dataService.userAction.next(true);
        this.success = 'User updated successfully';
        setTimeout(() => {
          this.success = '';
        }, 2000);
      },
      error: (err) => {
        this.error = 'Something went wrong';
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }
  ngOnDestroy(): void {
    this.selectedUserSubscription.unsubscribe();
  }
}
