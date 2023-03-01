import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NumTrainService {

  constructor(private _http: HttpClient) { }

  // Renvoie tous les numéros de train
  getTrainNumbers(){
    return this._http.get<NumTrainData[]>("http://localhost:3000/api/v1/num_train")
  }

  // Renvoie le numéro de train correspondant à l'id
  getOneTrainNumber(id: number){
    return this._http.get<NumTrainData[]>("http://localhost:3000/api/v1/num_train/" + id)
  }
}
export interface NumTrainData{
  id_num_train: number,
  num_train: number,
  date: Date,
  instant: string,
  relation: string
}
