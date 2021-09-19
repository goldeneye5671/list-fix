import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

const loadCommentsAction = (receivedComments) => (
    {
        type: LOAD_COMMENTS,
        receivedComments
    }
);

const addCommentAction = (receivedComments) => (
    {
        type: ADD_COMMENT,
        receivedComments
    }
);

const updateCommentAction = (receivedComments) => (
    {
        type: UPDATE_COMMENT,
        receivedComments
    }
);
const deleteCommentAction = (receivedComments) => (
    {
        type: DELETE_COMMENT,
        receivedComments
    }
);

export const addComment = (receivedComment) => async(dispatch) => {
    const response = await csrfFetch(
        `/api/comments`,
        {
            method: `POST`,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(receivedComment)
        }
    );

    if (response.ok) {
        const comment = await response.json();
        return dispatch(addCommentAction(comment));
    } else {
        throw new Error("Returned a response that was not ok"); 
    }
}

export const updateComment = (receivedComment) => async(dispatch) => {
    const response = await csrfFetch(
        `/api/comments/${receivedComment.commentId}`,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(receivedComment)
        }
    );
    if (response.ok) {
        const comment = await response.json();
        dispatch(updateCommentAction(comment));
    } else {
        throw new Error("Returned a response that was not ok")
    }
}
export const loadComments = (songId) => async(dispatch) => {

    const response = await fetch(`/api/comments/songs/${songId}`);
    if (response.ok){
        const comments = await response.json();
        return dispatch(loadCommentsAction(comments))
    }else {
        throw new Error("Returned a response that was not ok")
    }
}
export const deleteComment = (receivedCommentId) => async(dispatch) => {
    const response = await csrfFetch(
        `/api/comments/${receivedCommentId}`,
        {
            method: "DELETE",
            headers: {'Content-Type': "application/json"}
        }
    );

    if (response.ok) {
        const comment = await response.json();
        dispatch(deleteCommentAction(comment))
    }
}

const initialState = {

}

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_COMMENTS:
            const loadState = {};
            action.receivedComments.forEach(comment => {
                loadState[comment.id] = comment
            })
            return loadState;
        case ADD_COMMENT:
            return {
                ...state,
                [action.receivedComment.id]: action.receivedComment
            }
        case UPDATE_COMMENT:
            const updateState = {...state};
            return {...state, [action.receivedComment.id]: {...state[action.receivedComment.id], ...action.receivedComment}}
        case DELETE_COMMENT:
            const deleteState = {...state};
            delete deleteState[action.receivedComment.commentId]
            return deleteState;
        default:
            return state;
    }
}


export default commentReducer;
