import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {HomeComponent} from '../modules/home/pages/home.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BargraphComponent} from '../modules/graphs/components/bargraph/bargraph.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BargraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
