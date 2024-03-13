import { Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { AuthComponentComponent } from './User/auth-component/auth-component.component';

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
    path: 'auth',
    component:AuthComponentComponent,

},
{
    path: 'destination',
    component: DestinationsComponent,
},
{
    path: 'create',
    component: CreatePageComponent,
},
{path: 'details', component:DetailsPageComponent},
{ path: '', redirectTo: '/login', pathMatch: 'full' },


];
