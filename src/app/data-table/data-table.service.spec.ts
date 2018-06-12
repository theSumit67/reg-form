import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataTableService } from './data-table.service';

const mockResponse = [
  {
    name: 'Ethel Price',
    gender: 'female',
    company: 'Johnson, Johnson and Partners, LLC CMP DDC',
    age: 22
  },
  {
    name: 'Claudine Neal',
    gender: 'female',
    company: 'Sealoud',
    age: 55
  }
];

describe('DataTable Service', () => {
  // let service: DataTableService;
  let injector: TestBed;
  let service: DataTableService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataTableService ]
    });

    injector = getTestBed();
    service = injector.get(DataTableService);
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should return an Observable<any[]>', () => {

    service.getData().subscribe( resData => {
      // expect(resData.length).toBe(2);
      console.log ( resData );
      expect(resData).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`./assets/company.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

  });

});
