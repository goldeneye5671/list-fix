import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import SingleComment from './SingleComment';
import { loadSongs} from '../../store/songs';
import CommentForm from './form';
export default function Comments({comments, songId}) {
    const userState = useSelector(state => state.session);
    // userState.user ? console.log("State exists") : console.log("State doesnt exist")
    const userId = userState.user ? userState?.user.id : null;

    const [showForm, setShowForm] = React.useState(false);

    return (
        <div className={"comment-container"}>
            <div className={"header"}>
                {
                    <>
                        <h3>Comments</h3>
                        {
                            userId ?
                                !showForm ? <button onClick={e => setShowForm(!showForm)}>Add Comment</button>
                                    :
                                (
                                    <CommentForm isEdit={false} showForm={showForm} setShowForm={setShowForm} userId={userId} songId={songId}/>
                                )
                            : 
                            null
                        }
                    </>
                }
            </div>
            <div className={"comments"}>
                    {
                        comments ? 
                            comments?.map(comment => {
                                return <SingleComment comment={comment} userId={userId} />
                            })
                        :
                            <p>No comments</p>
                    }
            </div>
        </div>
    )
}
