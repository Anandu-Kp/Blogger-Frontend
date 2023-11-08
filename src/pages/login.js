
import React, { useState } from 'react'
import axios from "axios"

import { Link } from 'react-router-dom';

function Login() {
    if (localStorage.getItem("token")) window.location.href = "/homepage";
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [showPassword, setShowPassword] = useState(false)


    const handlesubmit = (event) => {
        event.preventDefault();
        let userObj = {
            username,
            password
        }
        setUsername("");
        setPassword("");
        axios.post(`http://localhost:3001/user/login`, userObj).then((response) => {

            if (response.status == 201) {
                localStorage.setItem("token", response.data.data.token)
                window.location.href = "/homepage"
            }
            else {
                alert(response.data.message);
            }
        })
            .catch((error) => {

                alert(error.response.data.message)
            })
    }

    return (
        <div>


            <div className="registration-form">
                <h2 className='register-title'>Login</h2>
                <form onSubmit={handlesubmit}>

                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>


                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />




                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                        <label>show password</label>
                        <input style={{ height: "20px", width: "20px" }} onChange={() => setShowPassword(!showPassword)}
                            type='checkbox'
                            value={showPassword}>
                        </input>
                    </div>

                    <button type="submit">login</button>
                </form>
                <span>Dont have an account?<Link to={"/register"}>Register</Link> </span>
            </div>
        </div>
    )
}

export default Login