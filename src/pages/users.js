import React, { useEffect, useState } from 'react'
import UserCard from '../components/Usercard'
import Navbar from '../components/Common/NavBar'
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [isFollowing, setIsFollowing] = useState()
    useEffect(() => {
        fetchUsers();
    }, [isFollowing]);

    const fetchUsers = async () => {
        axios.get(`http://${process.env.REACT_APP_BASE_URL}/user/get-users`, {
            headers: {
                "blog-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                setUsers(res.data.data);
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Navbar />
            <div style={{
                display: "flex:",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                margin: "1rem 2rem"
            }}>
                <div className='user-container'>
                    {
                        users.map((user) => {
                            return <UserCard user={user} isFollowing={user.following} setIsFollowing={setIsFollowing} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Users