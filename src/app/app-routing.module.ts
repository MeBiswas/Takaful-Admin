import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Guard
import { AuthGuard } from './guard/auth.guard';
// Components
import { NotFoundComponent } from './not-found/not-found.component';
// Modules
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import(`./auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(`./admin/admin.module`).then((m) => m.AdminModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [NotFoundComponent];
