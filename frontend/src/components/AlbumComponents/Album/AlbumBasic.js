import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumOne } from '../../../store/albums'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Song from '../../SongComponents/Song/SongBasic'

export default function AlbumBasic({albumInformation, isBasic}) {
    const {albumId} = useParams();
    const dispatch = useDispatch();
    const album = useSelector(state => state.album);
    const userInfo = useSelector(state => state.session);

    React.useEffect(() => {
        if (!albumInformation){
            dispatch(getAlbumOne(albumId));
        }
    }, [])



    if (albumInformation) {
        return (
            <div className={"album-basic-container"} key={albumInformation?.id}>
                <div className={"album-image-basic"} >
                    <img src={"test"}></img>
                </div>
                <div className={"album-basic-content"}>
                    <h3>{albumInformation?.title}</h3>
                    <h4>{albumInformation?.User?.username}</h4>
                </div>
            </div>
        )
    } else {
        return (
            <div className={"album-container-basic"} key={album?.id}>
                <div className={"image-album-basic"} >
                    <img src={"test"}></img>
                </div>
                <div className={"album-info-basic"}>
                    <h3>{album?.title}</h3>
                    <h4>{album?.User?.username}</h4>
                </div>
                    <button>play</button>
            </div>
        )
    }
}
