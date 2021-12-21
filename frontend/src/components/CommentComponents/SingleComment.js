import React from 'react'
import { useDispatch } from 'react-redux';
import {
    loadSongs,
    deleteCommentInSong
} from '../../store/songs';
import CommentForm from './form';

export default function SingleComment({comment, userId}) {
    
    const [showForm, setShowForm] = React.useState(false);
    const dispatch= useDispatch();
    
    function deleteHandler (e) {
        console.log("Event triggered")
        dispatch(deleteCommentInSong(comment));
    }

    return (
        <div className="coment">
            <h6>{comment.title}</h6>
            <p>{comment.body}</p>
            {
                (userId === comment.userId) ?
                    !showForm ?
                        (
                            <>
                            <button onClick={e => setShowForm(!showForm)}>Edit</button>
                            <button onClick={deleteHandler}>Delete</button>
                            </>
                        )
                    :
                            <CommentForm isEdit={true} showForm={showForm} setShowForm={setShowForm} commentInformation={comment}/>
                :
                    null
            }
        </div>
    )
}
