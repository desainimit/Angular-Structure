import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth/auth.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    SidebarComponent,
    TopbarComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    NgxPermissionsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
  ],
})
export class LayoutModule {}
