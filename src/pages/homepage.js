import React, { useEffect, useState } from 'react'
import BlogItem from '../components/BlogItem'
import Navbar from '../components/Common/NavBar'
import axios from 'axios';

function HomePage() {
    if (!localStorage.getItem("token")) {
        alert("you should sign in to access this page");
        window.location.href = "/"
    }

    const [blogList, setBlogList] = useState();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/blog//get-home-page-blogs`, {
            headers: {
                "blog-token": localStorage.getItem("token")
            }
        }).then((res) => {
            if (res.status == 200) setBlogList(res.data.data);


        })
            .catch((err) => alert(err.message))
    }

    return (
        <div>
            <Navbar />
            {!blogList ?
                <div className='not-following'>
                    <span>Nothing to show</span>
                </div>
                : (<div style={{ margin: "50px" }}>
                    {blogList.map((blog, key) => <BlogItem blogId={blog._id} isMyBlogs={false} />)}

                </div>)}
        </div>
    )
}

export default HomePage