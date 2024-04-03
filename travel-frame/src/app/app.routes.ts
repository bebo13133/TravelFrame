import { Routes } from '@angular/router';
import { ErrorComponent } from './core/error/error.component';
import { AuthGuard } from './auth.guard';
import { AlreadyLoggedInngGuard } from './already-logged-inng.guard';
// import {  StoriesComponent } from './Blog/stories/stories.component';
import { PageNotFoundComponent } from './core/404/page-not-found/page-not-found.component';
import { AdminGuard } from './adminGuard.component';
;





export const routes: Routes = [
    {
        path: '',
        pathMatch: "full",
        redirectTo: '/home',
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),


    },
    {
        path: 'auth',
        loadComponent: () => import('./User/auth-component/auth-component.component').then(m => m.AuthComponentComponent),
        canActivate: [AlreadyLoggedInngGuard]

    },
    {
        path: 'destinations',
        loadComponent: () => import('./destinations/destinations.component').then(m => m.DestinationsComponent),


    },
    {
        path: 'create',
        loadComponent: () => import('./create-page/create-page.component').then(m => m.CreatePageComponent),
        canActivate: [AdminGuard]


    },
    {
        path: 'destination/details/:destinationId',
        loadComponent: () => import('./details-page/details-page.component').then(m => m.DetailsPageComponent),
        canActivate: [AuthGuard]

    },
    {
        path: 'destination/edit/:destinationId',
        loadComponent: () => import('./edit-destination/edit-destination.component').then(m => m.EditDestinationComponent),
        canActivate: [AdminGuard]

    },
    {
        path: 'destination/details/comments/:destinationId',
        loadComponent: () => import('./details-page/comment-page/comment-page.component').then(m => m.CommentPageComponent),
        canActivate: [AuthGuard]

    },
    {
        path: 'blog',
        loadComponent: () => import('./Blog/stories/stories.component').then(m => m.StoriesComponent),
        canActivate: [AuthGuard]

    },
    {
        path: 'search-blog',
        loadComponent: () => import('./Blog/searchStory/search-blog/search-blog.component').then(m => m.SearchBlogComponent),
        canActivate: [AuthGuard]

    },
    {
        path: 'blog/details/:storyId',
        loadComponent: () => import('./Blog/story-details/story-details.component').then(m => m.StoryDetailsComponent),
        canActivate: [AuthGuard]

    },
    {
        path: 'create-stories',
        loadComponent: () => import('./Blog/create-stories/create-stories.component').then(m => m.CreateStoriesComponent),
        canActivate: [AuthGuard]

    },
    {
        path: 'profile',
        loadComponent: () => import('./User/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [AuthGuard]

    },
    {
        path: 'contact',
        loadComponent: () => import('./User/contact/contact.component').then(m => m.ContactComponent),

        // canActivate: [AuthGuard]
    },
    {
        path: 'search-page',
        loadComponent: () => import('./home/search/search-result/search-result.component').then(m => m.SearchResultComponent),

    },
    {
        path: 'general-terms',
        loadComponent: () => import('./general-terms/general-terms.component').then(m => m.GeneralTermsComponent),

    },
    {
        path: 'cookies-police', 
        loadComponent: () => import('./general-terms/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent),

    },
    {
        path: 'for-us',
        loadComponent: () => import('./core/for-us/for-us.component').then(m => m.ForUsComponent),


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

    {
        path: '404',
        component: PageNotFoundComponent, 
    },

    {
        path: '**',
        redirectTo: '/404'
    },


];
