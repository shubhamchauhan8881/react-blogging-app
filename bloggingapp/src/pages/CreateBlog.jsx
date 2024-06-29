import React,{useEffect, useState, useContext, useRef } from 'react'
import { toast } from 'react-toastify';
import AuthContext from '../utils/AuthProvider'
import Editor from '../components/Editor'
import Quill from 'quill';

import useAxios from '../utils/useAxios';

const Delta = Quill.import('delta');

export default function CreateBlog() {
    const axios = useAxios();

    const {user, setIsLoading} = useContext(AuthContext);
    const [category, setcategory] = useState([]);
    const [readOnly, setReadOnly] = useState(true);
    const [formData, sefFormData] = useState({
        title:"",
        category:'',
        content:"",
        user:user.user_id,
    })
    const [img, setimg] = useState();

    const img_input_ref = useRef();
    const userImage = useRef();
    const quillRef = useRef();
    const form_ref = useRef();
    
    const setImagePath = (e) =>{
        let file = e.target.files[0];

        var reader = new FileReader();
        reader.onloadend = () =>{
            userImage.current.src= reader.result;
        }
        reader.readAsDataURL(file);
        
        setimg(file)
    }

    const UploadBlog = async (e) =>{
        e.preventDefault();
        let data = { ...formData, content:quillRef.current.getSemanticHTML(), image:img}

        if(data.title === "" || data.content === "" || data.category === "NA"){
            toast.error("Kindly fill all fields. (title, content, category)");
            return;
        }
        setIsLoading(true);
        try {
            
            const res = await axios.post('blogs/', data,{headers:{'Content-Type': 'multipart/form-data'}})
            if(res.status === 201){
                toast.success("Blog post successfully");
                e.target.reset();
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false);
        }

    }
    
    // Use a ref to access the quill instance directly
    useEffect(() => {
        (async ()=>{  
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/blogs/category/');
            setcategory(()=>response.data)
          } catch (error) {
            toast.error("An error occurred");
          }
          
        })();
      },[setcategory]);

    
      

  return (
    <>
        <h3 className='font-bold text-2xl text-blue-900'>Post Blog</h3>

        <div className='mt-4 h-full overflow-y-scroll'>
            <form onSubmit={(e)=>UploadBlog(e)}>
                <div className='flex gap-10 items-start justify-start'>
                    <div className='flex flex-col gap-4 items-center'>

                        <div className="avatar">
                            <div className="w-32 rounded-full">
                                <img alt='' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" ref={userImage}/>
                            </div>
                        </div>

                        <div className='text-xs'>
                            <input type='file' accept="image/jpeg, image/png" className='hidden' ref={img_input_ref} onChange={(e)=> setImagePath(e) } />
                        </div>
                        
                        <button type='button' className="btn btn-sm text-emerald-500" onClick={()=> img_input_ref.current.click()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            Upload Image
                        </button>

                    </div>

                    <div className='grow h-full'>

                        <div className='grid gap-4 grid-cols-1 '>

                            <div className='flex flex-col text-sm'>
                                <span>Blog title</span>
                                <input type="text" value={formData.title} onChange={(e)=> sefFormData({...formData, title:e.target.value}) } placeholder="Type here" className="input input-bordered w-full"/>
                            </div>


                            <div className='flex flex-col text-sm'>
                                <span>Category</span>
                                <select defaultValue="NA" className="input input-bordered w-full" onChange={(e)=> sefFormData({...formData, category:e.target.value})}>
                                    <option value="NA">Select</option>
                                    {
                                        category?.map((d,i) => <option value={d.id} key={i}>{d.name}</option> )
                                    }
                                </select>

                            </div>

                            <div className='flex flex-col text-sm'>
                                <span>Content</span>
                                <div>
                                    <Editor
                                        ref={quillRef}
                                        readOnly={readOnly}
                                        defaultValue={new Delta()
                                        .insert('Hello')
                                        .insert('\n', { header: 1 })}
                                    />
                                </div>
                                {/* <textarea type="text" value={formData.content} onChange={(e)=>sefFormData({...formData, content:e.target.value})} placeholder="Type here" className="input input-bordered w-full p-3 h-20"></textarea> */}
                            </div>

                            <div>
                                <button type="submit"  className="btn btn-success btn-wide text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                    Post
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>

        </div>
    </>
  )
}
