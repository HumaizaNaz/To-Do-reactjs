import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-blue-900 text-white py-4 shadow-lg px-6'>
      <div className="logo">
        <span className='font-bold text-2xl'>TODO-App</span>
      </div>
      <ul className="flex gap-8">
        <li className='cursor-pointer hover:text-blue-300 transition-all duration-200'>Home</li>
        <li className='cursor-pointer hover:text-blue-300 transition-all duration-200'>Your Tasks</li>
      </ul>
    </nav>
  );
}

export default Navbar;
