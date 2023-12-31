import React, { useState } from 'react'
import "./styles.css"
import Button from "../Common/Button"
import axios from 'axios'

function UserCard({ user, isFollowing, setIsFollowing }) {
    let value = isFollowing ? "unfollow" : "follow";

    const handleFollow = (event) => {
        event.stopPropagation()
        axios.post(`${process.env.REACT_APP_BASE_URL}/follow/follow-user`, {
            followingUserId: user.userId
        },
            {
                headers: {
                    "blog-token": localStorage.getItem("token")
                }
            })
            .then((res) => {
                setIsFollowing(true);

            })
            .catch((err) => err.response.data.message ? alert(err.response.data.message) : alert(err))
    }
    const handleUnFollow = (event) => {
        event.stopPropagation()
        axios.post(`${process.env.REACT_APP_BASE_URL}/follow//unfollow-user`, {
            followingUserId: user.userId
        },
            {
                headers: {
                    "blog-token": localStorage.getItem("token")
                }
            })
            .then((res) => {
                setIsFollowing(false);

            })
            .catch((err) => err.response.data.message ? alert(err.response.data.message) : alert(err))
    }



    return (
        <div className='user-card' onClick={() => window.location.href = `/user/${user.userId}`}>
            <span>{user.username}</span>
            {!isFollowing ? <Button value={value} onClick={handleFollow} /> : <Button value={value} onClick={handleUnFollow} color={"rgba(248, 82, 82, 0.966)"} />}
        </div>
    )
}

export default UserCard