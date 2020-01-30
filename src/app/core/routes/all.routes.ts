import { Routes } from '@angular/router';

export const ALL_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../home/home.module').then(m => m.HomeModule)
  },
];
