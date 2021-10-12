import React from 'react';
import dayjs from 'dayjs';
import { FaPlus } from 'react-icons/fa';
import 'twin.macro';

function Header() {
  const dateNow = dayjs().format('DD MMMM YYYY');

  return (
    <div tw="w-full flex px-4 h-24 items-center">
      <div tw="pr-4">
        <div tw="flex bg-purple-800 items-center justify-center h-12 w-12 rounded-full">
          <span tw="text-gray-50 font-light font-body text-lg inline-block">AK</span>
        </div>
      </div>
      <div>
        <p tw="text-lg text-white font-body font-light">
          Hi, <span tw="font-medium">A.kauniyyah</span>
        </p>
        <p tw="text-gray-50 font-light font-body text-sm">{dateNow}</p>
      </div>
      <div tw="flex-1 text-right pl-3">
        <button tw="btn btn-sm">
          <FaPlus tw="mr-2 inline-block" /> Task
        </button>
      </div>
    </div>
  );
}

export default Header;
