import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from './layouts/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  API_URL,
  baseurlInterceptor,
} from './core/interceptors/baseurl.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { serverErrorInterceptor } from './core/interceptors/server-error.interceptor';
import { environment } from '../environments/environment.development';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterOutlet,
    LayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true,
    }),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        baseurlInterceptor,
        tokenInterceptor,
        serverErrorInterceptor,
      ])
    ),
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
