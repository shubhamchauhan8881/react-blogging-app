import React, {useEffect, useContext, useState} from 'react'
import AuthContext from '../utils/AuthProvider'
import { toast } from 'react-toastify'
import useAxios from '../utils/useAxios'
import Notification from '../components/Notification'

 

export default function Notifications() {

	const [n, setn] = useState([])
	const {setIsLoading} = useContext(AuthContext)

	const axios = useAxios()

	useEffect(() =>{
		
		(async () =>{
			setIsLoading(()=>true)
			try{
				const result = await axios.get("/user/notifications/")
				if(result.status === 200){
					setn(() => result.data)
				}else{
					console.log()
				}
			}catch(e){
				toast.error(e.message)
			}finally{
				setIsLoading(()=>false)
			}
		})()

	},[])

	if(!n){
		return <p>No notifications..</p>
	}

  return (
    <div className='h-full overflow-y-scroll'>
        <h3 className='font-bold text-2xl text-blue-900'>Notifications</h3>

        <div className='mt-4 flex flex-col gap-2 '>
            
			{ 
				n.map((n,i) => <Notification title={n.message} key={i} /> )
			}
           
        </div>

    </div>
  )
}
