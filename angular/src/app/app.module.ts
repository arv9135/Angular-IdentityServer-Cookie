import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service'
import { SharedModule } from './shared/shared.module';
import { AuthModule, OidcConfigService, LogLevel } from 'angular-auth-oidc-client';
import { CookieManagerService } from './shared/services/cookie-manager.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://localhost:44300', //Identity server port
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.origin,
      clientId: 'angular_spa',
      scope: 'openid profile offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 10,
      logLevel: LogLevel.Debug,
    });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule.forRoot({ storage: CookieManagerService }),
    SharedModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    CookieService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
