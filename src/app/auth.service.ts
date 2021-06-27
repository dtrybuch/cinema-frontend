import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Role } from './_models/Role';
@Injectable({
   providedIn: 'root'
})
export class AuthService implements OnInit {

  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient,
    private router: Router){}

    ngOnInit(): void {
    }

   login(username: string, password: string): void {
      this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password }).subscribe( res => {
        this.isUserLoggedIn = true;
        localStorage.setItem('isUserLoggedIn', "true"); 
        this.router.navigate(['/']); 
        localStorage.setItem('user', JSON.stringify(res)); 
        localStorage.setItem('username', username); 
        localStorage.setItem('isAdmin', res.role.name == "Admin" ? "true" : "false"); 
      },
      error => {
        alert("Nieprawidlowy uzytkownik lub haslo")
      })
   }

   logout(): void {
   this.isUserLoggedIn = false;
      localStorage.removeItem('isUserLoggedIn'); 
      localStorage.removeItem('username'); 
      localStorage.removeItem('isAdmin'); 
      localStorage.removeItem('user'); 
   }
}