import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddRepertoireComponent } from './add-repertoire/add-repertoire.component';
import { AdminGuard } from './admin.guard';
import { AppComponent } from './app.component';
import { HallComponent } from './hall/hall.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReservationGuard } from './reservation.guard';


const routes: Routes = [
  {
      path: '',
      component: MainPageComponent,
  },
  {
    path:'seats/:id',
    component: HallComponent,
    canActivate: [ReservationGuard],
  },
  { path: 'addMovie',
   component: AddMovieComponent,
   canActivate: [AdminGuard]
  },
  { path: 'addRepertoire',
  component: AddRepertoireComponent,
  canActivate: [AdminGuard]
 },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
