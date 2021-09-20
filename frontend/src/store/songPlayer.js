import { csrfFetch } from "./csrf";

const ADD_SONG_TO_PLAY = '/songPlayer/addSong';
const UPDATE_SONG_TO_PLAY = 'songPlayer/updateSong'

const play = (songUrl) => (
    {
        type: ADD_SONG_TO_PLAY,
        songUrl
    }
)

export const getSongUrl = (songUrl) => (dispatch) => {
    dispatch(play(songUrl))
}

const initialState = {

}

const songPlayerReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_SONG_TO_PLAY: 
            const addState = {...state}
            addState["song"] = action.songUrl
            console.log("Added new song")
            return addState;
         default:
            return state;
    }
}


export default songPlayerReducer;
