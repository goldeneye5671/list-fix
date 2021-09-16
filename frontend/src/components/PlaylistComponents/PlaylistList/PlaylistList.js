import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaylists, getSomePlayLists } from '../../../store/playlist';
import { Link } from 'react-router-dom';
import Playlist from '../Playlist/Playlist';

export default function PlaylistList({location}) {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlist);
    React.useEffect(() => {
        console.log(location);
        if (location === "Home") {
            dispatch(getAllPlaylists(2));
        } else {
            dispatch(getAllPlaylists());
        }
    }, [location])

    return (
        <div>
            <h1>Playlists</h1>
            <div className={"playlist-container"}>
                {
                  Object.values(playlists).map(playlist => (
                    <Playlist playlistInformation={playlist}/>
                  ))
                }
            </div>
        </div>
    )
}
