import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from '../components/Common/NavBar';

function Blog() {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState();

    if (!localStorage.getItem("token")) {
        alert("you should sign in to access this page");
        window.location.href = "/login"
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:3001/blog/get-blog/${blogId}`, {
            headers: {
                "blog-token": localStorage.getItem("token")
            }
        })
            .then((res) => setBlogData(res.data.data))
            .catch((err) => alert(err.message))
    }
    return (
        <> <Navbar />
            <div className='blog-container'>
                {blogData &&
                    (<><div className="blog-item-header">

                        <div className="blog-item-header-left">
                            <h2>{blogData.title}</h2>
                            <span>by<span> {blogData.username}</span></span>
                        </div>
                        <span>{blogData.creationDateAndTime.split("T")[0]}</span>
                    </div>

                        <div className='blog-main'>
                            <p className="blog-content">
                                {blogData.textBody}
                            </p>
                        </div></>)}
            </div></>
    )
}

export default Blog