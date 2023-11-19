import Home from "./layout/Home";
import Footer from "./layout/Footer";
import Post from "./post/Post";
import PostComment from "./post/PostComment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from "./layout/Content";
export default function App() {
  return (
    <div>
      <Router>
        <Home />
        <Routes>
          <Route exact path="/" element={<Content />} />
          <Route exact path="/post" element={<Post />} />
          {/* <Route exact path="/edituser/:id" element={<EditUser />} /> */}
          <Route exact path="/post/:id/comments" element={<PostComment />} />
        </Routes>
      </Router>
    </div>
  );
}
