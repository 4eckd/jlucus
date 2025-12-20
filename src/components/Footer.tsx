import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Lobe UI</h3>
            <p className="text-gray-300">
              A modern UI framework for building beautiful and responsive web applications.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">About</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Features</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              Email: info@lobeui.com<br />
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Lobe UI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
