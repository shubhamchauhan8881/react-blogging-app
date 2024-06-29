
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../utils/AuthProvider'
import Blog from './Blog'
import useAxios from '../utils/useAxios'
import { toast } from 'react-toastify'

export default function UserFavorites() {
    const { setIsLoading} = useContext(AuthContext)
    // const axios = useAxios()
    const [blogs, setblogs] = useState([])
    
    const axios = useAxios()
  
    useEffect(() => {
      const fetchBlogs = async () => {
        setIsLoading(()=>true)
        try {
          let data = await axios.get('/user/favorites/')
          setblogs(data.data.blogs);
        } catch (error) {
            toast.error("favorites: " + error.message)
        }finally {
          setIsLoading(()=>false);
        } 
      }
      fetchBlogs();
      
    },[setIsLoading]); //

    return(
        <>
            {
                blogs?.map( (b, i) => <Blog data={b} key={i} /> )
            }
        </>
    )
}
