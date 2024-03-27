import { Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
// import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { AuthComponentComponent } from './User/auth-component/auth-component.component';
import { ErrorComponent } from './core/error/error.component';
import { AuthGuard } from './auth.guard';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { CommentPageComponent } from './details-page/comment-page/comment-page.component';
import { AlreadyLoggedInngGuard } from './already-logged-inng.guard';
// import {  StoriesComponent } from './Blog/stories/stories.component';
import { CreateStoriesComponent } from './Blog/create-stories/create-stories.component';
import { StoryDetailsComponent } from './Blog/story-details/story-details.component';
import { PageNotFoundComponent } from './core/404/page-not-found/page-not-found.component';
import { SearchResultComponent } from './home/search/search-result/search-result.component';
import { SearchBlogComponent } from './Blog/searchStory/search-blog/search-blog.component';
import { ProfileComponent } from './User/profile/profile.component';
import { ContactComponent } from './User/contact/contact.component';



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
        canActivate: [AuthGuard]
    
    
    },
    {
        path: 'destination/details/:destinationId', 
        loadComponent: () => import('./details-page/details-page.component').then(m => m.DetailsPageComponent),
        canActivate: [AuthGuard]
      
    },
    {
        path: 'destination/edit/:destinationId',
        loadComponent: () => import('./edit-destination/edit-destination.component').then(m => m.EditDestinationComponent),
        canActivate: [AuthGuard]
   
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
    { path: 'search-page',
    loadComponent: () => import('./home/search/search-result/search-result.component').then(m => m.SearchResultComponent),

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
        component: PageNotFoundComponent, // Използвайте ErrorComponent или друг компонент, който сте създали за 404 грешка
    },
    // Wildcard маршрут за 404 страница. Трябва да е последният в списъка с маршрути.
    { 
        path: '**', 
        redirectTo: '/404'
    },


];
