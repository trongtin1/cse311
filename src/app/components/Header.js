import { FaSearch } from "react-icons/fa"; // Import biểu tượng tìm kiếm

const Header = () => {
  return (
    <div className="bg-black overflow-hidden flex items-center justify-center relative">
      {/* Liên kết ở giữa */}
      <div className="flex justify-center gap-4">
        <a
          href="#"
          className="text-white text-center py-4 px-6 text-base hover:bg-gray-300 hover:text-black"
        >
          Home
        </a>
        <a
          href="#"
          className="text-white text-center py-4 px-6 text-base hover:bg-gray-300 hover:text-black"
        >
          Director
        </a>
        <a
          href="#"
          className="text-white text-center py-4 px-6 text-base hover:bg-gray-300 hover:text-black"
        >
          Gallery
        </a>
        <a
          href="#"
          className="text-white text-center py-4 px-6 text-base hover:bg-gray-300 hover:text-black"
        >
          Pages
        </a>
        <a
          href="#"
          className="text-white text-center py-4 px-6 text-base hover:bg-gray-300 hover:text-black"
        >
          Blogs
        </a>
        <a
          href="#"
          className="text-white text-center py-4 px-6 text-base hover:bg-gray-300 hover:text-black"
        >
          Contact
        </a>
      </div>

      <div className="absolute right-4 flex items-center gap-4">
        <a
          href="#"
          className="flex items-center gap-2 py-2 px-4 text-white bg-gray-700 hover:bg-gray-600 rounded"
        >
          <FaSearch />
        </a>
        <button className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-500 rounded">
          More Videos
        </button>
      </div>
    </div>
  );
};

export default Header;
