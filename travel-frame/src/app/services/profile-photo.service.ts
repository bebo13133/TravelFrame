import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, getStorage, listAll, ref } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePhotoService {

  public photoUrl = new BehaviorSubject<string | null>(null)
  private imagesSubject = new BehaviorSubject<string[]>([]);
  public images$ = this.imagesSubject.asObservable();
  
  // private folderPath: string = 'Images';
  setPhotoUrl(url: string) {
    this.photoUrl.next(url);
  
    const userId = localStorage.getItem('userId');
    if (userId) {
      localStorage.setItem(`profilePhoto_${userId}`, url);
    }
  }
  getPhotoUrl() {
    return this.photoUrl.asObservable();
  }


  loadPhotoUrlFromStorage(userId: string) {
    const url = localStorage.getItem(`profilePhoto_${userId}`);
    if (url) {
      this.photoUrl.next(url);
    }
  }
  fetchProfilePhoto(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const photoPath = `images/${userId}_profile_photo`;
      const photoRef = ref(storage, photoPath);
  
      getDownloadURL(photoRef)
        .then((url) => {
          console.log('Profile photo URL:', url);
          this.setPhotoUrl(url); 
          localStorage.setItem('userProfilePhoto', url);
          resolve(url); 
        })
        .catch((error) => {
          console.error('Error fetching profile photo:', error);
          reject(error); 
        });
    });
  }
  
  

  constructor(private storage: Storage) {
    const savedPhotoUrl = localStorage.getItem('userProfilePhoto');
    if (savedPhotoUrl) {
      this.photoUrl.next(savedPhotoUrl);
    }
    console.log("Received image URLs: ", this.images$);
  }


  fetchImages(): void {
  
    const storageRef = ref(this.storage, 'images');
    listAll(storageRef)
      .then(res => {
        const urlsPromises = res.items.map(itemRef => getDownloadURL(itemRef));
        Promise.all(urlsPromises)
          .then(urls => {
     
            this.imagesSubject.next(urls); 
          
          });
      })
      .catch(error => console.log(error));
  }
  
 extractUserIdFromPath(filePath:any) {
 
    const regex = /images\/(.+?)_/; 
    const match = filePath.match(regex);
    return match ? match[1] : null; 
  }

  async fetchImagesMap(): Promise<{[userId: string]: string}> {
    const imagesMap: {[userId: string]: string} = {};
    const storageRef = ref(this.storage, 'images');
    const res = await listAll(storageRef);
    
    for (const itemRef of res.items) {
      const userId = this.extractUserIdFromPath(itemRef.fullPath); 
      const url = await getDownloadURL(itemRef);
      imagesMap[userId] = url;
    }
  
    return imagesMap;
  }

  async fetchSingleImage(userId: string): Promise<string> {
    try {
      const photoPath = `images/${userId}_profile_photo`;
      const photoRef = ref(this.storage, photoPath);
      const url = await getDownloadURL(photoRef);
      return url;
    } catch (error) {
      console.error('Error fetching single image:', error);
      throw error; 
    }
  }
}

