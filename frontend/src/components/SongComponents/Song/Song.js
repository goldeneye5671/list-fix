import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { getSongOne } from '../../../store/songs';

export default function Song ({songInformation}) {

    let user = useSelector(state => state.session);
    let userInfo = user.user ? {loggedIn: true, id: user.user.id} : {loggedIn: false, id: NaN};

    const dispatch = useDispatch();
    const song = useSelector(state => state.song);
    const {songId} = useParams();

    React.useEffect(() => {
        if (!songInformation) {
            dispatch(getSongOne(songId))
        }
    }, []);
    
    let retVal;

    if (songInformation){
        retVal =  (
            <div className={"songs-container"} key={songInformation.id}>
                <div className={"image-name-song"}>
                    <Link to={`/songs/${songInformation.id}`}>
                            <ul>
                                <li>{songInformation?.title}</li>
                            </ul>
                    </Link>
                    <button>
                        Play
                    </button>
                </div>
            </div>
    
        )
    } else {
        retVal = (
            <div className={"songs-container"} key={song.id}>
                <div className={"song-info"}>
                    <p>{song?.title}</p>
                    <p>{song?.Album?.title}</p>
                    <p>by {song?.User?.username}</p>
                    <button>Play</button>
                    { userInfo.loggedIn && userInfo.id === song?.User?.id ? <><button>Edit</button><button>Delete</button></> : null }
                </div>
            </div>
    
        )
    }

    return retVal;
        
}
