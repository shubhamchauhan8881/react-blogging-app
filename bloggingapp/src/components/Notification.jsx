export default function Notification({title}) {
  return (
    <div className='p-4 font-semibold  bg-slate-100 rounded-md hover:bg-blue-500 hover:text-white flex items-strech justify-between'>
        <p>{title}</p>
        <button className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

        </button>
    </div>
  )
}
