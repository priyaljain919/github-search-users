import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  // On Localhost
  public base_url: string = 'https://api.github.com';

  constructor() { }
}
