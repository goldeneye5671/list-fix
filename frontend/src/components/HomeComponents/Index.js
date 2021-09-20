import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
    const userState = useSelector(state => state.session);
    
    React.useEffect(() => {
        
    }, [])

    return (
        <div>
            {
                userState?.user ? (
                    <div className={"home-container"}>
                            <h1>Welcome back, {userState.user.username}</h1>
                            <div className={"user-links"}>
                                <Link to="/songs"> See some songs!</Link>
                                <Link to={`/users/${userState?.user?.id}`}>See yourself</Link>
                            </div>
                    </div>
                )
                :
                (
                    <div className={"home-container"}>
                        <h1>Get your listfix here!</h1>
                        <p>Join to share all of your favorite songs!</p>
                    </div>
                )

            }
        </div>
    )
}
