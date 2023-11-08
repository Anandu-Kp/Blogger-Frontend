
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/register';
import Login from './pages/login';
import HomePage from './pages/homepage';
import Profile from "./pages/profile";
import CreateBlog from "./pages/createBlog";
import Blog from "./pages/blogpage";
import Users from "./pages/users";
import UserPage from "./pages/userPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="/create-blog" element={<CreateBlog />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/blog/:blogId" element={<Blog />}></Route>
        <Route path="/user/:userId" element={<UserPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
