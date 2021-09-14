import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumUser } from '../../store/albums';

export default function SongForm() {
    //need to get the id and name of albums from the backend and present them in the form
    //need to get the user's id from the token to add a song to themselves
    const userInfo = useSelector(state => state.session);
    const userAlbums = useSelector(state => state.album)
    const dispatch = useDispatch();
    dispatch(getAlbumUser(userInfo.user.id));
    const [title, setTitle] = React.useState('');
    const [songUrl, setSongUrl] = React.useState('');
    const [selectedAlbumId, setSelectedAlbumId] = React.useState(1)

    // React.useEffect( () => {
        
    // }, []);

    return (
        <form>
            <label>Title of song</label>
            <input placeholder="ex. Love me do" required value={title} onChange={e => setTitle(e.target.value)}/>
            <label>Album of song</label>
            <select onChange={e => setSelectedAlbumId(e.target.value)}>
                {userAlbums.albums.map( album => (
                    <option key={album.id} value={album.id}>{album.name}</option>
                ))}
            </select>
            <label>Url of song</label>

        </form>
    )
}
