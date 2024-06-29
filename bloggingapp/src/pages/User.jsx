import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import AuthContext from '../utils/AuthProvider'
import useAxios from '../utils/useAxios'
import Blog from '../components/Blog'
import UserBlogs from '../components/UserBlogs'

export default function User() {

  const {user, logoutUser} = useContext(AuthContext)
  
  const [userData, setUserData] = useState({...user});
  const [userBlogs, setUserBlogs] = useState([]);

  const axios =  useAxios()

  useEffect(()=>{

    const fetchData = async () => {
        const data = await axios.get( `/blogs/user/`)
        setUserBlogs(()=>data.data.data);
    }

    fetchData();

  },[])

  return (
    <>  

        <h3 className='font-bold text-2xl text-blue-900'>Howdy, {user.fname}</h3>

        <div className='mt-4 h-full overflow-y-scroll'>
         
                
			<div>

				<div className='flex gap-10 items-start justify-start'>
				<div className='flex flex-col gap-4 items-center'>

					<div className="avatar">
					<div className="w-32 rounded-full">
						<img alt='' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
					</div>
					</div>

					<div className='text-xs'>
					<span>6</span> followers
					<span> | </span>
					<span> 9</span> following
					</div>

					<div className="">
					<button className="btn text-rose-500" onClick={()=>logoutUser()}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
					</svg>
						Logout
					</button>
					</div>

				</div>

				<div className='grow'>
					<h3 className='font-bold text-xl text-blue-900 border-b-2'>Information</h3>
					
					<div className='grid grid-cols-2 gap-4 mt-8 place-content-between	'>

					<div className='flex flex-col text-sm'>
						<span>First Name</span>
						<input type="text" value={userData.fname} onChange={(e)=> setUserData({...userData, fname:e.target.value})} placeholder="Type here" className="input input-bordered w-full"/>
					</div>

					<div className='flex flex-col text-sm'>
						<span>Last Name</span>
						<input value={userData.lname} onChange={(e)=> setUserData({...userData, lname:e.target.value})} type="text" placeholder="Type here" className="input input-bordered w-full"/>
					</div>

					<div className='flex flex-col text-sm'>
						<span>Email</span>
						<input value={userData.email} onChange={(e)=> setUserData({...userData, email:e.target.value})} type="text" placeholder="Type here" className="input input-bordered w-full"/>
					</div>

					<div className='flex flex-col text-sm'>
						<span>Phone</span>
						<input type="text" placeholder="Type here" className="input input-bordered w-full"/>
					</div>

					<div className='flex flex-col text-sm col-span-2'>
						<span>About</span>
						<textarea type="text" placeholder="Type here" className="input input-bordered w-full p-3 h-20"></textarea>
					</div>

					<div>
						<button type="button" className="btn btn-accent text-white">
						{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg> */}

						Update Account</button>
					</div>
					</div>

				</div>
				</div>

			</div>

			<h3 className='font-bold text-2xl text-blue-900 mt-10 mb-8'>{user.fname}'s Blogs</h3>
			<div className='flex flex-col gap-4'>
				{
					userBlogs?.map((blogs, i)=>  <UserBlogs data={blogs} key={i}/> )
				}
			</div>

        </div>

    </>
  )
}
