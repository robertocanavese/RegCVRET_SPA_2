import { LOCALE_ID, NgModule, Inject, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { HttpClient, HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { getItalianPaginatorIntl } from 'src/app/italian-paginator-intl';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthResponseInterceptor } from './interceptors/auth.response.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { ScalarService } from './services/scalar.service';
import { LandingComponent } from './components/landing/landing.component';
import { ExcelService } from './services/shared-service.service';
import { EventEmitterService } from './services/event-emitter.service';
import { BaseService } from './services/base.service';
import { CommonDataService } from './services/common-data.service';
import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { StockItemsListComponent } from './components/stock-items-list/stock-items-list.component';
import { MovementsListComponent } from './components/movements-list/movements-list.component';
import { MonthlyAdjustmentComponent } from './components/monthly-adjustment/monthly-adjustment.component';
import { ClosingsListComponent } from './components/closings-list/closings-list.component';
import { ValuedStockListComponent } from './components/valued-stock-list/valued-stock-list.component';


import { LoginComponent } from './components/login/login.component';
import { MessageModule } from "./components/messages/message.module";
import { MessageComponent } from "./components/messages/message.component";
import { CompanyFooterComponent } from './components/company-footer/company-footer.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { StockItemDataService } from './services/stock-items-data.service';
import { MovementsDataService } from './services/movements-data.service';
import { ClosingsDataService } from './services/closings-data.service';

registerLocaleData(localeIt, 'it');


@NgModule({
  declarations: [
    AppComponent,
    StockItemsListComponent,
    MovementsListComponent,
    MonthlyAdjustmentComponent,
    ClosingsListComponent,
    ValuedStockListComponent,
    LoginComponent,
    LandingComponent,
    CompanyFooterComponent,
    ConfigurationComponent
  ],
  entryComponents: [
    MonthlyAdjustmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressBarModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,

    MaterialFileInputModule,

    AppRoutingModule,

    MessageModule

  ],
  providers: [
    DataService,
    CommonDataService,
    StockItemDataService,
    MovementsDataService,
    ClosingsDataService,
    { provide: LOCALE_ID, useValue: 'it' },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    ScalarService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthResponseInterceptor,
      multi: true
    },
    ExcelService,
    EventEmitterService,
    { provide: MatPaginatorIntl, useValue: getItalianPaginatorIntl() },
   
  ],
  bootstrap: [AppComponent, MessageComponent]
})
export class AppModule { 

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.auth.init();
  }


}
