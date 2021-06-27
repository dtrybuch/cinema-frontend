import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repertoire } from './_models/Repertoire';

@Injectable({
  providedIn: 'root'
})
export class RepertoireService {

  constructor(private http: HttpClient,
    private router: Router){}

    ngOnInit(): void {
    }

   getAllrepertoires(): Observable<Repertoire[]> {
    return this.http.get<Repertoire[]>(`${environment.apiUrl}/repertoire`);
   }
   getRepertoire(id: number): Observable<Repertoire> {
    return this.http.get<Repertoire>(`${environment.apiUrl}/repertoire/${id}`);
   }
   saveRepertoire(selectedMovieId: number, date: number): void {
    this.http.post<any>(`${environment.apiUrl}/repertoire`, { 
      date: date,
      movieId: selectedMovieId
    }).subscribe( res => {
      alert("Repertoire added.")
    },
    error => {
      alert("Erroe. Try one more time.")
    })
  }
}
