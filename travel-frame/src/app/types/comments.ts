export interface Comment {
  _ownerId?: string;
  _createdOn?: number;
  _id?: string;
  commentText: string;
  name?: string;
  username?: string;
  destinationId: string | undefined;

}