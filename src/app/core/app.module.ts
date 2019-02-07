import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WindowRefService} from '../modules/shared/services/window-ref.service';
import {SharedModule} from '../modules/shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MetaReducer} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CoreStoreModule} from './store/core.store.module';

export const metaReducers: MetaReducer<any>[] = [];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // External modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreStoreModule,

    FlexLayoutModule,
    HttpClientModule,

    // Internal modules
    SharedModule,

    // Primary routing module
    AppRoutingModule,
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),

  ],
  providers: [
    // Internal services
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
