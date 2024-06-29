
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../utils/AuthProvider'
import Blog from './Blog'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function LatestArticle({filter}) {
  const { setIsLoading} = useContext(AuthContext)
  // const axios = useAxios()
  const [blogs, setblogs] = useState([])


  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(()=>true)
      var url;
      try {
        if(filter==="most-liked"){
          url="http://127.0.0.1:8000/api/v1/blogs/filter/most-liked/";
        }else{
          url = "http://127.0.0.1:8000/api/v1/blogs/" 
        }
        let data = await axios.get(url)
        setblogs(data.data);
      } catch (error) {
          toast.error("Home" + error.message)
      }finally {
        setIsLoading(()=>false);
      } 
    }
    fetchBlogs();
    
  },[setIsLoading, filter]); //
  
  return (
    <>
      {
        blogs?.map( (b, i) => <Blog data={b} key={i} /> )
      }
    </>
  )
}
