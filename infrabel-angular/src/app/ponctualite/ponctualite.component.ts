import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { LigneArretService } from '../services/ligne-arret.service';


@Component({
  selector: 'app-ponctualite',
  templateUrl: './ponctualite.component.html',
  styleUrls: ['./ponctualite.component.scss']
})
export class PonctualiteComponent implements OnInit {


  constructor( private _ligneArretService: LigneArretService ){}


  options:string[]=[]

  mycontrol=new FormControl

  filterredOption:Observable<string[]>

  departControl = new FormControl();
  arriveeControl = new FormControl();
  showResult=false


    //filtre recherche
  ngOnInit(): void {
    this._ligneArretService.getStops().subscribe( {
      next: (data) => {
        let temptab = data

        for(let obj of temptab){
          this.options.push(obj.nom_arret)

        }
        this.filterredOption=this.mycontrol.valueChanges.pipe(
          startWith(''),
          map(value=>this._filter(value))
        )
      },
      error: (err) => {
        console.log("POUF " + err);
      }
    })



  }

    private _filter(value:string){
      const filtervalue=value.toLowerCase()
      return this.options.filter(option=>option.toLocaleLowerCase().includes(filtervalue))
  }

  //

  //bouton recherche
  showValues() {
    this.showResult = true;
  }

}
