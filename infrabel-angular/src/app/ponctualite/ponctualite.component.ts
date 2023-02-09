import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';


@Component({
  selector: 'app-ponctualite',
  templateUrl: './ponctualite.component.html',
  styleUrls: ['./ponctualite.component.scss']
})
export class PonctualiteComponent implements OnInit {

  options:string[]=["Gare du nord", "Delta","Ottignies"];

  mycontrol=new FormControl

  filterredOption:Observable<string[]>

    //filtre recherche
  ngOnInit(): void {
    this.filterredOption=this.mycontrol.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value))
    )
  }

    private _filter(value:string){
    const filtervalue=value.toLowerCase()
    return this.options.filter(option=>option.toLocaleLowerCase().includes(filtervalue))
  }

  //

  //bouton recherche

}
