import Link from "next/link";
import { useState } from "react";
const Footer = () => {
  return (
    <div className="bg-[#191919] px-10 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Questions Section */}
          <div>
            <h2 className="text-[#FF0000] text-2xl mb-6 uppercase font-bold">
              Movie Website
            </h2>
            <p className="text-gray-400">
              Bringing the cinema to your home.
              {/* if to{" "}
              <Link href="#" className="underline">
                specify a second
              </Link>{" "}
              post type the same way as above. */}
            </p>
          </div>

          {/* EXPLORE Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">EXPLORE</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">LEGAL</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Cookies Preferences
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Term of Use
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Legal Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">SUPPORT</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Speed Test
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white underline"
                >
                  Contact Us
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
          <p>© 2024 | Online Movie Streaming</p>
          <p>Site created by 3 Members</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
