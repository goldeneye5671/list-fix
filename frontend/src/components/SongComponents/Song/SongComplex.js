import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { getSongOne } from '../../../store/songs';
import SongForm from '../SongNewForm/SongForm'

export default function SongComplex ({songIdProp, location}) {

    let user = useSelector(state => state.session);
    let userInfo = user.user ? {loggedIn: true, id: user.user.id} : {loggedIn: false, id: NaN};
    const dispatch = useDispatch();
    const song = useSelector(state => state.song);
    const {songId} = useParams();

    const [update, setUpdate] = React.useState(false);

    // if (songId) {
    //     dispatch(getSongOne(songId))
    // } else {
    //     dispatch(getSongOne(songIdProp))
    // }

    React.useEffect(() => {
        if (songId) {
            dispatch(getSongOne(songId))
        } else {
            dispatch(getSongOne(songIdProp))
        }
    }, []);
    
    return (
        <div className={`songs-container`} key={song.id}>
        <div className={"song-info"}>
            <p>{song[songIdProp]?.title}</p>
            {console.log(song[songIdProp]?.Album?.title)}
            <p>{song[songIdProp]?.Album?.title}</p>
            <p>by {song[songIdProp]?.User?.username}</p>
            <button>Play</button>
            {
                (userInfo?.loggedIn && userInfo?.id === song[songIdProp]?.userId) ? 
                    (!update) ? 
                        <>
                            <button onClick={e => setUpdate(!update)}>Edit</button>
                            <button>Delete</button>
                        </>
                            :
                        <>
                            <SongForm song={song[songIdProp]} update={update} setUpdate={setUpdate}/>
                            <button onClick={e => setUpdate(!update)}>cancel</button>
                        </>
                        :
                    null         
            }
            {/* <button>Play</button>
            { (userInfo.loggedIn && userInfo.id === song?.userId) ?
                 (!update) ? 
                 <>
                    <button onClick={e => setUpdate(!update)}>Edit</button>
                    <button>Delete</button></>
                    :
                <SongForm />
                :
                null } */}
        </div>
    </div>
    )

    // let retVal;

    // if (songInformation){
    //     retVal =  (
    //         <div className={`song-container`} key={songInformation.id}>
    //             <div className={`song-image-container`}>
    //                 {/* IMG HERE */}
    //             </div>
    //             <div className={`song-info`}>
    //                 <Link to={`/songs/${songInformation.id}`}>
    //                     <h2>{songInformation?.title}</h2>
    //                     <h3>{songInformation?.User?.name}</h3>
    //                 </Link>
    //             </div>
    //             <div>
    //                 <button>Play</button>
    //                 {
    //                     (userInfo.loggedIn && userInfo?.id === songInformation?.userId) ? 
    //                         (!update) ? 
    //                             <>
    //                                 <button onClick={e => setUpdate(!update)}>Edit</button>
    //                                 <button>Delete</button>
    //                             </>
    //                             :
    //                                 <>
    //                                     <SongForm song={songInformation} update={update} setUpdate={setUpdate}/>
    //                                     <button onClick={e => setUpdate(!update)}>cancel</button>
    //                                 </>
    //                         :
    //                         null         
    //                 }
    //             </div>
    //         </div>
    
    //     )
    // } else {
    //     retVal = (
    //         <div className={`songs-container`} key={song.id}>
    //             <div className={"song-info"}>
    //                 <p>{song?.title}</p>
    //                 <p>{song?.Album?.title}</p>
    //                 <p>by {song?.User?.username}</p>
    //                 <button>Play</button>
    //                 { (userInfo.loggedIn && userInfo.id === song?.userId) ?
    //                      (!update) ? 
    //                      <>
    //                         <button onClick={e => setUpdate(!update)}>Edit</button>
    //                         <button>Delete</button></>
    //                         :
    //                     <SongForm />
    //                     :
    //                     null }
    //             </div>
    //         </div>
    
    //     )
    // }

    // return retVal;
        
}
