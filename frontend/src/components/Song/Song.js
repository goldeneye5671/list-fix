import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom';
import { getSongOne } from '../../store/songs'

export default function Song() {
    const {songId} = useParams();
    const dispatch = useDispatch();
    const song = useSelector(state => state.song);
    console.log("Song: ", song)
    React.useEffect(() => {
        dispatch(getSongOne(songId))
    }, []);

    return (
        <div>
            {song.title}
        </div>
    )
}


// export default function SongList() {
//     const dispatch = useDispatch();
//     const songs = useSelector(state => state.song);
//     console.log('songs', songs);
//     React.useEffect(() => {
//         dispatch(getAllSongs())
//     }, []);

//     return (
//         <div>
//             <ul>
//                 {
//                     Object.values(songs).map(
//                         (song) => <li key={songs.id}>{song.title}</li>
//                     )
//                 }
//             </ul>
//         </div>
//     )
// }
