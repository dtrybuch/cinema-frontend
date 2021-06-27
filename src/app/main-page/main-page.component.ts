import { Component, OnInit } from '@angular/core';
import { RepertoireService } from '../repertoire.service';
import { Movie } from '../_models/Movie';
import { Repertoire } from '../_models/Repertoire';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  repertoires: Repertoire[] = [];

  threeMovies: Movie[] = [];

  isLoading = false;

  constructor( private repertoireService : RepertoireService) { }

  ngOnInit(): void {
    this.getRepertoires();
  }

  getRepertoires(): void {
    this.isLoading = true;
    this.repertoireService.getAllrepertoires().subscribe( res => {
      this.repertoires = res
      this.isLoading = false;
      if(this.repertoires.length > 2)
      {
        this.threeMovies.push(this.repertoires[0].movie);
        this.threeMovies.push(this.repertoires[1].movie);
        this.threeMovies.push(this.repertoires[2].movie);
      }
    },
    error => console.log(error))
  }

}
