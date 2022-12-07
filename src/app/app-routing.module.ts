import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
import { DownloadFileComponent } from "./views/download-file/download-file.component";
import { SessionGuard } from "./guards/session.guard";

const routes: Routes = [
  { path: 'files/download/:guid', component: DownloadFileComponent, canActivate: [ SessionGuard ]},
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  declarations: [EmptyRouteComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
