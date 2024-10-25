import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const GenreNavigate = async () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Item Home */}
        <NavigationMenuItem>
          <Link href="/" passHref>
            <NavigationMenuLink className="cursor-pointer">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Item 2 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Thể loại 2</NavigationMenuTrigger>
        </NavigationMenuItem>

        {/* Item 3 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Thể loại 3</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* Indicator và viewport */}
      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

export default GenreNavigate;
