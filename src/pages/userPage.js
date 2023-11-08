import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from '../components/Common/NavBar';
import UserProfile from '../components/UserProfile';

function UserPage() {

    if (!localStorage.getItem("token")) {
        alert("you should sign in to access this page");
        window.location.href = "/"
    }
    const { userId } = useParams();

    let [userObj, setUserObj] = useState({});
    let [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        fetchData();
        fetchIsFollowing();
    }, [])

    const fetchData = () => {
        axios.post(`http://localhost:3001/follow/is-following`,
            {
                followingUserId: userId
            }
            , {
                headers: {
                    "blog-token": localStorage.getItem("token")
                }
            }).then((res) => {
                setIsFollowing(res.data.data);
            }).catch((err) => alert(err.message))
        // console.log(localStorage.getItem("token"));
        axios.post(`http://localhost:3001/user/get-user`,
            {
                userId: userId
            }
            , {
                headers: {
                    "blog-token": localStorage.getItem("token")
                }
            }).then((res) => {
                setUserObj(res.data.data);

            }).catch((err) => alert(err.message))
    }
    const fetchIsFollowing = () => {

    }


    return (<>
        <Navbar />
        <div className="profile">
            {userObj.blogs && <UserProfile userObj={userObj} isOtherProfile={true} isFollowing={isFollowing} setIsFollowing={setIsFollowing} />}
        </div></>
    )
}

export default UserPage