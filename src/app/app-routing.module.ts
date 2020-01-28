import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ALL_ROUTES } from './core/routes/all.routes';
import { ProjectLayoutComponent } from 'src/app/core/layouts/project-layout/project-layout.component';
import { CoreModule } from './core/core.module';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectLayoutComponent,
    children: ALL_ROUTES
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
