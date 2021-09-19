import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import SingleComment from './SingleComment';
import { addCommentToSong, loadSongs} from '../../store/songs';
import CommentForm from './form';
export default function Comments({comments, songId}) {
    const userState = useSelector(state => state.session);
    const songState = useSelector(state => state.song);
    const userId = userState?.user.id;
    const dispatch = useDispatch();

    const [showForm, setShowForm] = React.useState(false);

    React.useEffect( () => {
        dispatch(loadSongs())
    }, [showForm])

    return (
        <div className={"comments-container-main"}>
            <div className={"comments-header"}>
                {
                    !showForm ? 
                    userId ? 
                    (<>
                        <h3>Comments:</h3>
                        <button onClick={e => setShowForm(!showForm)}>Add Comment</button>
                    </>)
                            :
                            null
                        :
                    <CommentForm isEdit={false} showForm={showForm} setShowForm={setShowForm} userId={userId} songId={songId}/>
                }
            </div>
            <div className={"comments-container"}>
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
