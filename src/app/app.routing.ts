import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './my-account/user-profile.component';
import { TableListComponent } from './my-wallet/table-list.component';
import { TypographyComponent } from './transactions/typography.component';
import { IconsComponent } from './Report/icons.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full',
   },
   {
     path: '',
     component: AdminLayoutComponent,
     children: [{
       path: '',
       loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
     }]
   },
  { path: 'transactions',     component: TypographyComponent },
  { path: 'my-account',   component: UserProfileComponent },
  { path: 'my-wallet',     component: TableListComponent },
  { path: 'Report',          component: IconsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
