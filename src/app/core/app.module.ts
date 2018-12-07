import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HomeModule} from '../modules/home/home.module';
import {GraphsModule} from '../modules/graphs/graphs.module';

@NgModule({
  declarations: [
    AppComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HomeModule,
    GraphsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
