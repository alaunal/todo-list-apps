import React from 'react';
import { FaGithub } from 'react-icons/fa';
import 'twin.macro';

function Footer() {
  return (
    <div tw="w-full flex px-4 h-20 items-center justify-between text-white">
      <div tw="">
        Copyright <strong tw="font-medium text-gray-100">AKCODE</strong> 2021
      </div>
      <a
        href="https://github.com/alaunal/todo-list-apps"
        target="_blank"
        rel="noreferrer"
        tw="flex items-center hover:text-purple-100"
      >
        <FaGithub tw="mr-2" /> Github
      </a>
    </div>
  );
}

export default Footer;
