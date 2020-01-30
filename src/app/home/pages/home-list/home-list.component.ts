import { Component, OnInit, OnDestroy, Pipe, Injectable } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit, OnDestroy {

  currentPage = 1;
  totalRecords: number;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any;

  private _unsubscribe = new Subject<boolean>();
  usersList: any;

  sortOptions: any[];

  selectedSortOption: any;

  isDataLoading = false;
  originalUsersList: any[];

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
    //An array of cities
    this.sortOptions = [
      { name: 'Sort By Name', value: 'default' },
      { name: 'Name (A - Z)', value: 'alpha-asc' },
      { name: 'Name (Z - A)', value: 'alpha-desc' },
      { name: 'Rank upwards', value: 'rank-asc' },
      { name: 'Rank downwards', value: 'rank-desc' }
    ];

    this.selectedSortOption = this.sortOptions[0].value;

    this.initiateSearch();
  }

  initiateSearch() {
    this.isDataLoading = true;
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith('a'),
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers({
        page: (this.currentPage).toString(),
        searchTerm: term
      }))
    ).subscribe((response: any) => {
     
      this.usersList = response.items;
      if (this.selectedSortOption !== 'default') {
        this.selectSortOption(this.selectedSortOption);
      }
      this.totalRecords = +response.total_count;
      this.isDataLoading = false;
    }, error => {
      this.isDataLoading = false;
      console.log(error);
    });
  }

  filterGlobal(searchTerm) {
    this.currentPage = 1;

    if (!searchTerm) {
      searchTerm = 'a'
    };

    this.searchTerms$.next(searchTerm);
  }

  pageChanged(event) {
    this.currentPage = event;
    this.getGithubUsers();
  }

  getGithubUsers() {
    this.isDataLoading = true;
    this.userService.searchUsers({
      page: (this.currentPage).toString(),
      searchTerm: this.searchBar ? this.searchBar : 'a'
    }).pipe(takeUntil(this._unsubscribe)).subscribe((response: any) => {
      this.usersList = response.items;
      if (this.selectedSortOption !== 'default') {
        this.selectSortOption(this.selectedSortOption);
      }
      this.totalRecords = +response.total_count;
      this.isDataLoading = false;
    }, error => {
      console.log(error);
      this.isDataLoading = false;
    });
  }

  selectSortOption(event) {
    switch (event) {
      case 'alpha-asc':
        this.selectedSortOption = event;
        this.usersList = this.usersList.sort((a, b) => {
          const textA = a.login.toUpperCase();
          const textB = b.login.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        break;

      case 'alpha-desc':
        this.selectedSortOption = event;
        this.usersList = this.usersList.sort((a, b) => {
          const textA = a.login.toUpperCase();
          const textB = b.login.toUpperCase();
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        });
        break;

      case 'rank-asc':
        this.selectedSortOption = event;
        this.usersList = this.usersList.sort((a, b) => {
          const textA = a.score;
          const textB = b.score;
          return textA - textB;
        });
        break;

      case 'rank-desc':
        this.selectedSortOption = event;
        this.usersList = this.usersList.sort((a, b) => {
          const textA = a.score;
          const textB = b.score;
          return textB - textA;
        });
        break;

      case 'default':
        this.getGithubUsers();
        break;
    }
  }

  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

}
