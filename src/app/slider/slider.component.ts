import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../_models/Movie';
import { Repertoire } from '../_models/Repertoire';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() movies: Movie[] = [];
  constructor(config: NgbCarouselConfig) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
   }

  ngOnInit(): void {
  }

  getImageUrl(movie: Movie): any {
    console.log(movie.imageBase);
    return `data:image/jpeg;base64,${movie.image}`;
  }

}
