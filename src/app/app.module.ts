import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppInitializerService } from 'src/services/app-initializer.service';
import { EmployeeService, EMP_SERVICE } from 'src/services/employee.service';
import { StudentGuard } from 'src/services/student-graud.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './common/interceptors/token.interceptor';
import { GlobalErrorHandler } from './common/validators/global-error-handler';
import { EmployeeComponent } from './employee/employee.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { StudentComponent } from './student/student.component';
export function appInitializerFactory(service: AppInitializerService) {
  return () => service.initialize();
}
// AoT requires an exported function for factories
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    StudentComponent,
    NotfoundComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'students',
        component: StudentComponent,
        canActivate: [StudentGuard],
      },
      { path: 'access-denied', component: AccessDeniedComponent },
      { path: '', component: EmployeeComponent },
      { path: '**', component: NotfoundComponent },
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    AppInitializerService,
    StudentGuard,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: EMP_SERVICE, useClass: EmployeeService },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppInitializerService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
