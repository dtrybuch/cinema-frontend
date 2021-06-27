import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn = false;
  username: string | null = "";
  isAdmin: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.getUserLoggedin();
    });
    this.getUserLoggedin();
 }
  getUserLoggedin(): void {
    let storeData = localStorage.getItem("isUserLoggedIn");
    this.username = localStorage.getItem("username");
    this.isAdmin = false;
    if(localStorage.getItem("isAdmin") == "true")
      this.isAdmin = true;
    if( storeData != null && storeData == "true")
       this.isUserLoggedIn = true;
    else
       this.isUserLoggedIn = false;
  }

}
