import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from './_models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private router: Router) { }

  getReservationsByRepertoireId(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.apiUrl}/reservation/${id}`);
   }
  saveReservations(reservations: Reservation[]): void {
    this.http.post<any>(`${environment.apiUrl}/reservation`, reservations
    ).subscribe( res => {
      alert("Zarezerwowano.")
      this.router.navigate(['/']); 
    },
    error => {
      alert("Błąd.")
    })
  }
}
