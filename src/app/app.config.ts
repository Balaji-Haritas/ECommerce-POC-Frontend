import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoggingInterceptor } from './interceptor';
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const tokenGetter = () => {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: {
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:7131'], // Adjust to match your backend domain
          disallowedRoutes: ['localhost:7131/api/Account/login'] // Adjust to your login/register endpoints
        }
      }
    }
  ]
};
