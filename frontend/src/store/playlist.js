/**
 * Get songs
 * create songs
 * update songs
 * delete songs
 */

 import { csrfFetch } from "./csrf";

 const PLAYLIST_CREATE = 'playlist/PLAYLIST_CREATE';
 const PLAYLIST_UPDATE = 'playlist/PLAYLIST_UPDATE';
 const PLAYLIST_GET = 'playlist/PLAYLIST_GET';
 const PLAYLIST_GET_ONE = 'playlist/PLAYLIST_GET_ONE';
 const PLAYLIST_GET_USER = 'playlist/PLAYLIST_GET_USER';
 const PLAYLIST_DELETE = 'playlist/PLAYLIST_DELETE';
 
 
 //Actions that can be dispatched
 
 //get all songs, no matter the user
 const playlistGetAll = (playlists) => ({
     type: PLAYLIST_GET,
     playlists,
 });
 
 //get all songs that belong to user
 const playlistGetUser = (playlists) => ({
     type: PLAYLIST_GET_USER,
     playlists
 });
 
 //get a singular song
 const playlistGetOne = (playlist) => ({
     type: PLAYLIST_GET_ONE,
     playlist,
 });
 
 //update a singular song
 const playlistUpdate = (updatedPlaylist) => ({
     type: PLAYLIST_UPDATE,
     updatedPlaylist,
 });
 
 //create a singular song
 const playlistCreate = (message) => ({
     type: PLAYLIST_CREATE,
     message,
 })
 
 //delete a singular song
 const playlistDelete = (deletedPlaylist) => ({
     type: PLAYLIST_DELETE,
     deletedPlaylist,
 })
 
 //Thunks
 
 
 
 export const createPlaylist = (playlistToAdd) => async (dispatch) => {
     const response = await csrfFetch(
         `/api/playlists`,
         {
             method: `POST`,
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(playlistToAdd)
         });
     if (response.ok) {
         const addedPlaylist = await response.json();
         dispatch(playlistCreate(addedPlaylist));
     }
 }
 
 //get all songs, reguardless of user
 export const getAllPlaylists = (limit = null) => async (dispatch) => {
     const response = limit ? await fetch(`/api/playlists?limit=${limit}`) : await fetch(`/api/playlists`);
 
     if (response.ok) {
         const playlists = await response.json();
         dispatch(playlistGetAll(playlists));
     }
 }
 
 export const getAllPlaylistsUser = (userId) => async (dispatch) => {
     const response = await fetch(`/api/users/${userId}/playlists`);
     if (response.ok){
         const playlist = await response.json();
         dispatch(playlistGetUser(playlist));
     }
 }
 
 export const getPlaylistOne = (playlistId) => async (dispatch) => {
     const response = await fetch(`/api/playlists/${playlistId}`);
     if (response.ok){
         const playlist = await response.json();
         dispatch(playlistGetOne(playlist));
     }
 }
 


 const initialState = {
 
 }
 
 const playlistReducer = (state = initialState, action) => {
     switch(action.type){
         case PLAYLIST_GET: 
             const allPlaylists = {}
             action.playlists.forEach(playlist => {
                allPlaylists[playlist.id] = playlist
             });
             return {
                 ...allPlaylists
             }
         case PLAYLIST_GET_ONE:
             console.log("In reducer")
             const onePlaylist = {...action.playlist}
             return {
                 ...onePlaylist
             }
         case PLAYLIST_CREATE:
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
         default:
             return state;
     }
 }
 
 
 export default playlistReducer;
 