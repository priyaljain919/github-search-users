import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


interface Search {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit, OnDestroy {

  private _unsubscribe = new Subject<Boolean>();
  userData: any;
  p: number = 1;
  searchValue: string = '';

  searches$: Observable<Search[]>;

  searchList$: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getAllUsers().pipe(takeUntil(this._unsubscribe)).subscribe((success: any) => {
        this.userData = success;
        console.log('user data',this.userData);
    },
    error => {
        console.log(error);
    }
  
  )
}


search(term: string): void {
  this.searchTerms.next(term);
}

searchExpertProfile() {
  this.searchList$ = this.searchTerms.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term: string) => {
      // console.log(term);
      let data = {
        q: term
      }

     
        return this.userService.searchUsers(data);
  
    })
  );

  this.searchList$.subscribe(success => {
    console.log(success);
  },
  error => {
    console.log(error);
  }
);
}

ngOnDestroy() {
  this._unsubscribe.next(true);
  this._unsubscribe.complete();
}

}
