import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { DataTableService } from './data-table.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  rows;
  temp;
  columns = [
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Age' }
  ];
  isChecked = true;

  @ViewChild('dt') dataTable: DatatableComponent;

  constructor( private dtService: DataTableService ) {
    this.dtService.getData().subscribe(data => {
      this.temp = data[0];
      this.rows = data;
    });
  }

  ngOnInit() {
    console.log( this.dataTable );
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

  toggleCol() {
    this.isChecked = this.isChecked ? false : true;

    if (this.isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== 'Company';
      });
    } else {
      this.columns = [...this.columns, { name: 'Company' }];
    }

  }

  editRow(row): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }

  deleteRow( row, rowIndex ) {

    // console.log ( 'deleting . . . '  +  this.rows[rowIndex] );
    // delete this.rows[rowIndex];
    this.rows = this.rows.filter( r => {
      return row.name !== r.name;
    });

  }

}

//

@Component({
  selector: 'dialog-row-edit',
  templateUrl: 'dialog-row-edit.html',
})
export class DialogRowEdit {

  constructor(
    public dialogRef: MatDialogRef<DialogRowEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
