import React, {useEffect, useState, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader.jsx'
// import { useLoaderData } from 'react-router-dom';
import useAxios from './utils/useAxios.jsx';
import AuthContext from './utils/AuthProvider.jsx';


function Category({name, id}){
  return (
    <div>
        <button className="btn btn-sm bg-slate-100 font-semibold hover:bg-blue-600 hover:text-white hover:shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
        </svg>
        {name}
        </button>
    </div>

  )
}

function Trending(){
  return (
    <div className='flex items-center justify-start gap-x-2 bg-slate-100 p-2 rounded-md'>
      {/* <div className="badge badge-primary badge-md">0</div> */}
      <span className='bg-blue-900 text-center text-white rounded-full px-2 py-1 font-semibold text-sm'>1 </span>
      <p>Lorem ipsum dolor sit  consecteturlore?</p>
    </div>
  )
}



export default function Layout() {

  const {setIsLoading} = useContext(AuthContext)
  const [category, setcategory] = useState()
  const axios = useAxios()
  useEffect(() => {
    
    (async ()=>{  
      try {
        setIsLoading(()=>true)
        const response = await axios.get('/blogs/category/');
        setcategory(()=>response.data)
      } catch (error) {
        console.log(error)
        toast.error("Layout "+"An error occurred");
      }finally{
        setIsLoading(()=>false)
        
      }
      
    })();

  },[setcategory]);

  return (
    <>
      <Loader />
      <Nav/>
      <div className='relative flex h-screen justify-start gap-x-10'>  
        <div className='ms-24 flex mt-8 gap-4 flex-col grow'>
          <Outlet />
        </div>

        <div className='shrink-0 w-96 mt-8 pe-8'>
          <h3 className='font-bold text-xl text-blue-900'>By Categories</h3>
          <div className='flex flex-wrap gap-2 mt-4' >
            {
              category?.map(c => <Category name={c.name} id={c.id} key={c.id} />)
            }

          </div>

          <h3 className='font-bold text-xl mt-8 text-blue-900'>Trending</h3>
          <div className='mt-4 flex flex-col justify-center gap-y-2'>
            <Trending />
            <Trending />
            <Trending />
          </div>

          

        </div>

      </div>
      
      	<ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </>
  )
}
