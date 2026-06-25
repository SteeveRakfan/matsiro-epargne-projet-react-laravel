import React from 'react'

export default function AuthTitle2({className, title}) {
  return (
    <h2 className={`mb-5 text-2xl text-gray-800 dark:text-gray-300 border-dashed border-b ${className}`}>{title}</h2>
  )
}
