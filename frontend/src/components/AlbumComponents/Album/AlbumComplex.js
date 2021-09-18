import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumOne } from '../../../store/albums'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import SongComplex from '../../SongComponents/Song/SongComplex'

export default function AlbumComplex({albumInformation}) {
    const {albumId} = useParams();
    const dispatch = useDispatch();
    const album = useSelector(state => state.album);
    const userInfo = useSelector(state => state.session);

    React.useEffect(() => {
        if (!albumInformation){
            dispatch(getAlbumOne(albumId));
        }
    }, [])

    let retVal;

    if (albumInformation) {
        retVal = (
            <div className={"albums-container"} key={albumInformation?.id}>
                <div className={"image-album"} >
                    <img src={"test"}></img>
                </div>
                <div className={"album-content"}>
                    <h3>{albumInformation?.title}</h3>
                    <h4>{albumInformation?.User?.username}</h4>
                    <Link to={`/albums/${albumInformation?.id}`}> See more info </Link>
                </div>
                <div className={"songs"}>
                    {
                        (albumInformation.Songs?.length === 0)  ? <p>No songs</p> : albumInformation.Songs?.map(song => <SongComplex songInformation={song} />)
                    }
                </div>
            </div>
        )
    } else {
        retVal = (
            <>
            <div className={"albums-container"} key={album?.id}>
                <div className={"image-album"} >
                    <img src={"test"}></img>
                </div>
                <div>
                    <h3>{album?.title}</h3>
                    <h4>{album?.User?.username}</h4>
                </div>
                    {
                        (userInfo?.user && userInfo?.user?.id === album?.userId) ? (<>
                        <button>Add Song</button>
                        <button>Edit Album</button>
                        <button>Delete Album</button>
                        </>
                        ):null
                    }
                    <button>play</button>
              </div>
              <div className={"songs-album-page"}>
                    {
                        album?.Songs?.map(song => <SongComplex key={song.id} songIdProp={song.id} />)
                    }
                </div>
            </>
        )
    }

    return retVal
}
