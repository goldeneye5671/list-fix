import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { getSongOne } from '../../../store/songs';

export default function SongBasic ({songInformation, location}) {

    let user = useSelector(state => state.session);
    let userInfo = user.user ? {loggedIn: true, id: user.user.id} : {loggedIn: false, id: NaN};
    const dispatch = useDispatch();
    const song = useSelector(state => state.song);
    const {songId} = useParams();
   

    React.useEffect(() => {
        if (!songInformation) {
            dispatch(getSongOne(songId))
        }
    }, [location, songInformation]);
    
    let retVal;

    if (songInformation){
        retVal =  (
            <div className={`song-container-basic`} key={songInformation.id}>
                <div className={`song-info-basic`}>
                <img className={'song-image-basic'}src={"test"}></img>
                    <Link to={`/songs/${songInformation.id}`}>
                        <p>{songInformation.title}</p>
                        <p>{songInformation?.User?.name}</p>
                    </Link>
                </div>
                <div>
                    <button>Play</button>
                </div>
            </div>
    
        )
    } else {
        retVal = (
            <div className={`songs-container-basic`} key={song.id}>
                <div className={"song-info-basic"}>
                    <img className={'song-image-basic'}src={"test"}></img>
                        <p>{song?.title}</p>
                        <p>{song?.Album?.title}</p>
                        <p>by {song?.User?.username}</p>
                        <button>Play</button>
                </div>
        </div>
    
        )
    }

    return retVal;
        
}
