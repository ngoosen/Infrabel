import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PonctualiteComponent } from './ponctualite/ponctualite.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule}from '@angular/material/autocomplete'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { ProblemeComponent } from './probleme/probleme.component'
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatRadioModule} from '@angular/material/radio'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PonctualiteComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
