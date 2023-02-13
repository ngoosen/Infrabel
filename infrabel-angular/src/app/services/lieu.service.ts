import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  constructor(private _http : HttpClient) { }

  // Renvoie tous les lieux
  getPlaces(){
    return this._http.get<any>("http://localhost:3000/api/v1/lieux")
  }

  // Renvoie le lieu correspondant à l'id
  getOnePlace(id: number){
    return this._http.get<any>("http://localhost:3000/api/v1/lieux/" + id)
  }

  // Renvoie tous les lieux dans la langue entrée
  getPlacesByLanguage(language: string){
    return this._http.get<any>("http://localhost:3000/api/v1/lieux/" + language)
  }

  // Renvoie le lieu correspondant à l'id dans la langue entrée
  getPlaceByIDLanguage(id: number, language: string){
    return this._http.get<any>("http://localhost:3000/api/v1/lieux/" + id + "/" + language)
  }
}
