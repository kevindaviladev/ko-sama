import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ProyectoComponent } from './pages/proyecto/proyecto.component';
import { AppRoutingModule } from './app.routing.module';
import { FooterComponent } from './common/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgxViewerModule } from 'ngx-viewer';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoriaComponent,
    ProyectoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgxViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
