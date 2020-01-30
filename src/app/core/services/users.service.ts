import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  subscribe: any;
  public commentListData: any;
  public username: string;
  private _baseUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private baseService: BaseService
  ) {
    this._baseUrl = this.baseService.base_url;
  }

  // get repos of a particular users
  getUserRepo(data) {
    return this.http.get('https://api.github.com/users/' + data + '/repos');
  }

  // search users with pagination
  searchUsers(data) {
    const PARAMS = new HttpParams().set('q', data.searchTerm).set('page', data.page)
    return this.http
      .get(this._baseUrl + '/search/users', {
        params: PARAMS
      }).pipe(
        retry(1),
        catchError(error => {
          return throwError(error);
        })
      )
  }

}
