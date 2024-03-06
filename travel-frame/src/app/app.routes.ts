import { Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
    path: '',
    pathMatch:"full",
    redirectTo: '/home',
},
{
    path: 'home',
    // pathMatch:"full",
    component: HomeComponent,
},{
    path: 'login',
    component:LoginComponent,

},
{ path: '', redirectTo: '/login', pathMatch: 'full' },

];
