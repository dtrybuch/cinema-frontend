import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from './_models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient,
    private router: Router) { }

    getAllMovies(): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${environment.apiUrl}/movie`);
     }

    saveMovie(movie: Movie): void {
      this.http.post<any>(`${environment.apiUrl}/movie`, { 
        title: movie.title,
        type: movie.type,
        image: movie.image,
        length: movie.length
      }).subscribe( res => {
        alert("Dodano film")
      },
      error => {
        alert("Błąd. Spróbuj ponownie.")
      })
    }
}
