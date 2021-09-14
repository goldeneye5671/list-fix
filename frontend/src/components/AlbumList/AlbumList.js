import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAlbums } from '../../store/albums'

export default function AlbumList() {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.album);
    React.useEffect(() => {
        dispatch(getAllAlbums());
    }, [])
    return (
        <div>
          <ul>
              {
                  Object.values(albums).map(album => (
                      <li key={album.id}>{album.title}</li>
                  ))
              }
          </ul>  
        </div>
    )
}
