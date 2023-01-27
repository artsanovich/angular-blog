import {Component, OnInit} from '@angular/core';
import {JsonTableService} from "../../../shared/json-table.service";
import {JPerson} from '../../../shared/interfaces'

@Component({
  selector: 'app-json-table',
  templateUrl: './json-table.component.html',
  styleUrls: ['./json-table.component.scss']
})
export class JsonTableComponent implements OnInit {

  ageSortStatus: boolean | null = null
  dateSortStatus: boolean | null = null
  nameSortStatus: boolean | null = null
  locationSortStatus: boolean | null = null


  constructor(public jsonTableService: JsonTableService) {
  }

  ngOnInit(): void {
    this.jsonTableService.getAllJPersons().subscribe(persons => {
      this.jsonTableService.jPersons = persons
    })
  }

  sortByAge(value: string) {
    if (this.dateSortStatus === true || this.dateSortStatus === false) this.dateSortStatus = null
    if (this.nameSortStatus === true || this.nameSortStatus === false) this.nameSortStatus = null
    if (this.locationSortStatus === true || this.locationSortStatus === false) this.locationSortStatus = null

    if (value === 'firstSort' || value === 'repeat') {
      this.jsonTableService.jPersons = this.jsonTableService.jPersons.sort((a, b) => b.age - a.age)
      this.ageSortStatus = true
    } else if (value === 'secondSort') {
      this.jsonTableService.jPersons = this.jsonTableService.jPersons.sort((a, b) => a.age - b.age)
      this.ageSortStatus = false
    }
  }

  sortByDate(value: string) {
    if (this.ageSortStatus === true || this.ageSortStatus === false) this.ageSortStatus = null
    if (this.nameSortStatus === true || this.nameSortStatus === false) this.nameSortStatus = null
    if (this.locationSortStatus === true || this.locationSortStatus === false) this.locationSortStatus = null

    if (value === 'firstSort' || value === 'repeat') {
      this.jsonTableService.jPersons = this.jsonTableService.jPersons.sort((a, b) => a.birthDate - b.birthDate)
      this.dateSortStatus = true
    } else if (value === 'secondSort') {
      this.jsonTableService.jPersons = this.jsonTableService.jPersons.sort((a, b) => b.birthDate - a.birthDate)
      this.dateSortStatus = false
    }
  }

  sortByName(value: string) {
    if (this.dateSortStatus === true || this.dateSortStatus === false) this.dateSortStatus = null
    if (this.ageSortStatus === true || this.ageSortStatus === false) this.ageSortStatus = null
    if (this.locationSortStatus === true || this.locationSortStatus === false) this.locationSortStatus = null

    if (value === 'firstSort' || value === 'repeat') {
      this.jsonTableService.jPersons.sort(function (a, b): number {
        if (a.name < b.name) return -1
        return 1
      })
      this.nameSortStatus = true
    } else if (value === 'secondSort') {
      this.jsonTableService.jPersons.sort(function (a, b): number {
        if (a.name < b.name) return 1
        return -1
      })
      this.nameSortStatus = false
    }
  }

  sortByLocation(value: string) {
    if (this.dateSortStatus === true || this.dateSortStatus === false) this.dateSortStatus = null
    if (this.ageSortStatus === true || this.ageSortStatus === false) this.ageSortStatus = null
    if (this.nameSortStatus === true || this.nameSortStatus === false) this.nameSortStatus = null

    if (value === 'firstSort' || value === 'repeat') {
      this.jsonTableService.jPersons.sort(function (a, b): number {
        if (a.location < b.location) return -1
        return 1
      })
      this.locationSortStatus = true
    } else if (value === 'secondSort') {
      this.jsonTableService.jPersons.sort(function (a, b): number {
        if (a.location < b.location) return 1
        return -1
      })
      this.locationSortStatus = false
    }
  }

}



