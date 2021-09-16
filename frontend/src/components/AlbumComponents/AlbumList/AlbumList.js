import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAlbums } from '../../../store/albums';
import { Link } from 'react-router-dom';
import Album from '../Album/Album';

export default function AlbumList({location}) {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.album);
    React.useEffect(() => {
        if (location === "Home"){
            dispatch(getAllAlbums(2));
        } else{
            dispatch(getAllAlbums());
        }
    }, [location])

    return (
        <div className={"album-container"}>
            <h2>Albums</h2>
            {
                Object.values(albums)?.map(album => {
                    return <Album albumInformation={album}/>
                }
              )
              }
        </div>
    )
}
