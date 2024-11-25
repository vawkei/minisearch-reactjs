import classes from "./BlogDetails.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../ui/card/Card";

const BlogDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState({});
  console.log(blog);

  const fetchBlog = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/blogs/` + id);
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log(data);
      setBlog(data);

    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <Card className={classes["main-container"]}>
      {isLoading && <p>Loading...</p>}

      <h2>Blog Detail</h2>

      <div className={classes.blogs}>
        <Card key={blog.id} className={classes.blog}>
          <div className={classes.heading}>
            <h2>{blog.title}</h2>
            <p>
              written by: <span>{blog.author}</span>{" "}
            </p>
          </div>

          <div>{blog.text}</div>
        </Card>
      </div>
    </Card>
  );
};

export default BlogDetails;
