import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  subscribe: any;
  public commentListData: any;

  public  username: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private baseService: BaseService
  ) {
    // this.baseUrl = this.baseService.base_url;
    this.username = 'varun1505';
  }


  getAllUsers() {
    return this.http.get('https://api.github.com/users/' + this.username + '/repos');
  }

  searchUsers(data) {
    const params = {
      q: data.searchString
    };
    return this.http
      .get('https://api.github.com/users/' + {
        params: params
      })
  }
}
