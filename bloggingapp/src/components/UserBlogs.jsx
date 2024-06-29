import React, { useEffect, useRef } from 'react'

export default function UserBlogs({ data}) {

  const p_Ref = useRef()

  useEffect(()=>{
    p_Ref.current.innerHTML = data.content
  },[p_Ref, data])

  return (
      <div className="collapse collapse-arrow bg-slate-100">
          <input type="radio" name="my-accordion-2" /> 
          <div className="collapse-title font-bold text-xl text-blue-900">
              {data.title}
          </div>
          <div className="collapse-content">
              
              <p ref={p_Ref}></p>

              <button className="btn btn-sm btn-error mt-8">Delete</button>
          </div>
      </div>
  )
}
