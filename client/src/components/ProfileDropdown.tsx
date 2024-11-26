import { signOut, useSession } from "next-auth/react";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileDropdown = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    localStorage.clear();
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {session?.user?.image ? (
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white hover:border-gray-200 transition-colors">
            <Image
              src={session.user.image}
              alt="Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
            <User className="h-5 w-5 " />
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium ">{session?.user?.name}</p>
            <p className="text-xs ">{session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile" className="w-full  hover:text-gray-800">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings" className="w-full  hover:text-gray-800">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 hover:text-red-600 cursor-pointer"
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
