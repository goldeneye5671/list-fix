import React from 'react'
import { addSong, updateSong } from '../../store/songs';
import { useDispatch } from 'react-redux';

export default function SongForm({isEdit, showForm, setShowForm, userId, songInformation}) {
    
    const [title, setTitle] = React.useState(songInformation ? songInformation.title : '');
    const [songUrl, setSongUrl] = React.useState(songInformation ? songInformation.songUrl : '' );
    const [errors, setErrors] = React.useState([]);
    const dispatch = useDispatch();

    function isNotValidHttpUrl(string) {
        let url;
        try {
          url = new URL(string);
        } catch (_) {
          return true;  
        }
        return false;
      }

    function submitHandler (e) {
        e.preventDefault();
        const errors = [];
        if(!title || title.length > 256) {
            errors.push("Title needs to exist and be less than 256 characters");
        }
        if (!songUrl || isNotValidHttpUrl(songUrl)) {
            errors.push("Song url needs to exist and be a valid url");
        }
        if (errors.length === 0){
            setShowForm(!showForm);
            alert("Song is being processed");
            if (!isEdit) {
                dispatch(addSong({
                    userId,
                    title,
                    songUrl
                }))
            } else {
                dispatch(updateSong({
                    songId: songInformation.id,
                    userId,
                    title,
                    songUrl
                }))
            }
        } else {
            console.log(errors)
            setErrors(errors);
        }
    }
    
    return (
        <div>
            <h1>Song form!</h1>
            
            <div className={"errors"} >
                {
                    errors.length > 0 ?
                        (
                            <>
                            <h2>Errors: </h2>
                            <ul>
                                {errors.map((error, id) => 
                                    (
                                        <li key={id}>{error}</li>
                                    )
                                )}
                            </ul>
                            </>
                        )
                    :
                        null
                }
            </div>
            <form>
                <label htmlFor={'title'}>Title: </label>
                <input name={'title'} value={title} onChange={e => setTitle(e.target.value)}></input>

                <label htmlFor={'songUrl'}>Song Url: </label>
                <input name={'songUrl'} value={songUrl} onChange={e => setSongUrl(e.target.value)}></input>

                <button onClick={submitHandler}>{!isEdit ? 'Add new song' : 'Edit song'}</button>
                <button onClick={e => setShowForm(!showForm)}>Cancel</button>
            </form>
        </div>
    )
}
