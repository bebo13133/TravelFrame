export interface Story {
    destination: string;
    title: string;
    author: string;
    image: string; // Base64 стринг или път до изображението
    authorImage:string; 
    description: string;
    _createdOn:string; 
    _id:string;
    _ownerId: string;
    likesCount: number;
  }
  