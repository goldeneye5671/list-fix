/**
 * Get songs
 * create songs
 * update songs
 * delete songs
 */

import { csrfFetch } from "./csrf";

const SONG_CREATE = 'song/SONG_CREATE';
const SONG_UPDATE = 'song/SONG_UPDATE';
const SONG_GET = 'song/SONG_GET';
const SONG_GET_ONE = 'song/SONG_GET_ONE';
const SONG_GET_USER = 'song/SONG_GET_USER';
const SONG_DELETE = 'song/SONG_DELETE';


//Actions that can be dispatched

//get all songs, no matter the user
const songGetAll = (songs) => ({
    type: SONG_GET,
    songs,
});

//get all songs that belong to user
const songGetUser = (songs) => ({
    type: SONG_GET_USER,
    songs
});

//get a singular song
const songGetOne = (song) => ({
    type: SONG_GET_ONE,
    song,
});

//update a singular song
const songUpdate = (updatedSong) => ({
    type: SONG_UPDATE,
    updatedSong,
});

//create a singular song
const songCreate = (message) => ({
    type: SONG_CREATE,
    message,
})

//delete a singular song
const songDelete = (deletedSong) => ({
    type: SONG_DELETE,
    deletedSong,
})

//Thunks



export const createSong = (songToAdd) => async (dispatch) => {
    const response = await csrfFetch(
        `/api/songs`,
        {
            method: `POST`,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(songToAdd)
        });
    if (response.ok) {
        const addedSong = await response.json();
        dispatch(songCreate(addedSong));
    }
}

//get all songs, reguardless of user
export const getAllSongs = (limit = null) => async (dispatch) => {
    const response = limit ? await fetch(`/api/songs?limit=${limit}`) : await fetch(`/api/songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(songGetAll(songs));
    }
}

export const getAllSongsUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/songs`);
    if (response.ok){
        const songs = await response.json();
        dispatch(songGetUser(songs));
    }
}

export const getSongOne = (songId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}`);
    if (response.ok){
        const song = await response.json();
        dispatch(songGetOne(song));
    }
}


export const updateSong = (songToUpdate) => async (dispatch) => {
    const response = await csrfFetch(
        `/api/songs/${songToUpdate.songId}`,
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(songToUpdate)
        }
    );
    if (response.ok) {
        const updatedSong = await response.json();
        dispatch(songUpdate(updatedSong));
    }
}

const initialState = {

}

const songReducer = (state = initialState, action) => {
    switch(action.type){
        case SONG_GET: 
            const allSongs = {}
            action.songs.forEach(song => {
                allSongs[song.id] = song
            });
            return {
                ...allSongs
            }
        case SONG_GET_ONE:
            return {
                ...state,
                [action.song.id]: action.song
            }
        case SONG_CREATE:
            if (!state[action.message.id]){
                const newState = {
                    ...state,
                    [action.message.id]: action.message
                }
                return newState
            }
            return {
                ...state,
                [action.message.id]: {
                    ...state[action.message.id],
                    ...action.message
                }
            }
        case SONG_UPDATE:
            const updatedSongState = {...state};
            updatedSongState[action.updatedSong.id] = action.updatedSong;
            return updatedSongState;
        default:
            return state;
    }
}


export default songReducer;
