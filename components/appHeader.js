import { Fragment } from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header className="fixed z-10 top-0 left-0 right-0 flex justify-center bg-white">
      <div className="app-width h-16 flex-1 flex justify-between border-b border-musta md:px-10">
        <Link href="/">
          <a className="flex-1 flex justify-between hover:text-flow-yellow transition-all">
            <h1 className="md:text-5xl font-title font-bold">WOLF FESTIVAL</h1>
            <h1 className="md:text-5xl font-title font-bold">HELSINKI</h1>
            <h1 className="md:text-5xl font-title font-bold">12.-14.8.2022</h1>
          </a>
        </Link>
      </div>
    </header>
  );
}

export default Header;
