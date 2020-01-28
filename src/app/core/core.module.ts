import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectLayoutComponent } from './layouts/project-layout/project-layout.component';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [ProjectLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    ProjectLayoutComponent,
    NgxPaginationModule
  ]
})
export class CoreModule { }
