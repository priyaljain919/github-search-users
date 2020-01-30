import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectLayoutComponent } from './layouts/project-layout/project-layout.component';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [ProjectLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    DropdownModule,
    FormsModule
  ],
  exports: [
    ProjectLayoutComponent,
    NgxPaginationModule,
    DropdownModule,
    FormsModule
  ]
})
export class CoreModule { }
