import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumUser } from '../../../store/albums';
import { createSong, updateSong } from '../../../store/songs';

export default function SongForm({song, isEditForm, update, setUpdate}) {
    //need to get the id and name of albums from the backend and present them in the form
    //need to get the user's id from the token to add a song to themselves
    const session = useSelector(state => state.session);
    const userAlbums = useSelector(state => state.album);
    const dispatch = useDispatch();
    const [title, setTitle] = React.useState('');
    const [songUrl, setSongUrl] = React.useState('');
    const [selectedAlbumId, setSelectedAlbumId] = React.useState(null);
    const [errors, setErrors] = React.useState([]);

    React.useEffect( () => {
        dispatch(getAlbumUser(session.user.id));
        if (update) {
            setTitle(song?.title)
            setSongUrl(song?.songUrl);
            console.log("Song",song)
        }
    }, [dispatch]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];
        if (!title) {
            errors.push("Please include a title");
        }
        if (!songUrl) {
            errors.push("Please include a song url");
        }
        if (!selectedAlbumId){
            errors.push("Please select an album")
        }
        if (errors.length > 0){
            setErrors(errors)
            return null;
        }else {
            const data = {
                // userId,
                title,
                songUrl,
                selectedAlbumId,
            }
            data['userId'] = session.user.id;
            data['songId'] = song.id;
            console.log(data)
            if (update) {
                setUpdate(!update);
                await dispatch(updateSong(data))
            } else {
                await dispatch(createSong(data));
            }
        }
    }

    return (
        <form>
            <div className="errors-song">
            {errors.length > 0 ? <h2>Errors</h2> : null}
                {errors && errors.map((error, errorid) => (
                    <p key={errorid}>{error}</p>
                ))}
            </div>
            <label>Title of song</label>
            <input placeholder="ex. Love me do" required value={title} onChange={e => setTitle(e.target.value)}/>
            <label>Album of song</label>
            <select onChange={e => setSelectedAlbumId(e.target.value)}>
                <option value={null}>Select an album</option>
                {userAlbums.albums?.map( album => (
                    <option key={album.id} value={album.id}>{album.title}</option>
                ))}
            </select>
            <label>Url of song</label>
            <input placeholder="ex. www.song.com/song" required value={songUrl} onChange={e => setSongUrl(e.target.value)} />
            <button onClick={submitHandler}>Make song</button>
        </form>
    )
}
