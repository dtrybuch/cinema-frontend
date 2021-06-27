import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../_models/Movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addedMovie: Movie = {
    title:'',
    length: 0,
    type: "",
    image: null,
    imageBase: "",
    id: 0
  };
  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
  }
  
  handleFileInput(event: Event) {
    let inputEl = (event.target as HTMLInputElement);
    if (inputEl.files 
      && inputEl.files.length
      && inputEl.files.length > 0) 
    {
      let reader = new FileReader();
      reader.readAsDataURL(inputEl.files[0]);
      reader.onload = (event2) => {
        this.addedMovie.image = reader.result;
      }
    }
  }
  saveMovie(){
    console.log(this.addedMovie);
    this.movieService.saveMovie(this.addedMovie);
  }
}
