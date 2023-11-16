import axios from "axios"
import Button from "../Common/Button"
import "./styles.css"
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

function BlogItem({ blogId, isMyBlogs, blogs, setBlogs }) {

    const [isEdit, setIsEdit] = useState(false)
    const [blogObj, setBlogObj] = useState();
    const [newTitle, setNewTitle] = useState()
    const [newTextData, setNewTextData] = useState()

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/blog/get-blog/${blogId}`, {
            headers: {
                "blog-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                setBlogObj(res.data.data)
                setNewTextData(res.data.data.textBody)
                setNewTitle(res.data.data.title)
            }
            )
            .catch((err) => alert(err.message))
    }
    const handleDelete = (id) => {

        let upDatedList = blogs.filter((blog) => {
            return blog._id != id
        })
        axios.delete(`${process.env.REACT_APP_BASE_URL}/blog/delete/${id}`, {
            headers: {
                "blog-token": localStorage.getItem("token")
            }
        })
            .then((res) => {

                setBlogs(upDatedList);
                // window.location.reload()
            })
            .catch((err) => alert(err.message))

    }


    const handleEditSubmit = (e) => {
        e.preventDefault();

        const newBlogObj = {
            blogId: blogObj._id,
            title: newTitle,
            textBody: newTextData
        }


        axios.put(`${process.env.REACT_APP_BASE_URL}/blog/update`, newBlogObj, {
            headers: {
                "blog-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                setIsEdit(false)
                fetchData()
            })
            .catch((err) => alert(err.message))
    }
    return (<>
        {blogObj && (<div className="blog-item">
            {isEdit ?
                <div className="edit-blog">
                    <h2>Edit Blog</h2>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="text">Text:</label>
                            <textarea
                                id="text"
                                value={newTextData}
                                onChange={(e) => setNewTextData(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button value={"EDIT"} />
                        </div>
                    </form>
                </div>

                : <> <Link to={`/blog/${blogId}`} ><div className="blog-item-header">

                    <div className="blog-item-header-left">
                        <h2>{blogObj.title}</h2>
                        <span>by<span> {blogObj.username}</span></span>
                    </div>
                    <span>{blogObj.creationDateAndTime.split("T")[0]}</span>
                </div>
                    <div className="blog-item-main">
                        <p className="blog-item-content">
                            {blogObj.textBody}
                            <span>read more...</span>
                        </p>
                    </div></Link>
                    {isMyBlogs && (<div className="blog-item-footer">
                        <Button value={"Edit"} onClick={() => setIsEdit(true)} />
                        <Button value={"Delete"} onClick={() => handleDelete(blogId)} />
                    </div>)}</>
            }
        </div >)}</>
    )
}

export default BlogItem                                                                                                                                                     