import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MovieService } from '../movie.service';
import { RepertoireService } from '../repertoire.service';
import { Movie } from '../_models/Movie';
import { Repertoire } from '../_models/Repertoire';

@Component({
  selector: 'app-add-repertoire',
  templateUrl: './add-repertoire.component.html',
  styleUrls: ['./add-repertoire.component.scss']
})
export class AddRepertoireComponent implements OnInit {

  movies = new FormControl();

  moviesList: Movie[] = [];

  selectedMovieId: number;

  date: Date;

  isLoading = false;

  constructor(private movieService: MovieService,
    private repertoireService: RepertoireService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.isLoading = true;
    this.movieService.getAllMovies().subscribe(res => {
      console.log(res)
      this.moviesList = res;
      this.isLoading = false;
    })
  }

  saveRepertoire(): void {
    if(!this.selectedMovieId || !this.date)
    {
      alert("Wszystkie pola muszą być uzupelnione!!!");
      return;
    }
    this.date = new Date(this.date);
    this.repertoireService.saveRepertoire(this.selectedMovieId, this.date.getTime());
  }

}
