import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

import { CommonService } from './shared/commonService';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvlJL4s_5Ct_RPSCQBj5EvsFtlb2k_47Y'
    })
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
