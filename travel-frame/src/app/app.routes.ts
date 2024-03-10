import { Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { CreatePageComponent } from './create-page/create-page.component';

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
{
    path: 'destination',
    component: DestinationsComponent,
},
{
    path: 'create',
    component: CreatePageComponent,
},
{ path: '', redirectTo: '/login', pathMatch: 'full' },

];
