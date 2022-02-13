import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppInitializerService } from 'src/services/app-initializer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Demo-Application';
  constructor(
    public appService: AppInitializerService,
    translateService: TranslateService
  ) {
    translateService.setDefaultLang('en');

    translateService.use('en');
  }
}
