import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    // On production
    // public base_url: string = 'http://career-portal.ams.cloudswitches.com/api/';

    // On Localhost
    public base_url: string = 'https://api.github.com/';
    //public base_url: string = 'http://localhost:8641/api/';

    constructor(private http: HttpClient) { }
}
