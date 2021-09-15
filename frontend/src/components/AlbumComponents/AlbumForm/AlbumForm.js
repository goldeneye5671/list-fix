import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createAlbum } from '../../../store/albums';
// import { getAlbumUser } from '../../store/albums';
//import a function from albums that will add an album

export default function AlbumForm({isEditForm}) {
    //need to get the id and name of albums from the backend and present them in the form
    //need to get the user's id from the token to add a song to themselves
    const session = useSelector(state => state.session);
    // const userAlbums = useSelector(state => state.album);
    const dispatch = useDispatch();
    const [title, setTitle] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    // const [selectedAlbumId, setSelectedAlbumId] = React.useState(null);
    const [errors, setErrors] = React.useState([]);

    // React.useEffect( () => {
    //     dispatch(getAlbumUser(session.user.id));
    // }, [dispatch]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];
        if (!title) {
            errors.push("Please include a title");
        }
        if (!imageUrl) {
            errors.push("Please include a song url");
        }
        if (errors.length > 0){
            setErrors(errors);
        }else {
            const data = {
                // userId,
                title,
                imageUrl,
            }
            data['userId'] = session.user.id;
            let message = await dispatch(createAlbum(data));
            console.log("Message: ", message)
        }
    }

    return (
        <form>
            <div className="errors-album">
                {errors.length > 0 ? <h2>Errors</h2> : null}
                {errors && errors.map((error, errorid) => (
                    <p key={errorid}>{error}</p>
                ))}
            </div>
            <label>Title of album</label>
            <input placeholder="ex. Abbey Road" required value={title} onChange={e => setTitle(e.target.value)}/>
            <label>Url of album image</label>
            <input placeholder="ex. www.song.com/song" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <button onClick={submitHandler}>Make album</button>
        </form>
    )
}
