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
  @ViewChild('dt') dataTable: DatatableComponent;

  constructor( private dtService: DataTableService ) {
    this.dtService.getData().subscribe(data => {
      this.rows = data;
    });
  }

  ngOnInit() {
    // console.log( this.dataTable );
  }

  changeLimit (value) {
    this.dataTable.limit = Number(value);
    this.dataTable.recalculate();
  }
}
