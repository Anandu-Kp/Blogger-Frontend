import axios from 'axios'
import React, { useState } from 'react'
import Button from '../components/Common/Button'
import Navbar from '../components/Common/NavBar'

function CreateBlog() {
    if (!localStorage.getItem("token")) {
        alert("you should sign in to access this page");
        window.location.href = "/"
    }


    const [title, setTitle] = useState("")
    const [textData, setTextData] = useState("")
    const handleSaveBlog = (e) => {
        e.preventDefault()
        const blogObj = {
            title,
            textBody: textData,
        }
        setTitle("");
        setTextData("");

        axios.post(`http://localhost:3001/blog/create`, blogObj, {
            headers: {
                "blog-token": localStorage.getItem("token")
            }
        }).then((res) => {
            window.location.href = "/profile"
        })
            .catch((err) => alert(err.message))
    }
    return (
        <div>
            <Navbar />
            <div className="edit-blog">
                <h2>Create Blog</h2>
                <form >
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="text">Text:</label>
                        <textarea
                            id="text"
                            value={textData}
                            onChange={(e) => setTextData(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button value={"SAVE"} onClick={handleSaveBlog} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog