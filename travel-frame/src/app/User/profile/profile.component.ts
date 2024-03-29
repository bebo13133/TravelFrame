import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { finalize, forkJoin, map } from 'rxjs';
import { Storage, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { UserService } from '../user.service';
import { ProfilePhotoService } from '../../services/profile-photo.service';
import { FavoritesService } from '../../services/favorites.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AngularFireStorageModule,CommonModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  imageSrc: string | ArrayBuffer | null = null;
  private userId: string | undefined;
  // form: FormGroup;
  public file: any = {}
  public photoUrl!: string; 

  myFavoriteDestinations: any[] = [];
  constructor(private storage: Storage, private userService: UserService, private photoService: ProfilePhotoService,
    private apiService: ApiService, private favoritesService: FavoritesService
    ) {

    this.userService.user$.subscribe(user => {
      this.userId = user?._id;
      if (this.userId) {
        // Зареждане на съхраненото URL при стартиране
        this.photoService.loadPhotoUrlFromStorage(this.userId);
        this.photoService.photoUrl.subscribe(url => {
          if (url) {
            this.photoUrl = url; // Запазвате URL в променлива на компонента
          }
        });
      }
    });
    this.userService.user$.subscribe(user => {
      this.userId = user?._id;
    });

  }

  ngOnInit() {
    this.loadMyFavorites();
  
  }

  loadMyFavorites() {
    forkJoin({
      destinations: this.apiService.getDestinations(),
      favorites: this.favoritesService.getAllFavorites()
    }).pipe(
      map(({destinations, favorites}) => {
 
        const userId = this.userId; 
      
        return favorites
          .filter(favorite => favorite._ownerId === userId)
          .map(favorite => 
            destinations.find(destination => destination._id === favorite.destinationId)
          );
      })
    ).subscribe(filteredDestinations => {
    
      
      this.myFavoriteDestinations = filteredDestinations;
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; 
      };

      reader.readAsDataURL(this.file); 
    }
    // this.form = new FormGroup({
    //   image: new FormControl(null)
    // });
  }



  submitForm() {

    const storageRef = ref(this.storage, `images/${this.userId}_${new Date().getTime()}_${this.file.name}`);
  

    const uploadTask = uploadBytesResumable(storageRef, this.file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)
        console.log('Uplaod Is' + progress + '% done')
      }, (error) => {
     
        console.error('Upload error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('file valible at ', url);
          this.photoService.setPhotoUrl(url);
        })
      });


  }
}