import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom';
import { getPlaylistOne } from '../../../store/playlist';

export default function Playlist() {
    const {playlistId} = useParams();
    const dispatch = useDispatch();
    const playlist = useSelector(state => state.playlist);
    console.log("Playlist: ", playlist)
    React.useEffect(() => {
        dispatch(getPlaylistOne(playlistId))
        console.log("Rendering the playlist component")
    }, [dispatch]);

    return (
        <div>
            {playlist.name}
        </div>
    )
}
