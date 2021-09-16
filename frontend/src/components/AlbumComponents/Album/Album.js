import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumOne } from '../../../store/albums'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Album({albumInformation}) {
    const {albumId} = useParams();
    const dispatch = useDispatch();
    const album = useSelector(state => state.album);
    React.useEffect(() => {
        if (!albumInformation){
            dispatch(getAlbumOne(albumId));
        }
    }, [])

    let retVal;

    if (albumInformation) {
        retVal = (
            <div className={"albums-container"} key={albumInformation?.id}>
                <div className={"image-name-album"} >
                        <img src={"test"}></img>
                        <Link to={`/albums/${albumInformation?.id}`}>
                            <ul>
                                <li>{albumInformation?.title}</li>
                                <li>{albumInformation?.User?.username}</li>
                            </ul>
                        </Link>
                </div>
                <div>
                    {
                        (albumInformation?.Songs.length === 0 || !albumInformation )  ? <p>No songs</p> : albumInformation.Songs.map(song => (
                            <p>{song.title}</p>
                        ))
                    }
                </div>
            </div>
        )
    } else {
        retVal = (
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

    return retVal
}
