import React from 'react'
import { useContext } from 'react'
import AuthContext from '../utils/AuthProvider'

export default function Loader() {
    const {isLoading, LoadingStatus} = useContext(AuthContext)
  	return (
		<> 
			{
				isLoading && (
					<div className='absolute top-0 left-0 right-0 bottom-0 duration-1000 z-[999999999999] flex flex-col gap-y-4 items-center justify-center bg-base-300/30 backdrop-blur-sm'>
						<span className="loading loading-ring loading-lg"></span>
						<p>{LoadingStatus}</p>
					</div>
				)
			}
		</>
  )
}
