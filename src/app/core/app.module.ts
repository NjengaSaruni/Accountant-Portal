import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WindowRefService} from '../modules/shared/services/window-ref.service';
import {SharedModule} from '../modules/shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';

export const metaReducers: MetaReducer<any>[] = [];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // External modules
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      router: routerReducer,
    }, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot(),
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
