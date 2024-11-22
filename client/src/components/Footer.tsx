import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#191919] px-10 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Questions Section */}
          <div>
            <h2 className="text-white text-2xl mb-4">
              Questions? Call 0850-380-6444
            </h2>
            <p className="text-gray-400">
              Format for custom post types that are not book or you can use else
              if to{" "}
              <Link href="#" className="underline">
                specify a second
              </Link>{" "}
              post type the same way as above.
            </p>
          </div>

          {/* DIGIFLEX Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">Digiflex</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Digiflex
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Devices
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* POLICIES Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">Policies</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Legal Notices
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mt-16">
          <select className="bg-transparent text-gray-400 border border-gray-700 rounded px-4 py-2">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
          <p>© 2024 © 2021 Digiflex | Online Movie Streaming</p>
          <p>Site created by Themezinho</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
