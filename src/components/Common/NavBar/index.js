import "./styles.css"
import { Link } from "react-router-dom"
import bloggerLogo from "../../../Assets/blogger-logo.png"

function Navbar() {


    return (
        <div className="nav">
            <Link to="/homepage"><div className="nav-left">
                <img src={bloggerLogo} ></img>
                <span>Blogger.</span>
            </div></Link>
            <div className="nav-right">
                <Link to="/homepage">Home</Link>
                <Link to="/create-blog">Create Blog</Link>
                <Link to="/users">Users</Link>
                <Link to="/profile">Profile</Link>
                <Link onClick={() => localStorage.removeItem("token")} to="/">Logout</Link>
            </div>
        </div>
    )

}

export default Navbar