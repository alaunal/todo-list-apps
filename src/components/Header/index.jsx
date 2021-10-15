import React from 'react';
import { FaPlus, FaBriefcase } from 'react-icons/fa';
import 'twin.macro';

function Header({ onHandlePopupForm }) {
  return (
    <div tw="w-full flex px-4 h-24 items-center">
      <div tw="pr-2">
        <div tw="flex bg-purple-800 items-center justify-center h-12 w-12 rounded-full">
          <span tw="text-gray-50 font-light font-body text-lg inline-block">
            <FaBriefcase />
          </span>
        </div>
      </div>
      <div>
        <p tw="text-base text-white font-body font-light">
          The<span tw="font-medium text-xl">Gawe</span>
        </p>
        <p tw="text-gray-50 font-light font-body text-sm">Task Management apps</p>
      </div>
      <div tw="flex-1 text-right pl-2">
        <button
          tw="inline-flex bg-gray-700 hover:bg-gray-800 rounded-full py-1 px-4 md:py-2 md:px-5 text-white text-sm md:text-base items-center font-medium"
          onClick={() => onHandlePopupForm()}
        >
          <FaPlus tw="mr-1 inline-block text-xs md:text-sm" /> Task
        </button>
      </div>
    </div>
  );
}

export default Header;
