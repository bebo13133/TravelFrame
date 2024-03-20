import { Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { AuthComponentComponent } from './User/auth-component/auth-component.component';
import { ErrorComponent } from './core/error/error.component';
import { AuthGuard } from './auth.guard';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { CommentPageComponent } from './details-page/comment-page/comment-page.component';
import { AlreadyLoggedInngGuard } from './already-logged-inng.guard';
import {  StoriesComponent } from './Blog/stories/stories.component';
import { CreateStoriesComponent } from './Blog/create-stories/create-stories.component';


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
        canActivate: [AlreadyLoggedInngGuard],
    },
    {
        path: 'destinations',
        component: DestinationsComponent,
    },
    {
        path: 'create',
        component: CreatePageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'destination/details/:destinationId', component: DetailsPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'destination/edit/:destinationId', component: EditDestinationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'destination/details/comments/:destinationId', component: CommentPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'blog', component: StoriesComponent,
        canActivate: [AuthGuard]
        
    },
    {
        path: 'blog/create', component: CreateStoriesComponent,
        canActivate: [AuthGuard]
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
