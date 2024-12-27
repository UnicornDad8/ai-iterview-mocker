"use client";

import { useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);
 
  return (
    <div className="flex items-center justify-between p-4 shadow-sm bg-secondary">
      <Image src={"/logo.svg"} alt="logo" width={160} height={100} />
      <ul className="hidden gap-6 cursor-pointer md:flex">
        <li className={`transition-all hover:text-primary hover:font-bold ${path === "/dashboard" && "text-primary font-bold"}`}>Dashboard</li>
        <li className={`transition-all hover:text-primary hover:font-bold ${path === "/questions" && "text-primary font-bold"}`}>Questions</li>
        <li className={`transition-all hover:text-primary hover:font-bold ${path === "/upgrade" && "text-primary font-bold"}`}>Upgrade</li>
        <li className={`transition-all hover:text-primary hover:font-bold ${path === "/how" && "text-primary font-bold"}`}>How it works?</li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header;