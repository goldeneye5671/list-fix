import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSongs } from '../../store/songs'

export default function SongList() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.song);
    console.log('songs', songs);
    React.useEffect(() => {
        dispatch(getAllSongs())
    }, []);

    return (
        <div>
   
        </div>
    )
}
