import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSongs } from '../../../store/songs';
import { Link } from 'react-router-dom';
import  SongBasic  from '../Song/SongBasic'
import SongComplex from '../Song/SongComplex';

export default function SongList({location, isBasic}) {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.song);
    React.useEffect(() => {
        if (location === "Home") {
            dispatch(getAllSongs(10))
        } else {
            dispatch(getAllSongs())
        }
    }, [location]);

    if (isBasic){
        return (
            <>
            <h1>Songs</h1>
            <div className={"songs-container-basic"}>
                    {
                      Object.values(songs).map(
                        (song) => { return <Link to={`/songs/${song.id}`}><SongBasic songInformation={song}/> </Link>}
                    )  
                    }
            </div>
            </>
        )
    } else {
        return (
            <>
            <h1>Songs</h1>
            <div className={"songs-container"}>
                    {
                      Object.values(songs).map(
                        (song) => { return <SongComplex songInformation={song} />}
                    )  
                    }
            </div>
            </>
        )
    }
}
