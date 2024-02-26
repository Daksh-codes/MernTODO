import React from 'react'

function Navbar() {
  return (
    <nav className='flex bg-blue-400 items-center justify-between px-20 py-4 '>
        <h1 className='text-xl font-bold'>TO DO APP</h1>
        <div className=' flex gap-8'>
            <h1>LOGIN</h1>
            <h1>SIGNUP</h1>
        </div>

    </nav>
  )
}

export default Navbar