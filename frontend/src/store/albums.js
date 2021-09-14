/**
 * Get albums
 * create albums
 * update albums
 * delete albums
 */

 const ALBUM_CREATE = 'album/ALBUM_CREATE';
 const ALBUM_UPDATE = 'album/ALBUM_UPDATE';
 const ALBUM_GET = 'album/ALBUM_GET';
 const ALBUM_GET_ONE = 'album/ALBUM_GET_ONE';
 const ALBUM_GET_USER = 'album/ALBUM_GET_USER';
 const ALBUM_DELETE = 'album/ALBUM_DELETE';
 
 
 //Actions that can be dispatched
 
 //get all songs, no matter the user
 const albumGetAll = (albums) => ({
     type: ALBUM_GET,
     albums,
 });
 
 //get all songs that belong to user
 const albumGetUser = (albums) => ({
     type: ALBUM_GET_USER,
     albums
 });
 
 //get a singular song
 const albumGetOne = (album) => ({
     type: ALBUM_GET_ONE,
     album,
 });
 
 //update a singular song
 const albumUpdate = (updatedAlbum) => ({
     type: ALBUM_UPDATE,
     updatedAlbum,
 });
 
 //create a singular song
 const albumCreate = (newAlbum) => ({
     type: ALBUM_CREATE,
     newAlbum,
 })
 
 //delete a singular song
 const albumDelete = (deletedAlbum) => ({
     type: ALBUM_DELETE,
     deletedAlbum,
 })
 
 //Thunks
 
 //get all songs, reguardless of user
 export const getAllAlbums = () => async (dispatch) => {
     const response = await fetch(`/api/albums`);
 
     if (response.ok) {
         const albums = await response.json();
         dispatch(albumGetAll(albums));
     }
 }
 
 export const getAlbumOne = (albumId) => async (dispatch) => {
     const response = await fetch(`/api/albums/${albumId}`);
     if (response.ok){
         const album = await response.json();
         dispatch(albumGetOne(album));
     }
 }

 export const getAlbumUser = (userId) => async(dispatch) => {
     const response = await fetch(`/api/users/${userId}/albums`);
     console.log(userId)
     if (response.ok){
         const albums = await response.json();
         dispatch(albumGetUser(albums));
     }
 }
 
 const initialState = {
 
 }
 
 const albumReducer = (state = initialState, action) => {
     switch(action.type){
         case ALBUM_GET: 
             const allAlbums = {}
             action.albums.forEach(album => {
                 allAlbums[album.id] = album
             });
             return {
                 ...allAlbums
             }
         case ALBUM_GET_ONE:
             const oneAlbum = {...action.album}
             return {
                 ...oneAlbum
             }
        case ALBUM_GET_USER:
            const allUserAlbums = {...action.albums}
            return {
                ...allUserAlbums
            }
         default:
             return state;
     }
 }
 
 
 export default albumReducer;
 