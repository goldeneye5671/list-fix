import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAlbums } from '../../../store/albums';
import { Link } from 'react-router-dom';
import AlbumBasic from '../Album/AlbumBasic';
import AlbumComplex from '../Album/AlbumComplex'

export default function AlbumList({location, isBasic}) {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.album);
    React.useEffect(() => {
        if (location === "Home"){
            dispatch(getAllAlbums(10));
        } else{
            dispatch(getAllAlbums());
        }
    }, [location, isBasic])

    if (isBasic){
        return (
            <>
            <h2>Albums</h2>
            <div className={"albums-container-basic"}>
                {Object.values(albums)?.map(album => <Link to={`/albums/${album?.id}`}><AlbumBasic albumInformation={album}/></Link>)}
            </div>
            </>
        )
    }else {
        return (
            <>
            <h2>Albums</h2>
            <div className={"albums-container-complex"}>
                {Object.values(albums)?.map(album => <Link to={`/albums/${album?.id}`}><AlbumComplex albumInformation={album}/></Link>)}
            </div>
            </>
        )
    }
}
