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
            {
                Object.values(albums).map(album => {
                      return (
                      <div className={"albums-container"} key={album?.id}>
                          <div className={"image-name-album"} >
                                <img src={"test"}></img>
                                <Link to={`/albums/${album?.id}`}>
                                    <ul>
                                        <li>{album?.title}</li>
                                        <li>{album?.User?.username}</li>
                                    </ul>
                                </Link>
                          </div>
                        </div>
                  )
                }
              )
              }
        </div>
    )
}
