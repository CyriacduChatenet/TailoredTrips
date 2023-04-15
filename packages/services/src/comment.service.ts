import { useFetch } from "@travel-tailor/hooks";
import { CreateCommentDTO, UpdateCommentDTO, Comment } from "@travel-tailor/types";
import { ActivityService } from "./activity.service";
import { TokenService } from "./token.service";
import { Dispatch, SetStateAction } from "react";
import { API_COMMENT_ROUTE } from "@travel-tailor/constants";

const findAllComments = async (api_url: string,setError: Dispatch<SetStateAction<any>>): Promise<Comment[]> => {
    const data = await useFetch.get(`${api_url}${API_COMMENT_ROUTE}`, setError);
    return data.data;
};

const findCommentById = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>): Promise<Comment> => {
    return await useFetch.get(`${api_url}${API_COMMENT_ROUTE}/${id}`, setError);
};

const createComment = async (api_url: string, createCommentCredential: CreateCommentDTO, setError: Dispatch<SetStateAction<any>>): Promise<Comment> => {
    return await useFetch.protectedPost(`${api_url}${API_COMMENT_ROUTE}`, createCommentCredential, `${TokenService.getAccessToken()}`, setError);
};

const createCommentWithRelations = async (api_url: string, createCommentCredential: CreateCommentDTO, activity_id: string, setError: Dispatch<SetStateAction<any>>): Promise<Comment> => {
    const activity = await ActivityService.findActivityById(api_url, activity_id, setError);
    const comment = await useFetch.protectedPost(`${api_url}${API_COMMENT_ROUTE}`, {...createCommentCredential, activity: activity_id, likes: 0}, `${TokenService.getAccessToken()}`, setError);
    await ActivityService.updateActivity(api_url, activity_id, {mark:  activityMarkAverage(activity.comments), comments: [...activity.comments, comment._id]}, setError);
    return comment;
};

const updateComment = async (api_url: string, id: string, updateCommentCredential: UpdateCommentDTO, setError: Dispatch<SetStateAction<any>>): Promise<Comment> => {
    return await useFetch.protectedPatch(`${api_url}${API_COMMENT_ROUTE}/${id}`, updateCommentCredential, `${TokenService.getAccessToken()}`, setError);
};

const deleteComment = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>) => {
    return await useFetch.protectedRemove(`${api_url}${API_COMMENT_ROUTE}/${id}`, `${TokenService.getAccessToken()}`, setError);
};

const likeComment = async (api_url: string, comment: Comment, setComments: Dispatch<SetStateAction<Comment[]>>, comments : Comment[], setError: Dispatch<SetStateAction<any>>) => {
    const updatedComments = comments.map((c) => {
      if (c.id === comment.id) {
        return { ...c, likes: c.likes += 1 };
      }
      return c;
    });
    const com = await CommentService.findCommentById(api_url, comment.id, setError);
    await CommentService.updateComment(api_url, comment.id, { likes: com.likes += 1 }, setError)
    setComments(updatedComments);
  };

const dislikeComment = async (api_url: string, comment: Comment, setComments: Dispatch<SetStateAction<Comment[]>>, comments : Comment[], setError: Dispatch<SetStateAction<any>>) => {
    const updatedComments = comments.map((c) => {
      if (c.id === comment.id && comment.likes > 0) {
        return { ...c, likes: c.likes -= 1 };
      }
      return c;
    });
    const com = await CommentService.findCommentById(api_url, comment.id, setError);
    if(comment.likes > 0) {
        await CommentService.updateComment(api_url, comment.id, { likes: com.likes -= 1 }, setError)
    }
    setComments(updatedComments);
  };

  const activityMarkAverage = (comments: Comment[]): number => {
    console.log('comments',comments)
    const total = comments.reduce((acc, comment: Comment) => acc + comment.mark, 0);
    return Math.round(total / comments.length);
  };

export const CommentService = {
    findAllComments,
    findCommentById,
    createComment,
    createCommentWithRelations,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment
};