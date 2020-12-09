import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'add-edit',
    loadChildren: () => import('./pages/add-edit/add-edit.module').then(m => m.AddEditPageModule)
  },
  {
    path: 'add-edit/:id',
    loadChildren: () => import('./pages/add-edit/add-edit.module').then(m => m.AddEditPageModule)
  },
  {
    path: 'timer',
    loadChildren: () => import('./pages/timer/timer.module').then(m => m.TimerPageModule)
  },
  {
    path: 'timer/:id',
    loadChildren: () => import('./pages/timer/timer.module').then(m => m.TimerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
