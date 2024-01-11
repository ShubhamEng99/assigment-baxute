import { Component, OnDestroy, OnInit } from '@angular/core';
import User from '../../../core/models/user.interface';
import { UserService } from '../../../core/services/user.service';
import { DataService } from '../../../core/services/data.service';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  userActionSubscription!: Subscription;
  constructor(
    public userService: UserService,
    public dataService: DataService,
    public router: Router,
    public modal:NgbModal
  ) {}
  ngOnInit(): void {
    this.getUsers();
   this.userActionSubscription= this.dataService.userAction.subscribe(
      (res) => {
        if (res) {
          this.getUsers();
        }
      }
    );
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: (err: any) => {},
    });
  }

  selectUser(user?: User) {
    this.dataService.selectedUser.next(user || null);
    this.modal.open(UserFormComponent)
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.getUsers();
      },
      error: (err) => {},
    });
  }

  ngOnDestroy(): void {
   this.userActionSubscription.unsubscribe()
  }
}
