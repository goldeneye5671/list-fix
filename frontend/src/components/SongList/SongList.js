import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSongs } from '../../store/songs'

export default function SongList() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.song);
    React.useEffect(() => {
        dispatch(getAllSongs())
    }, []);

    return (
        <div>
            <ul>
                {
                    Object.values(songs).map(
                        (song) => <li key={songs.id}>{song.title}</li>
                    )
                }
            </ul>
        </div>
    )
}
