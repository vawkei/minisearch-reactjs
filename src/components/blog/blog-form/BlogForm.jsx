import classes from "./BlogForm.module.scss";
import Card from "../../ui/card/Card";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const authorInputRef = useRef();
  const titleInputRef = useRef();
  const textInputRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (!enteredAuthor || !enteredTitle || !enteredText) {
      return console.log("Inputs must not be empty");
    }

    const blogData = {
      author: enteredAuthor,
      title: enteredTitle,
      text: enteredText,
    };

    console.log(blogData);

    // const response = await fetch("http://localhost:8000/blogs", {
    const response = await fetch("http://localhost:5000/api/v1/posts/createPost", {
      method: "POST",
      body: JSON.stringify({blogData}),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    // if (response.ok) {
    //   navigate("/");
    // }
    if(response.status===201){
      navigate("/");
    }
  };

  return (
    <Card className={classes.card}>
      <h2>Blog form</h2>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {/* {isLoading && <p>Loading...</p>} */}

        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" ref={authorInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="author">Title</label>
          <input type="text" id="title" ref={titleInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="text">Text</label>
          <textarea id="text" rows="5" ref={textInputRef}></textarea>
        </div>

        <div className={classes.actions}>
          <button className="btn">Add Blog</button>
        </div>
      </form>
    </Card>
  );
};

export default BlogForm;
