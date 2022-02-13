import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { EmployeeService, EMP_SERVICE } from 'src/services/employee.service';
import { Employee } from './Employee';
import { EmployeeComponent } from './employee.component';

let translations: any = { CARDS_TITLE: 'This is a test' };

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let service: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: FakeLoader,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [{ provide: EMP_SERVICE, useClass: EmployeeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EMP_SERVICE);
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 6 controls', () => {
    expect(component.form.contains('firstName')).toBeTruthy();
    expect(component.form.contains('lastName')).toBeTruthy();
    expect(component.form.contains('contactNumber')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('dob')).toBeTruthy();
    expect(component.form.contains('address')).toBeTruthy();
  });

  it('should create the controls as required', () => {
    let firstName = component.form.get('firstName');
    let lastName = component.form.get('lastName');
    let contactNumber = component.form.get('contactNumber');
    let email = component.form.get('email');
    let dob = component.form.get('dob');
    let address = component.form.get('address');

    firstName?.setValue('');
    lastName?.setValue('');
    contactNumber?.setValue('');
    email?.setValue('');
    dob?.setValue('');
    address?.setValue('');

    expect(component.isValidControl('firstName')).toBeFalsy();
    expect(component.isValidControl('lastName')).toBeFalsy();
    expect(component.isValidControl('contactNumber')).toBeFalsy();
    expect(component.isValidControl('email')).toBeFalsy();
    expect(component.isValidControl('dob')).toBeFalsy();
    expect(component.isValidControl('address')).toBeFalsy();
  });

  it('should fill the values inside form controls', () => {
    let empObj = {
      firstName: 'Mo',
      lastName: 'Abjal',
      contactNumber: '9012114316',
      email: 'moh@gmail.com',
      dob: '2021-06-04',
      address: '44-Dahiya',
      id: 4,
    };
    component.fillEmployeeDetailsIntoForm(empObj);

    expect(component.form.value.firstName).toEqual(empObj.firstName);
    expect(component.form.value.lastName).toEqual(empObj.lastName);
    expect(component.form.value.contactNumber).toEqual(empObj.contactNumber);
    expect(component.form.value.email).toEqual(empObj.email);
    expect(component.form.value.dob).toEqual(empObj.dob);
    expect(component.form.value.address).toEqual(empObj.address);
  });

  it('should not fill the values inside form controls when we pass an empty object', () => {
    component.fillEmployeeDetailsIntoForm();

    expect(component.form.value.firstName).toBe('');
    expect(component.form.value.lastName).toBe('');
    expect(component.form.value.contactNumber).toBe('');
    expect(component.form.value.email).toBe('');
    expect(component.form.value.dob).toBe('');
    expect(component.form.value.address).toBe('');
  });

  it('should get the employees and push into existing records', () => {
    let employees: Employee[] = [
      {
        id: 1,
        firstName: 'Mo',
        lastName: 'Abjal',
        contactNumber: '9012114316',
        email: 'mohdafzal330@gmail.com',
        dob: '08/01/1997',
        address: 'Bareilly - UP, India',
      },
      {
        id: 2,
        firstName: 'Mo',
        lastName: 'Abjal',
        contactNumber: '901214316',
        email: 'mohdafzal330@gmail.com',
        dob: '08/01/1997',
        address: 'Bareilly - UP, India',
      },
    ];
    spyOn(service, 'getAllEmployees').and.returnValue(of(employees));

    component.ngOnInit();

    expect(service.getAllEmployees).toHaveBeenCalled();
    expect(component.employeeRecords).toEqual(employees);
  });

  it('should insert the new employee records into exixsting employee records', () => {
    let employee: Employee = {
      id: 0,
      firstName: 'Mo',
      lastName: 'Abjal',
      contactNumber: '9012114316',
      email: 'mohdafzal330@gmail.com',
      dob: '08/01/1997',
      address: 'Bareilly - UP, India',
    };

    spyOn(service, 'saveUpdateEmployee').and.returnValue(of(employee));
    component.fillEmployeeDetailsIntoForm(employee);
    component.saveUpdateEmployee();

    expect(service.saveUpdateEmployee).toHaveBeenCalled();
    expect(component.employeeRecords.indexOf(employee)).toBeGreaterThan(-1);
  });

  it('should not insert the new employee when we does not pass the employee', () => {
    let employee: Employee = {
      id: 0,
      firstName: 'Mo',
      lastName: 'Abjal',
      contactNumber: '9012114316',
      email: 'mohdafzal330@gmail.com',
      dob: '08/01/1997',
      address: 'Bareilly - UP, India',
    };

    spyOn(service, 'saveUpdateEmployee').and.returnValue(of(employee));
    component.saveUpdateEmployee();

    expect(service.saveUpdateEmployee).not.toHaveBeenCalled();
    expect(component.employeeRecords.length).toBe(0);
  });

  it('should update the existing employee record', () => {
    component.employeeRecords = [
      {
        id: 1,
        firstName: 'Mo',
        lastName: 'Abjal',
        contactNumber: '9012114316',
        email: 'mohdafzal330@gmail.com',
        dob: '08/01/1997',
        address: 'Bareilly - UP, India',
      },
      {
        id: 2,
        firstName: 'Mo',
        lastName: 'Abjal',
        contactNumber: '901214316',
        email: 'mohdafzal330@gmail.com',
        dob: '08/01/1997',
        address: 'Bareilly - UP, India',
      },
    ];
    let employeeToUpdate: Employee = {
      id: 2,
      firstName: 'Mo',
      lastName: 'Abjal',
      contactNumber: '901214316',
      email: 'mohdafzal330@gmail.com',
      dob: '08/01/1997',
      address: 'Bareilly - UP, India',
    };

    spyOn(service, 'saveUpdateEmployee').and.returnValue(of(employeeToUpdate));

    component.fillEmployeeDetailsIntoForm(employeeToUpdate);

    component.saveUpdateEmployee();

    let currentEmployee = component.employeeRecords.find(
      (employee) => employee.id == employeeToUpdate.id
    );

    if (!currentEmployee) return;

    expect(service.saveUpdateEmployee).toHaveBeenCalled();
    expect(currentEmployee).toEqual(employeeToUpdate);
  });

  it('should delete the employee record from existing employee records', () => {
    component.employeeRecords = [
      {
        firstName: 'Mo',
        lastName: 'Abjal khan bar',
        contactNumber: '9012114316',
        email: 'mh@gmail.com',
        dob: '2021-06-04',
        address: '44-Dahiya',
        id: 3,
      },
      {
        firstName: 'Noorul',
        lastName: 'Hassan',
        contactNumber: '9012114318',
        email: 'mo@gail.com',
        dob: '2021-06-12',
        address: '44-Daiya',
        id: 4,
      },
    ];
    let employeeToDelete = {
      firstName: 'Noorul',
      lastName: 'Hassan',
      contactNumber: '9012114318',
      email: 'mo@gail.com',
      dob: '2021-06-12',
      address: '44-Daiya',
      id: 4,
    };
    spyOn(service, 'deleteEmployee').and.returnValue(of(true));

    component.deleteEmployee(employeeToDelete);

    expect(service.deleteEmployee).toHaveBeenCalled();
    expect(component.employeeRecords.indexOf(employeeToDelete)).toBe(-1);
  });

  it('should not delete the employee if we pass an invalid employee', () => {
    component.employeeRecords = [
      {
        firstName: 'Mo',
        lastName: 'Abjal khan bar',
        contactNumber: '9012114316',
        email: 'mh@gmail.com',
        dob: '2021-06-04',
        address: '44-Dahiya',
        id: 3,
      },
      {
        firstName: 'Noorul',
        lastName: 'Hassan',
        contactNumber: '9012114318',
        email: 'mo@gail.com',
        dob: '2021-06-12',
        address: '44-Daiya',
        id: 0,
      },
    ];
    let employeeToDelete = {
      firstName: 'Noorul',
      lastName: 'Hassan',
      contactNumber: '9012114318',
      email: 'mo@gail.com',
      dob: '2021-06-12',
      address: '44-Daiya',
      id: 0,
    };
    spyOn(service, 'deleteEmployee').and.returnValue(of(true));

    component.deleteEmployee(employeeToDelete);

    expect(service.deleteEmployee).not.toHaveBeenCalled();
    expect(component.employeeRecords.indexOf(employeeToDelete)).toBe(-1);
  });
});
