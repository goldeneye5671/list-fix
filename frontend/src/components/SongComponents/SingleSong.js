import React from 'react'
import SongForm from './form';
import { deleteSong } from '../../store/songs';
import { useDispatch } from 'react-redux';

export default function SingleSong({song, userId}) {
    
    const [showForm, setShowForm] = React.useState(false);
    const dispatch= useDispatch();


    function deleteHandler (e) {
        dispatch(deleteSong(song.id));
    }

    return (
        <>
        <p>{song.title}</p>
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
        </>
    )
}
