import React, {useEffect, useRef, useState} from 'react'
import LikeButton from './LikeButton'
export default function Blog({data}) {
    const [blogData, setBlogdata] = useState(data)
    const para = useRef();
    const [clampLine, setClampLine] = useState(true)
    useEffect(()=>{
        para.current.innerHTML = blogData.content;
    },  [blogData])

  return (
    <div className='flex items-stretch rounded-s-xl bg-slate-100 shadow-sm me-2 p-5'>
        
        <div className="h-full shrink-0 w-52 rounded-s-xl overflow-hidden">
            <img alt='blog' className='h-full w-full object-cover' src={ blogData.image ? blogData.image :"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
        </div>

        <div className='grow flex flex-col gap-y-2 p-5'>
            <div>
                <h3 className='text-xl font-bold text-blue-900'>{blogData.title}</h3>
            </div>
            <div className='grow'>
                <p className={clampLine ?'text-sm break-words line-clamp-4':'text-sm break-words' } ref={para}></p>
            </div>
            <div className='flex justify-between items-center text-blue-900'>
                <button onClick={()=>{ setClampLine(()=>!clampLine);}} to="">{clampLine ? "Read more...":"Read less..."}</button>
                <div className='flex items-center gap-2'>

                    <LikeButton id={blogData.id} count={blogData.likes_count} />

                    <button className='flex items-center justify-start'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className='text-xs'>10</span>
                    </button>

                    <div  className='flex items-center justify-start'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                        <span className='text-xs'>100</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
