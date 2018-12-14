import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WindowRefService} from '../common/services/global/window-ref.service';
import {SharedModule} from '../modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // External modules
    BrowserModule,

    // Internal modules
    SharedModule,

    // Primary routing module
    AppRoutingModule,
  ],
  providers: [
    // Internal services
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
