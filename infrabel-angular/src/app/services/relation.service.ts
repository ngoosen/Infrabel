import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RelationService {

  constructor(private _http: HttpClient) { }

  // Renvoie tous les relations
  getRelations(){
    return this._http.get<any>("http://localhost:3000/api/v1/relations")
  }

  // Renvoie la relation correspondant à l'id
  getOneRelation(id: number){
    return this._http.get<any>("http://localhost:3000/api/v1/relations/" + id)
  }
}
