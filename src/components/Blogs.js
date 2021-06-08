import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInput, setBlogData } from '../features/UserSlice'
import '../styling/blogs.css';

const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const url = `https://gnews.io/api/v4/search?q=${searchInput}&token=af88b5cdfc6ee4b43a16885ce839dcc5`;
    const dispatch = useDispatch();

    const [blogs,setBlogs] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        axios
            .get(url)
            .then((response)=>{
                dispatch(setBlogData(response.data));
                setBlogs(response.data);
                setLoading(false);
            })
            .catch((err)=>{
                console.log("error - ",err);
            })
    },[searchInput]);

    return (
        <>
            <div className="blog__page">
                <h1 className="blog__page__header">Blogs</h1>
                {loading ? <h1 className="loading">Loading..</h1> : ""}
                <div className="blogs">
                    {blogs?.articles?.map((blog)=>(
                        <a href={blog.url} target='_blank' className="blog">
                            <img src={blog.image} alt={blog.title} />
                            <div>
                                <h3 className="sourceName">
                                    <span>{blog.source.name}</span>
                                    <p>{blog.publishedAt}</p>
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        </a>
                    ))}
                    {blogs?.totalArticles == 0 && (
                        <h1 className="no__blogs">
                            No Blogs Available for your Searched Input,Please Try Again with some Valid Input.
                        </h1>
                    )}
                </div>
            </div>
        </>
    )
}

export default Blogs
