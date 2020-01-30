import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit,OnDestroy {

  @Input('userData') userData: any;
  userDataFlag: boolean = false;
  repoUserData: any;

  private _unsubscribe = new Subject<Boolean>();
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    // console.log('item', this.userData);
  }

  detailsEvent(item) {
    this.userDataFlag = !this.userDataFlag;
    let data = item.login;
    this.usersService.getUserRepo(data)
    .pipe(takeUntil(this._unsubscribe))
    .subscribe(
      (success:any) => {
        this.repoUserData = success;
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

}
