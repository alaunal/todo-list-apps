import React from 'react';
import { FaGithub } from "react-icons/fa";
import 'twin.macro';

function Footer() {
  return (
    <div tw="w-full flex px-4 h-20 items-center justify-between text-white">
      <div tw="text-sm">
        Copyright <strong tw="font-medium">AKCODE 2021</strong>
      </div>
      <div tw="text-sm flex items-center">
        <FaGithub tw="mr-2" /> Github
      </div>
    </div>
  );
}

export default Footer;
