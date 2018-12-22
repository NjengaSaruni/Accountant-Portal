import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WindowRefService} from '../common/services/window-ref.service';
import {SharedModule} from '../modules/shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {effects} from '../common/store/effects';

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
    EffectsModule.forRoot(effects),
    HttpClientModule,

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
