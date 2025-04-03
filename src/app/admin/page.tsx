"use client";

import { Container } from "@/components/container";
import { Navigation } from "@/components/Navigation/Navigation";
import { useUserData } from "@/providers/authentionProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminPage = () => {
  const [selected, setMenuSelected] = useState<AdminPageState>("FoodMenu");
  const user = useUserData();
  const router = useRouter();
  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  console.log(user);
  
  return (
    <div className="flex relative bg-[#f4f4f5]">
      <Navigation setMenuSelected={setMenuSelected} />
      
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute z-10 top-0 right-0 mt-4 mr-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <User />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.data.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-center"
            onClick={signOut}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

     
      <Container selected={selected} />
    </div>
  );
};

export default AdminPage;
