import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableService } from './data-table.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  rows;
  temp;

  @ViewChild('dt') dataTable: DatatableComponent;

  constructor( private dtService: DataTableService ) {
    this.dtService.getData().subscribe(data => {
      this.temp = [...data];
      this.rows = data;
    });
  }

  ngOnInit() {
    // console.log( this.dataTable );
  }

  changeLimit (value) {
    this.dataTable.limit = Number(value);
    this.rows = [...this.rows];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.dataTable.offset = 0;
  }

}
