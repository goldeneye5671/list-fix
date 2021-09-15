import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAlbums } from '../../../store/albums';
import { Link } from 'react-router-dom';

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
        <div>
            <h2>Albums</h2>
          <ul>
              {
                  Object.values(albums).map(album => (
                      <li key={album?.id}><Link to={`/albums/${album?.id}`}>{album?.title}</Link></li>
                  ))
              }
          </ul>  
        </div>
    )
}
