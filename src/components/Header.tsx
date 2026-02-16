import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-primary-600 text-2xl font-bold">
                Lobe UI
              </span>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link
                href="/"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Projects
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-sm font-medium text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
