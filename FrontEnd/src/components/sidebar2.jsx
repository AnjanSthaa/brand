import { useState } from "react";


const Sidebar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col fixed top-0 left-0 h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 w-64 md:w-80`}
      >
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <h2 className="text-lg font-bold">My Sidebar</h2>
          <button
            className="text-gray-400 hover:text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ✖
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <a
            href="#"
            className="block py-2 px-4 rounded-md hover:bg-gray-700 transition"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2 px-4 rounded-md hover:bg-gray-700 transition"
          >
            Profile
          </a>
          <a
            href="#"
            className="block py-2 px-4 rounded-md hover:bg-gray-700 transition"
          >
            Settings
          </a>
          <a
            href="#"
            className="block py-2 px-4 rounded-md hover:bg-gray-700 transition"
          >
            Logout
          </a>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-grow bg-gray-100 p-6 ml-64 md:ml-80">
        <button
          className="text-gray-600 bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰ Open Sidebar
        </button>
        <div>
          <h1 className="text-2xl font-bold mb-4">Fixed Sidebar</h1>
          <p>
            This is the main content area. The sidebar is now fixed to the left
            side of the screen.
          </p>
        </div>
      </div>
    </div>
  );
};




export default Sidebar2;
