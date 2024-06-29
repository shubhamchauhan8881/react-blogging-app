import React, {useContext, useEffect, useRef, useState} from 'react'
import AuthContext from '../utils/AuthProvider'
import { toast } from 'react-toastify'
import useAxios from '../utils/useAxios'

export default function LikeButton({id, count}) {
    const {user } = useContext(AuthContext)

    const blogidRef = useRef(id)
    const btn_ref = useRef()

    const [likesCount, setLikesCount] = useState(count)
    const [isLiked, setIsLiked] = useState(false)

    const axios = useAxios()

    useEffect(() => {
        
        // check if usr has already liked
        const f = async ()=>{
            try{
                const r = await axios.get(`/user/liked/${blogidRef.current}/`)
                if(r.status === 200) if(r.data.ok) setIsLiked(true);
            }catch(e) {console.log(e);}    
        };
        if(user !=null) f();

        const handleClick =  async () => {

            if(user === null){
                toast.error("You must be logged in to perform this action.")
                return;
            }

            if(!isLiked){
                try {
                    const res = await axios.post(`/user/liked/${blogidRef.current}/`)
                    console.log(res)
                    if(res.status === 200){
                        toast.info("Added to your favorites")
                        setIsLiked(()=>true)
                        setLikesCount(()=> res.data.likes_count)
                    }else{toast.error(res.error)}
                } catch (error) {
                    toast.error(error.message)
                }
                
            }else{
                // post is already liked make it disliked....
                try{
                    const res = await axios.delete(`/user/liked/${blogidRef.current}/`)
                    if(res.status === 200){
                        setLikesCount(()=> res.data.likes_count)
                        setIsLiked(()=> false)
                    }
                }catch (error) {console.log(error)}
            }
        }
        
        btn_ref.current.addEventListener('click', handleClick);
        let a = btn_ref.current;
        
        return () => {
            a.removeEventListener('click', handleClick)
        }

    },[setIsLiked, isLiked, user, axios, setLikesCount, likesCount])
    
  return (
    <>  
    <button className='flex items-center justify-start' ref={btn_ref}>
        <svg role='button' xmlns="http://www.w3.org/2000/svg" fill={ isLiked ? "currentColor":"none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <span className='text-xs'>{likesCount}</span>
    </button>

    </>
  )
}
