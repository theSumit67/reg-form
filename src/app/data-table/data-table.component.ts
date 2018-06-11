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

  constructor(
    private dtService: DataTableService,
    public dialog: MatDialog ) {
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

  editRow(row, index): void {
    const dialogRef = this.dialog.open(DialogRowEditComponent, {
      width: '250px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const rowIndex = this.rows.findIndex(( r ) => {
        return r.name === row.name;
      });
      this.rows[rowIndex] = result;
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
  selector: 'app-dialog-row-edit',
  template: `
  <h1 mat-dialog-title>Hi {{data.name}}</h1>
  <div mat-dialog-content>
    <p>What's your favorite animal?</p>
    <mat-form-field>
      <input matInput [(ngModel)]="data.name">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.gender">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.age">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.company">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Update</button>
  </div>
  `,
})
export class DialogRowEditComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogRowEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
