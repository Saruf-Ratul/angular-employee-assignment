import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppInitializerService {
  private isItialized: boolean = false;
  private appSettings: any;

  constructor(private http: HttpClient) {}

  initialize() {
    if (!this.isItialized) {
      this.isItialized = true;
      return this.http.get('assets/app-setting.json').pipe(
        tap((d) => {
          this.appSettings = d;
        })
      );
    }
    return;
  }

  get settings() {
    return this.appSettings;
  }
}
