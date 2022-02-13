import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../app/employee/Employee';

export const EMP_SERVICE = new InjectionToken<EmployeeService>(
  'EmployeeService'
);

@Injectable()
export class EmployeeService {
  private configUrl = 'http://localhost:3000/employees';
  constructor(private httpService: HttpClient) {}

  // Service method to get all employee records
  getAllEmployees(): Observable<Employee[]> {
    return this.httpService.get<Employee[]>(this.configUrl);
  }

  //  Service method to insert/update the employees records
  saveUpdateEmployee(id: number, employee: Employee): Observable<Employee> {
    if (id > 0) return this.updateEmployee(id, employee);
    else return this.insertEmployee(employee);
  }

  //  To insert a new employee
  private insertEmployee(employee: Employee) {
    return this.httpService.post<Employee>(this.configUrl, employee);
  }

  //  To update the existing employee
  private updateEmployee(id: number, employee: Employee) {
    return this.httpService.put<Employee>(this.configUrl + '/' + id, employee);
  }

  //  Service method to delete the employees record
  deleteEmployee(id: number) {
    return this.httpService.delete(this.configUrl + '/' + id);
  }
}
