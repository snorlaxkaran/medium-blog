import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/signin";
import { PostBlogs } from "./pages/postBlog";
import { Signup } from "./pages/signup";
import { Blogs } from "./pages/blogs";
import { Blog } from "./pages/blog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Sign in route */}
          <Route path="/signin" element={<Signin />} />
          {/* Sign up route */}
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          {/* Get a singler blog */}
          <Route path="/blog/:id" element={<Blog />} />
          {/* Create blog */}
          <Route path="/create-blog" element={<PostBlogs />} />
          {/* Get all the blogs */}
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
