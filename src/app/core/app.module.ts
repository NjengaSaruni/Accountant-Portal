import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from '../modules/home/home.module';
import {GraphsModule} from '../modules/graphs/graphs.module';
import {WindowRefService} from '../shared/services/window-ref.service';

@NgModule({
  declarations: [
    AppComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    GraphsModule
  ],
  providers: [
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
