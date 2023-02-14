import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PonctualiteJ1Service {

  constructor(private _http: HttpClient) { }

  // Renvoie toutes les données de ponctualité J-1
  getPonctuality(){
    return this._http.get<any>("http://localhost:3000/api/v1/ponctualite_J-1")
  }

  // Renvoie une donnée de ponctualité J-1 correspondant à l'id entrée
  getOnePonctuality(id: number){
    return this._http.get<any>("http://localhost:3000/api/v1/ponctualite_J-1/" + id)
  }

  getPonctualityByStop(stop: string){
    return this._http.get<any>("http://localhost:3000/api/v1/ponctualite_J-1/" + stop.toUpperCase())
  }
}
