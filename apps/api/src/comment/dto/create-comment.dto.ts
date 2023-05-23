import { CommentMark, CreateCommentDTO } from '@travel-tailor/types';

export class CreateCommentDto implements CreateCommentDTO {
  content: string;
  likes: number;
  marks: CommentMark;
}
