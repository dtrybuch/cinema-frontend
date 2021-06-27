import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RepertoireService } from '../repertoire.service';
import { ReservationService } from '../reservation.service';
import { Repertoire } from '../_models/Repertoire';
import { Reservation } from '../_models/Reservation';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {

  rows: number[] = [];
  columns: number[] = [];
  isCovid = true;
  isLoading = true;
  repertoire: Repertoire;

  reservations: Reservation[] = [];

  chosenSeats: boolean[][] = []

  seats: boolean[][] = []

  constructor(
      public dialog: MatDialog, 
      private repertoireService: RepertoireService,
      private reservationService : ReservationService,
      private route: ActivatedRoute) { 
    this.rows = Array(10).fill(1).map((x,i)=>i); // [0,1,2,3,4]
    this.columns = Array(20).fill(1).map((x,i)=>i); // [0,1,2,3,4]
    this.seats = Array(10).fill(false);
    this.chosenSeats = Array(10).fill(false);
    for(let row in this.rows)
    {
      this.seats[row] = Array(20).fill(false);
      this.chosenSeats[row] = Array(20).fill(false);
    }
    this.isLoading = true;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.repertoireService.getRepertoire(id as unknown as number).subscribe(res => {
      this.repertoire = res;
        this.reservationService.getReservationsByRepertoireId(id as unknown as number).subscribe(reservations => {
          console.log(reservations)
          if(reservations)
          {
            for (let reservation of reservations) {
              this.seats[reservation.x][reservation.y] = true;
            }  
          } 
          this.isLoading = false;
        })
    })
  }
  
  isDisabled(row: number, column: number){
    return this.isCovid && ((row % 2 == 1 && column % 2 == 0) || (row % 2 == 0 && column % 2 == 1)) 
          || this.seats[row][column]
  }

  chooseSeat(row: number, column: number)
  {
    this.chosenSeats[row][column] = !this.chosenSeats[row][column] ;
  }

  reserve() {
    const dialogRef = this.dialog.open(ReservedDialog, {
      data: {
        chosenSeats: this.chosenSeats,
        rows: this.rows,
        columns: this.columns
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result)
      {
        for(let i of this.rows){
          for(let j of this.columns)
          {
            if(this.chosenSeats[i][j])
            {
              let user = JSON.parse(<string>localStorage.getItem("user"));
              let reservation: Reservation = {
                repertoire: this.repertoire,
                x: i,
                y: j,
                id: 0,
                user: user 
              }
              this.reservations.push(reservation);
            }
          }
        }

        this.reservationService.saveReservations(this.reservations);
      }
      
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'reserved-dialog',
  templateUrl: 'reserved-dialog.html',
})
export class ReservedDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    console.log(this.data)
  }
}
