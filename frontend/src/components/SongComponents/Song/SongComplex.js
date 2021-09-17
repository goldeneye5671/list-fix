import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { getSongOne } from '../../../store/songs';

export default function SongComplex ({songInformation, location}) {

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
            <div className={`song-container`} key={songInformation.id}>
                <div className={`song-image-container`}>
                    {/* IMG HERE */}
                </div>
                <div className={`song-info`}>
                    <Link to={`/songs/${songInformation.id}`}>
                        <h2>{songInformation?.title}</h2>
                        <h3>{songInformation?.User?.name}</h3>
                    </Link>
                </div>
                <div>
                    <button>Play</button>
                    { (userInfo.loggedIn && userInfo?.id === songInformation?.userId) ? <><button>Edit</button><button>Delete</button></> : null }
                </div>
            </div>
    
        )
    } else {
        retVal = (
            <div className={`songs-container-fancy`} key={song.id}>
                <div className={"song-info"}>
                    <p>{song?.title}</p>
                    <p>{song?.Album?.title}</p>
                    <p>by {song?.User?.username}</p>
                    <button>Play</button>
                    { (userInfo.loggedIn && userInfo.id === song?.userId) ? <><button>Edit</button><button>Delete</button></> : null }
                </div>
            </div>
    
        )
    }

    return retVal;
        
}
