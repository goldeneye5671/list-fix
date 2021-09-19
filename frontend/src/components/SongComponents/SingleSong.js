import React from 'react'
import SongForm from './form';
import { deleteSong, loadSongs } from '../../store/songs';
import { useDispatch } from 'react-redux';
import Comments from '../CommentComponents/Index';
export default function SingleSong({song, userId}) {
    
    const [showForm, setShowForm] = React.useState(false);
    const dispatch= useDispatch();

    React.useEffect( () => {
        dispatch(loadSongs())
    }, [showForm, dispatch])

    function deleteHandler (e) {
        dispatch(deleteSong(song.id));
    }

    return (
        <div className={"song-container"}>
            <div className={"song-information"}>
                <h1>{song.title}</h1>
                {
                    (userId === song.userId) ? 
                        !showForm ?
                            (
                                <>
                                    <button onClick={e => setShowForm(!showForm)}>Edit</button>
                                    <button onClick={deleteHandler}>Delete</button>
                                </>    
                            )
                        :
                            <SongForm isEdit={true} showForm={showForm} setShowForm={setShowForm} userId={userId} songInformation={song} />
                    :
                        null
                }
            </div>
            <Comments className={"comments-container"}comments={song.Comments} songId={song?.id} />
        </div>
    )
}