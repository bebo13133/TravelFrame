import { Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { AuthComponentComponent } from './User/auth-component/auth-component.component';
import { ErrorComponent } from './core/error/error.component';
import { AuthGuardService } from './auth.guard';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { CommentPageComponent } from './details-page/comment-page/comment-page.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: "full",
        redirectTo: '/home',
    },
    {
        path: 'home',
        // pathMatch:"full",
        component: HomeComponent,
    },
    {
        path: 'auth',
        component: AuthComponentComponent,

    },
    {
        path: 'destinations',
        component: DestinationsComponent,
    },
    {
        path: 'create',
        component: CreatePageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'destination/details/:destinationId', component: DetailsPageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'destination/edit/:destinationId', component: EditDestinationComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'destination/details/comments/:destinationId', component: CommentPageComponent,
        canActivate: [AuthGuardService]
    },
    { path: 'error', component: ErrorComponent },

    // { path: '', redirectTo: '/auth', pathMatch: 'full' },
    // {
    //     path: '**',
    //     loadComponent: () =>
    //       import('./shared/not-found/not-found.component').then(
    //         (m) => m.NotFoundComponent
    //       ),
    //   },

];
