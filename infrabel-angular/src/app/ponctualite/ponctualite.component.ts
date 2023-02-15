import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { LigneArretService } from '../services/ligne-arret.service';
import {InstantService} from'../services/instant.service';
import {PonctualiteJ1Service} from '../services/ponctualite-j1.service';



@Component({
  selector: 'app-ponctualite',
  templateUrl: './ponctualite.component.html',
  styleUrls: ['./ponctualite.component.scss']
})
export class PonctualiteComponent implements OnInit {


  constructor( private _ligneArretService: LigneArretService ,  private _InstantService :InstantService , private _Ponctulité: PonctualiteJ1Service){}


  options:string[]=[]
  instant: string[]=[]


  mycontrol=new FormControl

  filterredOption:Observable<string[]>= EMPTY
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
        console.log("Error " + err);
      }
    })

    this._InstantService.getInstants().subscribe({
      next: (inst)=>{
          let tempInst= inst

          for(let opt of tempInst){
            this.instant.push(opt.fr_instant)
          }
      }
    })

  }

    //fonction de filtrage des options
    private _filter(value:string){
      const filtervalue=value.toLowerCase()
      return this.options.filter(option=>option.toLocaleLowerCase().includes(filtervalue))
  }

  //

  //fonction déclenchée par le bouton recherche
  showValues() {
    this.showResult = true;
  }

}


