import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom';
import { getPlaylistOne } from '../../../store/playlist';
import { Link } from 'react-router-dom';
import Song from '../../SongComponents/Song/Song';

export default function Playlist({playlistInformation}) {
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
        <div key={playlistInformation?.id}>
            <Link to={`/playlists/${playlistInformation?.id}`}>
                <ul>
                    <li>{playlistInformation?.name}</li>
                    <li>{playlistInformation?.User?.username}</li>
                </ul>
            </Link>
            <div>
                {
                   playlistInformation.Songs.length === 0 ? <p>No Songs</p> : playlistInformation.Songs.map( song => (
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
