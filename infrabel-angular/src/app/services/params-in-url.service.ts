import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ParamsInUrlService {

  constructor(private _router: Router) { }

  ponctualityParamsInUrl(params: PonctualityParams){
    this._router.navigate(["/ponctualite/"], {queryParams: {stop: params.stop}})
  }

  incidentParamsInUrl(params: IncidentParams){
    this._router.navigate(["/probleme/"], {queryParams: {stop: params.stop}})
  }
}
export interface PonctualityParams{
  stop: string
}
export interface IncidentParams{
  stop: string
}
