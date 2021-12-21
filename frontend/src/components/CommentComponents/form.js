import React from 'react'
import { useDispatch } from 'react-redux';
import { addCommentToSong, updateCommentInSong } from '../../store/songs';

export default function CommentForm({isEdit, showForm, setShowForm, userId, commentInformation, songId}) {
    const [title, setTitle] = React.useState(commentInformation ? commentInformation.title : '');
    const [body, setBody] = React.useState(commentInformation ? commentInformation.body: '')
    const [errors, setErrors] = React.useState([]);
    const dispatch = useDispatch();

    function submitHandler (e) {
        e.preventDefault();
        const errors = []
        if (!title || title.length > 256) {
            errors.push("Song title needs to exist and be a valid url");
        }
        if (!body){
            errors.push("Comment needs to have a value");
        }
        if (errors.length === 0) {
            setShowForm(!showForm);
            if (!isEdit) {
                dispatch(addCommentToSong(
                    {
                        userId,
                        title,
                        songId,
                        body
                    }
                ));
            } else {
                dispatch(updateCommentInSong(
                {
                    userId: commentInformation.userId,
                    commentId: commentInformation.id,
                    title,
                    songId: commentInformation.songId,
                    body
                }
                ))
            }
        }
    }

    return (
        <div>
            <h1>Comment Form!</h1>
            <div className={"errors"}>
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
                <label htmlFor={"title"}>Title: </label>
                <input name={"title"} value={title} onChange={e => setTitle(e.target.value)}></input>

                <label htmlFor={"body"}> Comment: </label>
                <input name={"body"} value={body} onChange={e => setBody(e.target.value)}></input>

                <button onClick={submitHandler}>{!isEdit ? 'Add new comment' : 'Edit comment'}</button>
                <button onClick={e => setShowForm(!showForm)}>Cancel</button>
            </form>
        </div>
    )
}
