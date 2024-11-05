import Image from "next/image";
import Link from "next/link";
import GenreDropDown from "./Dropdown";
import SearchInput from "./SearchInput";
import GenreNavigate from "./NavigationContainer";
import UserProfile from "./UserProfile";
import Login from "./Login";
const Header = () => {
  return (
    <div className="flex items-center p-5 bg-[#12121280] sticky z-50 top-0 w-full">
      {/* Logo */}

      {/* Others */}
      <div className="text-white flex items-center space-x-7 ml-auto">
        <div className="mr-44">
          <GenreNavigate />
        </div>

        <UserProfile />
        <GenreDropDown />
        <SearchInput />
        <Login />
        {/* Search */}
      </div>
    </div>
  );
};

export default Header;
