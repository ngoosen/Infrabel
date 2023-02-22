import { DataFormat, GroupedDataFormat } from "../services/format-data.service";

export let data: GroupedDataFormat[] = [
{
  name: "Retard en secondes",
  series: [
    {name: "01/01", value: 1145},
    {name: "02/01", value: 1745},
    {name: "03/01", value: 2010},
    {name: "04/01", value: 1203},
    {name: "05/01", value: 2001},
    {name: "06/01", value: 2210},
    {name: "07/01", value: 1487},
    {name: "08/01", value: 1397},
    {name: "09/01", value: 2513},
    {name: "10/01", value: 1970},
    {name: "11/01", value: 2014},
    {name: "12/01", value: 3002},
    {name: "13/01", value: 4210},
    {name: "14/01", value: 1038},
    {name: "15/01", value: 2078},
    {name: "16/01", value: 1964},
    {name: "17/01", value: 1993},
    {name: "18/01", value: 2005},
    {name: "19/01", value: 4281},
    {name: "20/01", value: 1987},
    {name: "21/01", value: 3511},
    {name: "22/01", value: 1237},
    {name: "23/01", value: 1237},
    {name: "24/01", value: 1237},
    {name: "25/01", value: 1237},
    {name: "26/01", value: 1237},
    {name: "27/01", value: 1237},
    {name: "28/01", value: 1237},
    {name: "29/01", value: 1237},
    {name: "30/01", value: 1237},
    {name: "31/01", value: 1237}
  ]
},
{
  name: "Nombre de trains supprimés",
  series: [
    {name: "01/01", value: 174},
    {name: "02/01", value: 95},
    {name: "03/01", value: 154},
    {name: "04/01", value: 45},
    {name: "05/01", value: 75},
    {name: "06/01", value: 124},
    {name: "07/01", value: 24},
    {name: "08/01", value: 6},
    {name: "09/01", value: 145},
    {name: "10/01", value: 35},
    {name: "11/01", value: 147},
    {name: "12/01", value: 25},
    {name: "13/01", value: 34},
    {name: "14/01", value: 169},
    {name: "15/01", value: 214},
    {name: "16/01", value: 20},
    {name: "17/01", value: 85},
    {name: "18/01", value: 73},
    {name: "19/01", value: 62},
    {name: "20/01", value: 104},
    {name: "21/01", value: 14},
    {name: "22/01", value: 27},
    {name: "23/01", value: 154},
    {name: "24/01", value: 38},
    {name: "25/01", value: 67},
    {name: "26/01", value: 99},
    {name: "27/01", value: 112},
    {name: "28/01", value: 157},
    {name: "29/01", value: 45},
    {name: "30/01", value: 76},
    {name: "31/01", value: 68}
  ]
}
]
export let pieChartIncidentTypes: DataFormat[] = [
  {name: "Heurt d'une personne", value: 12},
  {name: "Vol de câbles", value: 84},
  {name: "Intrusion dans les voies", value: 34},
  {name: "Catastrophes naturelles", value: 45},
  {name: "La dev en PLS sur le code", value: 174}
]
