/**
 * Get songs
 * create songs
 * update songs
 * delete songs
 */

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
const songCreate = (newSong) => ({
    type: SONG_CREATE,
    newSong,
})

//delete a singular song
const songDelete = (deletedSong) => ({
    type: SONG_DELETE,
    deletedSong,
})

//Thunks

//get all songs, reguardless of user
export const getAllSongs = () => async (dispatch) => {
    const response = await fetch(`/api/songs`);

    if (response.ok) {
        const songs = await response.json();
        dispatch(songGetAll(songs));
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
                ...state,
                ...allSongs
            }
        default:
            return state;
    }
}


export default songReducer;
