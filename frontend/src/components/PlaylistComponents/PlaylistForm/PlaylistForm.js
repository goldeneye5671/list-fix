import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist } from '../../../store/playlist';
// import { getAlbumUser } from '../../store/albums';
//import a function from albums that will add an album

export default function PlaylistForm({isEditForm}) {
    //need to get the id and name of albums from the backend and present them in the form
    //need to get the user's id from the token to add a song to themselves
    const session = useSelector(state => state.session);
    // const userAlbums = useSelector(state => state.album);
    const dispatch = useDispatch();
    const [name, setName] = React.useState('');
    // const [selectedAlbumId, setSelectedAlbumId] = React.useState(null);
    const [errors, setErrors] = React.useState([]);

    // React.useEffect( () => {
    //     dispatch(getAlbumUser(session.user.id));
    // }, [dispatch]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];
        if (!name) {
            errors.push("Please include a title");
        }
        
        if (errors.length > 0){
            setErrors(errors);
        }else {
            const data = {
                // userId,
                name,
            }
            data['userId'] = session.user.id;
            console.log("In event")
            let message = await dispatch(createPlaylist(data));
            console.log("Message: ", message)
        }
    }

    return (
        <form>
            <div className="errors-playlist">
                {errors.length > 0 ? <h2>Errors</h2> : null}
                {errors && errors.map((error, errorid) => (
                    <p key={errorid}>{error}</p>
                ))}
            </div>
            <label>Title of album</label>
            <input placeholder="ex. Long Drive Playlist" required value={name} onChange={e => setName(e.target.value)}/>
            <button onClick={submitHandler}>Make Playlist</button>
        </form>
    )
}
