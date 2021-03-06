import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadSongs } from '../../store/songs';
import SongForm from './form';
import SingleSong from './SingleSong';

export default function Songs() {
    const songState = useSelector(state => Object.values(state.song));
    const userState = useSelector(state => state.session);
    const userId = userState?.user?.id
    const dispatch = useDispatch();

    const [showForm, setShowForm] = React.useState(false);

    React.useEffect( () => {
        dispatch(loadSongs())
    }, [showForm])

    return (
        <div className={"songs-container"}>
            {
                !showForm ? 
                    userId ? 
                        (
                            <div className={"home-container"}>
                                <h2>All songs</h2>
                                <button onClick={e => setShowForm(!showForm)}>add song</button>
                            </div>
                        ) 
                    : 
                        null
                :
                    <SongForm isEdit={false} showForm={showForm} setShowForm={setShowForm} userId={userId}/>
            }
            {
                songState?.map(song => (
                    <SingleSong className={"song-container"} song={song} userId={userId}/>
                ))
            }
        </div>
    )
}
