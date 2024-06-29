import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SearchBar() {
  // const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className=''>
        <div className="input max-w-sm input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </div>

        <div className='mt-5'>
            <ul className='flex gap-x-3 items-center'>
                <NavLink to ='/' className = {({isActive})=> {return isActive ?"font-bold text-xl text-blue-900":""} }>
                  <li className=''>Latest Article</li>
                </NavLink>
                <NavLink to ='/most-liked' className = {({isActive})=> {return isActive ?"font-bold text-xl text-blue-900":""} }>
                  <li >Most Likes</li>
                </NavLink>
                <NavLink to ='/favorites' className = {({isActive})=> {return isActive ?"font-bold text-xl text-blue-900":""} }>
                  <li>Favorites</li>
                </NavLink>
            </ul>
        </div>
    </div>
  )
}
