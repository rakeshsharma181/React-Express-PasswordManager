import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <nav className='bg-slate-800  text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-20">
    
            <div className="logo font-bold text-white text-2xl">
               <Link to = '/'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </Link>
            </div>
            <ul >
                <li className='flex gap-4'>
                    <Link to = '/home' className='hover:font-bold'>Home</Link>
                    <Link to = '/about' className='hover:font-bold'>About</Link>
                </li>
               
            </ul>
            </div>
        </nav>
      
    </div>
  )
}

export default Navbar
