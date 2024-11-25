import BlogForm from "./components/blog/blog-form/BlogForm";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import BlogList from "./components/blog/blog-list/BlogList";
import BlogList from "./components/blog/blog-list/BlogListTuts";
 import BlogDetails from "./components/blog/blog/BlogDetails";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />
        {/* <Route path="/blogs" element={<BlogList />} /> */}
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog-form" element={<BlogForm />} />
        <Route path="/blogs/:id" element={<BlogDetails/>} />
        
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
