import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom';
import { getPlaylistOne } from '../../../store/playlist';
import { Link } from 'react-router-dom';
import Song from '../../SongComponents/Song/SongBasic';

export default function PlaylistBasic({playlistInformation}) {
    const {playlistId} = useParams();
    const dispatch = useDispatch();
    const playlist = useSelector(state => state.playlist);
    console.log("Playlist: ", playlist)
    React.useEffect(() => {
        if (!playlistInformation){
            dispatch(getPlaylistOne(playlistId))
        }
    }, [dispatch]);

    let retVal;
    
    if (playlistInformation) {
        retVal = (
        <div className={"playlist-container-basic"} key={playlistInformation?.id}>
            <img className={'playlist-image-basic'} src={"test"}></img>
            <Link to={`/playlists/${playlistInformation?.id}`}>
                <h2>{playlistInformation?.name}</h2>
                <h3>{playlistInformation?.User?.username}</h3>
            </Link>
            <div>
                {
                   playlistInformation.Songs?.length === 0 ? <p>No Songs</p> : <p>{playlistInformation.Songs?.length}</p>
                }
            </div>
        </div>
        )
    } else {
        retVal = (
            <div className={"playlist-container-basic"}key={playlist?.id}>
                <img src={"test"}></img>
                <Link to={`/playlists/${playlist?.id}`}>
                    <h2>{playlist?.name}</h2>
                    <h3>{playlist?.User?.username}</h3>
                </Link>
                <div>
                {
                    <p>{playlist?.Songs?.length}</p>
                }
            </div>
            </div>
        )
    }
    
    return retVal
}
