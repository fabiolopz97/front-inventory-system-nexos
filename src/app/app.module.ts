import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';
import { MerchandiseAddComponent } from './components/merchandise-add/merchandise-add.component';
import { MerchandiseEditComponent } from './components/merchandise-edit/merchandise-edit.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MerchandiseComponent,
    MerchandiseAddComponent,
    MerchandiseEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
