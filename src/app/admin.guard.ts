import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

   canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;

          return this.checkAdmin(url);
      }

      checkAdmin(url: string): true | UrlTree {
         let val: string | null = localStorage.getItem('isAdmin');

         if(val != null && val == "true"){
               return true;
         } else {
            return this.router.parseUrl('/');
         }
      }
  
}
