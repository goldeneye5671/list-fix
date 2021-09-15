import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSongs } from '../../../store/songs';
import { Link } from 'react-router-dom';

export default function SongList({location}) {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.song);
    React.useEffect(() => {
        if (location === "Home") {
            dispatch(getAllSongs(2))
        } else {
            dispatch(getAllSongs())
        }
    }, [location]);

    return (
        <div>
            <h1>Songs</h1>
            <ul>
                {
                    Object.values(songs).map(
                        (song) => <li key={song.id}><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
                    )
                }
            </ul>
        </div>
    )
}
