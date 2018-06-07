import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(
    private http: HttpClient
  ) { }

  getData() {
    return this.http.get('./assets/company.json');
  }
}
