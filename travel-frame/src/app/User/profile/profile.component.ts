import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Storage, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { UserService } from '../user.service';
import { ProfilePhotoService } from '../../services/profile-photo.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AngularFireStorageModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  imageSrc: string | ArrayBuffer | null = null;
  private userId: string | undefined;
  // form: FormGroup;
  public file: any = {}

  constructor(private storage: Storage, private userService: UserService, private photoService: ProfilePhotoService) {

    this.userService.user$.subscribe(user => {
      this.userId = user?._id;
      if (this.userId) {
        // Зареждане на съхраненото URL при стартиране
        this.photoService.loadPhotoUrlFromStorage(this.userId);
      }
    });
    this.userService.user$.subscribe(user => {
      this.userId = user?._id;
    });

  }


  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Прочита и задава избраната снимка за показване
      };

      reader.readAsDataURL(this.file); // Превръща избрания файл в Data URL
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
        // Обработка на грешки...
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