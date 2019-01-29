import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MdTooltipModule } from '@angular/material';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DialogModule } from 'primeng/components/dialog/dialog';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { GrowlModule } from 'primeng/components/growl/growl';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoutesModule } from './routes/routes.module';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ConfService } from './conf.service';
import { ApiService } from './api/api.service';
import { RequestService } from './api/request.service';
import { AuthService } from './auth.service';
import { MeService } from './me.service';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthGuardService } from './routes/guards/auth-guard.service';
import { GmapGuardService } from './routes/guards/gmap-guard.service';
import {ChartModule} from 'primeng/primeng';
import { ReportComponent } from './components/report/report.component';
import { OrderComponent } from './components/order/order.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoanComponent } from './components/loan/loan.component';
import { SignupComponent } from './components/signup/signup.component';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    DashboardComponent,
    NavBarComponent,
    ReportComponent,
    OrderComponent,
    AdminComponent,
    LoanComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RoutesModule,
    DialogModule,
    ConfirmDialogModule,
    PaginatorModule,
    GrowlModule,
    MdTooltipModule,
    ChartModule
  ],
  providers: [
    ConfirmationService,
    ConfService,
    ApiService,
    RequestService,
    AuthService,
    MeService,
    AuthGuardService,
    GmapGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
