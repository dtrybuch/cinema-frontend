import { Component, Input, OnInit } from '@angular/core';
import { RepertoireService } from '../repertoire.service';
import { Repertoire } from '../_models/Repertoire';

@Component({
  selector: 'app-repertoire-list',
  templateUrl: './repertoire-list.component.html',
  styleUrls: ['./repertoire-list.component.scss']
})
export class RepertoireListComponent implements OnInit {

  @Input() repertoires: Repertoire[];
  selectedDate:Date;

  constructor() { }

  ngOnInit(): void {

  }

  getImageUrl(repertoire: Repertoire): any {
    console.log(repertoire.movie.imageBase);
    return `data:image/jpeg;base64,${repertoire.movie.image}`;
  }

}
