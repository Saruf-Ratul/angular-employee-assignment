import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Employee } from 'src/app/employee/Employee';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpClient);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return employee records', () => {
    let employeeRecords = [
      {
        id: 3,
        firstName: 'Mo',
        lastName: 'Abjal khan',
        contactNumber: '9012114316',
        email: 'mh@gmail.com',
        dob: '2021-06-04',
        address: '44-Dahiya',
      },
      {
        id: 4,
        firstName: 'Noorul',
        lastName: 'Hassan',
        contactNumber: '9012114318',
        email: 'mo@gail.com',
        dob: '2021-06-12',
        address: '44-Daia',
      },
    ];

    spyOn(httpMock, 'get').and.returnValue(of(employeeRecords));

    let returnedEmployees: Employee[] = [];

    service.getAllEmployees().subscribe((response) => {
      returnedEmployees = response;
    });
    expect(httpMock.get).toHaveBeenCalled();
    expect(returnedEmployees).toEqual(employeeRecords);
  });

  it('should insert a new employee and return the inserted employee record', () => {
    let employee: Employee = {
      id: 0,
      firstName: 'Mo',
      lastName: 'Abjal',
      contactNumber: '9012114316',
      email: 'mohdafzal330@gmail.com',
      dob: '08/01/1997',
      address: 'Bareilly - UP, India',
    };
    spyOn(httpMock, 'post').and.returnValue(of(employee));

    let newInsertedEmployee;
    service
      .saveUpdateEmployee(0, employee)
      .subscribe((response) => (newInsertedEmployee = response));

    expect(httpMock.post).toHaveBeenCalled();
    expect(newInsertedEmployee).not.toBeNull();
  });

  it('should update the employee and return the updated employee', () => {
    let employee: Employee = {
      id: 2,
      firstName: 'Mo',
      lastName: 'Abjal',
      contactNumber: '9012114316',
      email: 'mohdafzal330@gmail.com',
      dob: '08/01/1997',
      address: 'Bareilly - UP, India',
    };
    spyOn(httpMock, 'put').and.returnValue(of(employee));

    service.saveUpdateEmployee(2, employee).subscribe((response) => {
      expect(httpMock.put).toHaveBeenCalled();
      expect(response).toEqual(employee);
    });
  });

  it('should delete a employee from existing records', () => {
    spyOn(httpMock, 'delete').and.returnValue(of(true));

    service.deleteEmployee(1).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(httpMock.delete).toHaveBeenCalled();
    });
  });
});
