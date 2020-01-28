import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListComponent } from './pages/home-list/home-list.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [HomeListComponent, HomeLayoutComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [HomeLayoutComponent]
})
export class HomeModule { }
