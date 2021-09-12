import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'acciones',
        loadChildren: () =>
          import('../acciones/acciones.module').then((m) => m.AccionesModule),
      },
      {
        path: '',
        redirectTo: 'acciones',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'acciones',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
