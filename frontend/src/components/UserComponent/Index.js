import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../store/users';
import { loadSongs } from '../../store/songs';
import SingleSong from '../SongComponents/SingleSong';

export default function User() {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const songsUser = useSelector(state => state.song);
    const userState = useSelector(state => state.user);

    React.useEffect(() => {
        dispatch(loadSongs());
        dispatch(getUsers());
    }, [])

    // React.useEffect(() => {
    //     dispatch(getUsers());
    // }, [])

    return (
        <div>
            <h1>{userState[userId]?.username}</h1>
            {Object.values(songsUser)?.map(song => {
                if (parseInt(song?.userId) === parseInt(userId)) {
                    console.log("In the if")
                    return <SingleSong song={song} userId={userId} />
                } else {
                    console.log("In the else")
                    return null;
                }
            })}
        </div>
    )
}
