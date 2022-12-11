import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesModule } from "./services/files/files.module";
import { CookieModule } from "./services/cookie/cookie.module";
import { API_BASE_URL } from "./services/files/files.service";
import { environment } from "../environments/environment";
import { MaterialModule } from "./modules/material/material.module";
import { DownloadFileComponent } from './views/download-file/download-file.component';
import { UploadFileComponent } from './views/upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadFileComponent,
    UploadFileComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FilesModule,
      CookieModule,
      MaterialModule
    ],
  providers: [{
    provide: API_BASE_URL, useValue: environment.API_BASE_URL
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
