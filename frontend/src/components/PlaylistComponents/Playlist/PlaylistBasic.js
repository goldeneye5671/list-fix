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
        <div className={"playlist-basic-container"} key={playlistInformation?.id}>
            <Link to={`/playlists/${playlistInformation?.id}`}>
                <h2>{playlistInformation?.name}</h2>
                <h3>{playlistInformation?.User?.username}</h3>
            </Link>
            <div>
                {
                   playlistInformation.Songs?.length === 0 ? <p>No Songs</p> : playlistInformation.Songs?.map( song => (
                       <p>{song.title} by {song.user}</p>
                   )
                   )
                }
            </div>
        </div>
        )
    } else {
        retVal = (
            <div key={playlist?.id}>
            <Link to={`/playlists/${playlist?.id}`}>
                <ul>
                    <li>{playlist?.name}</li>
                    <li>{playlist?.User?.username}</li>
                </ul>
            </Link>
            
        </div>
        )
    }
    
    return retVal
}
