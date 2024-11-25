import { useEffect, useRef, useState } from "react";
import classes from "./BlogList.module.scss";
import MiniSearch from "minisearch";

const BlogList = () => {
  //create the blog and isLoading state.
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //create the query and results state.
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([])

  // checking if the blog state has been filled
  console.log(blogs);

  const miniSearchRef = useRef(
    new MiniSearch({
      fields: ["title", "author", "text"], // Fields to search on
      storeFields: ["title", "author", "text"], // Fields to return
    })
  );
  
  const miniSearch = miniSearchRef.current;
  console.log("Indexed Blogs after rendering:", miniSearch.documentCount)

  //fetching the blogs from our mock database:
  const fetchBlogs = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/blogs");

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log(data);

      miniSearch.removeAll();

      miniSearch.addAll(data);
      console.log("Indexed Blogs:", miniSearch.documentCount); 

      setBlogs(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  };

  // the search functionality:
  const handleSearch = (event) => {
    setQuery(event.target.value);

    if (event.target.value.trim() === "") {
      return setResults([]); 
    }

    console.log(event.target.value);

    const searchResults = miniSearch.search(event.target.value, { fuzzy: 0.5 });
    console.log("searchResults:", searchResults);
    setResults(searchResults);
  };

  // Conditionally displaying or search results or blogs
  const displayPosts = results.length > 0 ? results : blogs;

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>BlogList</h2>
      {isLoading && <p>Loading...</p>}
      <div className={classes.search}>
        <input placeholder="search" value={query} onChange={handleSearch} />
      </div>
      <div className={classes.blogs}>
        {displayPosts.map((blog) => {
        // {blogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className={classes.blog}
              style={{ padding: "1rem" }}>
              <div className={classes.heading}>
                <h2>{blog.title}</h2>
                <p>
                  written by: <span>{blog.author}</span>{" "}
                </p>
              </div>
              <div>{blog.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
