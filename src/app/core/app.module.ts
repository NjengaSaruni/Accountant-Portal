import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WindowRefService} from '../common/services/global/window-ref.service';
import {SharedModule} from '../modules/shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MetaReducer, StoreModule} from '@ngrx/store';

export const metaReducers: MetaReducer<any>[] = [];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // External modules
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers }),

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
