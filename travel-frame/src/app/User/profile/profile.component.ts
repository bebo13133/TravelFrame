import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Storage, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AngularFireStorageModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  imageSrc: string | ArrayBuffer | null = null;
  form: FormGroup;
  public file: any = {}

  constructor(private storage: Storage) {
    this.form = new FormGroup({
      // Други контроли на формата могат да бъдат добавени тук
      image: new FormControl(null) // Контрол за качената снимка
    });
  }


  onFileSelected(event: any) {
    this.file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     this.imageSrc = e.target.result; // Прочита и задава избраната снимка за показване
    //   };

    //   reader.readAsDataURL(file); // Превръща избрания файл в Data URL
    // }
    // this.form = new FormGroup({
    //   image: new FormControl(null)
    // });
  }



  submitForm() {

    const storageRef = ref(this.storage, this.file.name);
    console.log(this.file.name)

    const uploadTask = uploadBytesResumable(storageRef, this.file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)
        console.log('Uplaod Is' + progress + '% done')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('file valible at ', url);
        })
      });


  }
}