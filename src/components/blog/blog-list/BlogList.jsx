import { useEffect, useRef, useState } from "react";
import classes from "./BlogList.module.scss";
import MiniSearch from "minisearch";
import Card from "../../ui/card/Card";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);


  console.log("blogs:",blogs)


  // const miniSearch = new MiniSearch({
  //   fields: ["title", "author", "text"],
  //   storeFields: ["title", "author", "text"],
  // });

  // console.log("Indexed Blogs after rendering:", miniSearch.documentCount);


 // Use a ref to persist the MiniSearch instance
 
 const miniSearchRef = useRef(
  new MiniSearch({
    fields: ["title", "author", "text"], // Fields to search on
    storeFields: ["title", "author", "text"], // Fields to return
  })
);

const miniSearch = miniSearchRef.current;
console.log("Indexed Blogs after rendering:", miniSearch.documentCount)

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const fetchBlogs = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/blogs");

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log(data);

      // Ensure MiniSearch is cleared before adding new documents
      miniSearch.removeAll();

      // in other to get rid of the MiniSearch: duplicate ID 1 we do this:
      const uniqueBlogs = data.map((blog) => ({
        title:blog.title,
        author:blog.author,
        text:blog.text,
        id: blog.id.toString(),
      }));

      miniSearch.addAll(uniqueBlogs);
      console.log("Indexed Blogs:", miniSearch.documentCount); // Log number of indexed blogs

      setBlogs(uniqueBlogs);

    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  
    if (event.target.value.trim() === "") {
      return setResults([]); // Clear results if query is empty
    }

    console.log(event.target.value)
  
    const searchResults = miniSearch.search(event.target.value, { fuzzy: 0.2 });
    console.log("searchResults:",searchResults)

    // // Map the search results to full blog objects
    // const filteredBlogs = searchResults.map((result) =>
    //   blogs.find((blog) => blog.id === result.id)
    // );
  
    setResults(searchResults); // Update results with full blog objects
  };
  
  const displayPosts = results.length > 0 ? results : blogs;

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Card className={classes["main-container"]}>
      {isLoading && <p>Loading...</p>}
      <div className={classes.search}>
        <input placeholder="search" value={query} onChange={handleSearch} />
      </div>
      <h2>BlogList</h2>

      <div className={classes.blogs}>
        {/* {blogs.map((blog) => { */}
        {displayPosts.map((blog) => {
          return (
            // <Card key={blog.id} className={classes.blog}>
            <Card key={blog.id} className={classes.blog}>
              <div className={classes.heading}>
                <h2>{blog.title}</h2>
                <p>
                  written by: <span>{blog.author}</span>{" "}
                </p>
              </div>

              {/* <div>{blog.text}</div> */}
              <div>{shortenText(blog.text, 200)}</div>
              <div className={classes.read}>
                <p>
                  <Link to={`/blogs/${blog.id}`}>Read More...</Link>{" "}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default BlogList;









// import React, { useState, useEffect, useRef } from "react";
// import MiniSearch from "minisearch";
// import { Link } from "react-router-dom";
// import classes from "./BlogList.module.scss";
// import Card from "../../ui/card/Card";

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//  // Use a ref to persist the MiniSearch instance
 
//  const miniSearchRef = useRef(
//   new MiniSearch({
//     fields: ["title", "author", "text"], // Fields to search on
//     storeFields: ["title", "author", "text"], // Fields to return
//   })
// );

// const miniSearch = miniSearchRef.current;

// console.log("Indexed Blogs after rendering:", miniSearch.documentCount);

//   const shortenText = (text, n) => {
//     if (text.length > n) {
//       return text.substring(0, n).concat("...");
//     }
//     return text;
//   };

//   const fetchBlogs = async () => {
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/blogs");

//       if (!response.ok) {
//         throw new Error("Failed to fetch blogs");
//       }

//       const data = await response.json();
//       console.log("Fetched Blogs:", data);

//       // Ensure MiniSearch is cleared before adding new documents
//       miniSearch.removeAll();


//       // Prepare data with unique IDs as strings
//       const uniqueBlogs = data.map((blog) => ({
//         title: blog.title,
//         author: blog.author,
//         text: blog.text,
//         id: blog.id.toString(),
//       }));

//       miniSearch.addAll(uniqueBlogs);
    
//       console.log("Indexed Blogs:", miniSearch.documentCount);

//       setBlogs(uniqueBlogs);
//     } catch (error) {
//       console.error("Error fetching blogs:", error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (event) => {
//     const queryValue = event.target.value.trim();
//     setQuery(queryValue);

//     if (queryValue === "") {
//       setResults([]); // Clear results if query is empty
//       return;
//     }

//     console.log("Search query:", queryValue);

//     const searchResults = miniSearch.search(queryValue, { fuzzy: 0.2 });
//     console.log("Search results:", searchResults);

//     // Map the search results to full blog objects
//     const filteredBlogs = searchResults.map((result) =>
//       blogs.find((blog) => blog.id === result.id)
//     );

//     setResults(filteredBlogs);
//   };

//   const displayPosts = results.length > 0 ? results : blogs;

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   return (
//     <Card className={classes["main-container"]}>
//       {isLoading && <p>Loading...</p>}
//       <div className={classes.search}>
//         <input placeholder="Search" value={query} onChange={handleSearch} />
//       </div>
//       <h2>BlogList</h2>

//       <div className={classes.blogs}>
//         {displayPosts.map((blog) => (
//           <Card key={blog.id} className={classes.blog}>
//             <div className={classes.heading}>
//               <h2>{blog.title}</h2>
//               <p>
//                 written by: <span>{blog.author}</span>
//               </p>
//             </div>
//             <div>{shortenText(blog.text, 200)}</div>
//             <div className={classes.read}>
//               <p>
//                 <Link to={`/blogs/${blog.id}`}>Read More...</Link>
//               </p>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </Card>
//   );
// };

// export default BlogList;
