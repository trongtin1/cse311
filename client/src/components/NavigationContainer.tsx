"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useTranslation } from "react-i18next";

const GenreNavigate = () => {
  const { t } = useTranslation(['home']);
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center space-x-8">
        {[
             { title: t("home.movies_title"), href: "/homepage" },
             { title: t("home.tv_shows_title"), href: "/tv-shows" },
             { title: t("home.audiobook_title"), href: "" },
             { title: t("home.blog_title"), href: "" },
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
