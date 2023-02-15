import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDataService {

  constructor() { }
}
export interface DataFormat{
  name: string,
  value: number
}
export interface GroupedDataFormat{
  name: string,
  series: DataFormat[]
}
