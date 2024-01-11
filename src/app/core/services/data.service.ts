import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  selectedUser = new BehaviorSubject<User | null>(null);
  userAction = new BehaviorSubject<boolean>(false);
  constructor() {}
}
