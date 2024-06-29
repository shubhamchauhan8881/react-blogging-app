
import SearchBar from '../components/SearchBar'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <SearchBar/>
      <div className='flex flex-col gap-y-4 overflow-y-scroll h-full pb-4 no-scrollbar'>
        <Outlet />
      </div>
    </>
   
  )
}
