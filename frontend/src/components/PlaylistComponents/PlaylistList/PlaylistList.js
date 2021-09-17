import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaylists, getSomePlayLists } from '../../../store/playlist';
import { Link } from 'react-router-dom';
import PlaylistBasic from '../Playlist/PlaylistBasic';
import PlaylistComplex from '../Playlist/PlaylistComplex';

export default function PlaylistList({location, isBasic}) {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlist);
    React.useEffect(() => {
        console.log(location);
        if (location === "Home") {
            dispatch(getAllPlaylists(10));
        } else {
            dispatch(getAllPlaylists());
        }
    }, [location])

    if (isBasic){
        return (
            <div>
                <h1>Playlists</h1>
                <div className={"playlists-basic-container"}>
                    {
                      Object.values(playlists).map(playlist => (
                        <PlaylistBasic playlistInformation={playlist}/>
                      ))
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Playlists</h1>
                <div className={"playlists-container"}>
                    {
                      Object.values(playlists).map(playlist => (
                        <PlaylistComplex playlistInformation={playlist}/>
                      ))
                    }
                </div>
            </div>
        )
    }
    
}
