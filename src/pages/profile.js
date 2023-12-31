import React, { useEffect, useState } from 'react'
import BlogItem from '../components/BlogItem'
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import Navbar from '../components/Common/NavBar';

function Profile() {
    if (!localStorage.getItem("token")) {
        alert("you should sign in to access this page");
        window.location.href = "/"
    }


    let [userObj, setUserObj] = useState({});

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/user/get-user`, {}, {
            headers: {
                "blog-token": localStorage.getItem("token")
            }
        }).then((res) => {
            setUserObj(res.data.data);

        }).catch((err) => alert(err.message))
    }
    return (<>
        <Navbar />
        <div className="profile">
            {userObj.blogs && <UserProfile userObj={userObj} isOtherProfile={false} />}
        </div></>
    )
}

export default Profile