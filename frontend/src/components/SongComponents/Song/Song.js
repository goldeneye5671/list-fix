import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { getSongOne } from '../../../store/songs';

export default function Song ({songInformation}) {
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
                        <img src={"test"}></img>
                            <ul>
                                <li>{songInformation?.title}</li>
                                <li>{songInformation?.Album?.title}</li>
                                <li>{songInformation?.User?.username}</li>
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
                <div className={"image-name-song"}>
                    <Link to={`/songs/${song.id}`}>
                        <img src={"test"}></img>
                            <ul>
                                <li>{song?.title}</li>
                                <li>{song?.Album?.title}</li>
                                <li>{song?.User?.username}</li>
                            </ul>
                    </Link>
                    <button>
                        Play
                    </button>
                </div>
            </div>
    
        )
    }

    return retVal;
        
}

