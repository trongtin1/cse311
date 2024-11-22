"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const GenreNavigate = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center space-x-8">
        {[
          { title: "HOME", href: "/homepage" },
          { title: "MOVIES", href: "/homepage" },
          { title: "TV SHOWS", href: "/tv-shows" },
          { title: "AUDIOBOOKS", href: "" },
          { title: "BLOG", href: "" },
        ].map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className="text-white hover:text-gray-300 text-sm font-medium tracking-wide">
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default GenreNavigate;
