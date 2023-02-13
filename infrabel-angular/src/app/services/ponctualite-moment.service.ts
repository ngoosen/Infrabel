import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PonctualiteMomentService {

  constructor(private _http: HttpClient) { }

  // Renvoie toutes les ponctualités par relation par moment
  getPonctuality(){
    return this._http.get<any>("http://localhost:3000/api/v1/ponctualite_des_relations_IC_par_moment")
  }

  // Renvoie une ponctualité par relation et moment correspondant à l'id entrée
  getOnePonctuality(id: number){
    return this._http.get<any>("http://localhost:3000/api/v1/ponctualite_des_relations_IC_par_moment/" + id)
  }
}
