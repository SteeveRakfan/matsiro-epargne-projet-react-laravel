import React from 'react'

export default function AuthTitle1({title}) {
  return (
    <h1 className='text-2xl mt-3 ms-2 p-2 bg-slate-50 dark:bg-slate-900 border-s border-b border-slate-200 dark:border-slate-800 italic text-gray-600 dark:text-gray-300 relative'>{title} <div className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 h-0 w-0 border-t-40 border-t-transparent border-b-40 border-b-transparent border-l-40 border-l-gray-50 dark:border-l-slate-900"></div></h1>
  )
}
