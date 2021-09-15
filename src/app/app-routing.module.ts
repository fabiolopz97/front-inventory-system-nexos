import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MerchandiseAddComponent } from './components/merchandise-add/merchandise-add.component';
import { MerchandiseEditComponent } from './components/merchandise-edit/merchandise-edit.component';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'merchandise',
    children: [
      { path: '', component: MerchandiseComponent },
      { path: 'add', component: MerchandiseAddComponent },
      { path: ':id/edit', component: MerchandiseEditComponent },
      { path: '**', pathMatch: 'full', redirectTo: '' },
    ],
  },
  {path: '',   redirectTo: '', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
