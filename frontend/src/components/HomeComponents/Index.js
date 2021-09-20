import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

export default function Home() {
    const userState = useSelector(state => state.session);
    
    React.useEffect(() => {
        
    }, [])

    return (
        <div>
            {
                userState?.user ? (
                    <div className={"home-container"}>
                        <div>
                            <h1>Welcome back, {userState.user.username}</h1>
                        </div>
                    <div></div>
                    </div>
                )
                :
                (
                    <div>
                        <h1>Get your listfix here!</h1>
                        <p>Join to share all of your favorite songs!</p>
                    </div>
                )

            }
        </div>
    )
}
