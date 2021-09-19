/**
 * Get songs
 * create songs
 * update songs
 * delete songs
 */

import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'song/GET_SONG';
const ADD_SONG = 'song/ADD_SONG';
const UPDATE_SONG = 'song/UPDATE_SONG';
const DELETE_SONG = 'song/DELETE_SONG';

const ADD_COMMENT_TO_SONG = 'song/ADD_COMMENT';
const UPDATE_COMMENT_IN_SONG = 'song/UPDATE_COMMENT';
const DELETE_COMMENT_IN_SONG = 'song/DELETE_COMMENT';


// //Actions that can be dispatched

const loadSongsAction = (receivedSongs) => (
    {
        type: LOAD_SONGS,
        receivedSongs
    }
)

const addSongAction = (receivedSong) => (
    {
        type: ADD_SONG,
        receivedSong
    }
)

const updateSongAction = (receivedSong) => (
    {
        type: UPDATE_SONG,
        receivedSong
    }
)

const deleteSongAction = (receivedSong) => (
    {
        type: DELETE_SONG,
        receivedSong
    }
)

const addCommentToSongAction = (receivedComment) => {
    return (
    {
        type: ADD_COMMENT_TO_SONG,
        receivedComment
    }
)}

const updateCommentInSongAction = (receivedComment) => (
    {
        type: UPDATE_COMMENT_IN_SONG,
        receivedComment
    }
)

const deleteCommentInSongAction = (receivedComment) => (
    {
        type: DELETE_COMMENT_IN_SONG,
        receivedComment
    }
)

// //Thunks

export const addSong = (receivedSong) => async (dispatch) => {
    const response = await csrfFetch(
        `/api/songs`,
        {
            method: `POST`,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(receivedSong)
        }
    );

    if (response.ok) {
        const song = await response.json();
        return dispatch(addSongAction(song));
    } else {
        throw new Error("Returned a response that was not ok");
    }
}

export const loadSongs = () => async (dispatch) => {
    const response = await fetch( `/api/songs` );
    if (response.ok){
        const songs = await response.json();
        return dispatch(loadSongsAction(songs));
    } else {
        throw new Error("Returned a response that was not ok");
    }
}

export const updateSong = (receivedSong) => async (dispatch) => {
    const response = await csrfFetch(
        `/api/songs/${receivedSong.songId}`,
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(receivedSong)
        }
    );
    if (response.ok) {
        const song = await response.json();
        return dispatch(updateSongAction(song));
    }
}

export const deleteSong = (recievedSongId) => async (dispatch) => {
    const response = await csrfFetch(
        `/api/songs/${recievedSongId}`,
        {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
        }
    )

    if (response.ok){
        const song = await response.json();
        return dispatch(updateSongAction(song))
    }
}

export const addCommentToSong = (receivedComment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(receivedComment)
        }
    );
    if (response.ok) {
        const comment = await response.json();
        return dispatch(updateSongAction(comment));
    }
}

export const updateCommentInSong = (receivedComment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${receivedComment.songId}`,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(receivedComment)
        }
    )

    if (response.ok) {
        const comment = await response.json();
        return dispatch(updateCommentInSongAction(comment));
    }
}

export const deleteCommentInSong = (receivedComment) => async (dispatch) => {
    console.log("In deleteComment")
    const response = await csrfFetch(`/api/comments/${receivedComment.id}`,
    {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(receivedComment)
    })

    if (response.ok) {
        const comment = await response.json();
        return dispatch(deleteCommentInSongAction(comment));
    }
}

const initialState = {

}

const songReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SONGS:
            const loadState = {};
            action.receivedSongs.forEach(song => {
                loadState[song.id] = song
            })
            return loadState;
        case ADD_SONG:
            return {
                ...state,
                [action.receivedSong.id]: action.receivedSong
            }
        case UPDATE_SONG:
            const updateState = {...state};
            return {...state, [action.receivedSong.id]: {...state[action.receivedSong.id], ...action.receivedSong}}
        case DELETE_SONG:
            const deleteState = {...state};
            delete deleteState[action.receivedSong.songId]
            return deleteState;
        case ADD_COMMENT_TO_SONG:
            const addCommentToSongState = {...state};
            addCommentToSongState[action.receivedComment.songId].comments[action.receivedComment.id] = action.receivedComment
            return addCommentToSongState;
        case UPDATE_COMMENT_IN_SONG:
            const updateCommentInSongState = {...state};
            updateCommentInSongState[action.receivedComment.songId].comments[action.receivedComment.id] = action.receivedComment;
            return updateCommentInSong
        case DELETE_COMMENT_IN_SONG:
            const deleteCommentInSongState = {...state};
            delete deleteCommentInSongState[action.receivedComment.songId].comments[action.receivedComment.commentId];
            return deleteCommentInSongState;
        default:
            return state;
    }
}

export default songReducer;
