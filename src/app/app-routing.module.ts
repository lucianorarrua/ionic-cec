import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/public/register/register.module#RegisterPageModule' },
  {
    path: 'members',
    canActivate: [AuthGuard],
    loadChildren: './pages/members/member-routing.module#MemberRoutingModule'
  },
  { path: 'enter-virtual-table-modal', loadChildren: './pages/modals/enter-virtual-table-modal/enter-virtual-table-modal.module#EnterVirtualTableModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
