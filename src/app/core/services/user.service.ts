import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import User from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.baseUrl
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.baseUrl);
  }
  addUser(data:User){
    return this.http.post(this.baseUrl,data)
  }
  deleteUser(id:number){
    return this.http.delete(this.baseUrl+'/'+id)
  }
  updateUser(data:User){
    return this.http.put(this.baseUrl+'/'+data.id,data)
  }
}
