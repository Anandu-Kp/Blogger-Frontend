import React, { useEffect, useState } from 'react'
import BlogItem from '../BlogItem'
import "./styles.css"
import axios from 'axios'
import Button from '../Common/Button'

function UserProfile({ userObj, isOtherProfile, isFollowing, setIsFollowing }) {
    const [blogs, setBlogs] = useState(userObj.blogs)


    const handleFollow = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/follow/follow-user`, {
            followingUserId: userObj.userId
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
    const handleUnFollow = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/follow//unfollow-user`, {
            followingUserId: userObj.userId
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
        <div className="user-profile">
            <div className="profile-header">
                <div>
                    <h2>{userObj.username}</h2>
                    {isOtherProfile && <>{!isFollowing ? <Button value={"follow"} onClick={handleFollow} /> : <Button value={"unfollow"} onClick={handleUnFollow} color={"rgba(248, 82, 82, 0.966)"} />}</>}

                </div>
                <span>{blogs.length} Blogs</span>
            </div>
            {blogs.length == 0 ? <div className='no-blogs'>
                <span>No blogs to show</span>
            </div> : (<div className='my-blogs'>
                <h1 className='my-blogs-title'>BLOGS</h1>
                <div className='my-blogs-contner'>
                    {blogs.map((blog, key) => <BlogItem blogId={blog._id} isMyBlogs={!isOtherProfile} blogs={blogs} setBlogs={setBlogs} />)}

                </div>
            </div>)}
        </div>
    )
}

export default UserProfile