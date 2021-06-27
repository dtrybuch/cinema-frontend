import { Pipe, PipeTransform } from '@angular/core';
import { Repertoire } from './_models/Repertoire';

@Pipe({
  name: 'searchRepertoire'
})
export class SearchRepertoirePipe implements PipeTransform {

  transform(value: Repertoire[], date: Date): Repertoire[] {

    if(!value) return value;
    if(!date) return value;
    return value.filter(function(repertoire){
        return (new Date(repertoire.date)).getDate() == (new Date(date)).getDate()
          && (new Date(repertoire.date)).getMonth() == (new Date(date)).getMonth()
          && (new Date(repertoire.date)).getFullYear() == (new Date(date)).getFullYear()
    });
}

}
