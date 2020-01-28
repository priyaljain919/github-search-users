import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListComponent } from './pages/home-list/home-list.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { AppModule } from '../app.module';
import { HomeCardComponent } from './components/home-card/home-card.component';



@NgModule({
  declarations: [HomeListComponent, HomeLayoutComponent, HomeCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule
  ],


})
export class HomeModule { }
