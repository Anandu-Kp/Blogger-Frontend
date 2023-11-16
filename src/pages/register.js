import React, { useState } from 'react'
import "../style.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    let [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/user/register`, formData)
            .then((res) => {
                setFormData({
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                })
                // localStorage.setItem("token", res.data.data.token)
                window.location.href = "/"

            })
            .catch((err) => err.response ? alert(err.response.data.message) : alert(err.message))
        // console.log(formData);
    };

    return (
        <div className="registration-form">
            <h2 className='register-title'>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                    <label>show password</label>
                    <input style={{ height: "20px", width: "20px" }} onChange={() => setShowPassword(!showPassword)}
                        type='checkbox'
                        value={showPassword}>
                    </input>
                </div>

                <button type="submit">Register</button>
            </form>
            <span>Already have an account?<Link to={"/login"}>Login</Link> </span>
        </div>

    );
}

export default Register