import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppInitializerService } from './app-initializer.service';

describe('AppInitializerService', () => {
  let service: AppInitializerService;
  let httpMock: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppInitializerService],
    });
    service = TestBed.inject(AppInitializerService);
    httpMock = TestBed.inject(HttpClient);
  });

  it('should create the app initializer service', () => {
    expect(service).toBeTruthy();
  });

  it('should call the initialize method in app initializer', () => {
    spyOn(httpMock, 'get').and.returnValue(of(true));

    service.initialize();
    service.initialize();

    expect(httpMock.get).toHaveBeenCalled();
    expect(service.settings).toBeUndefined();
  });
});
