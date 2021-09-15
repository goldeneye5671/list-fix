import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumOne } from '../../../store/albums'
import {useParams} from 'react-router-dom'

export default function Album() {
    const {albumId} = useParams();
    const dispatch = useDispatch();
    const album = useSelector(state => state.album);
    React.useEffect(() => {
        dispatch(getAlbumOne(albumId));
    }, [])
    return (
        <div>
            {album.title}
        </div>
    )
}
