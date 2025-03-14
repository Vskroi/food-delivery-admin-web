import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, SettingsIcon, TruckIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface NavigationProps {
  setMenuSelected: (menu: string) => void; 
}

export const Navigation = ({ setMenuSelected }: NavigationProps) => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string >("FoodMenu"); 
  const router = useRouter();

  const setSelectedMenu = (menu: string) => {
    const params = new URLSearchParams(searchParams.toString());
   
    setSelected(menu); 
    params.set("Menu", menu); 
    router.push(`?${params.toString()}`); 
    setMenuSelected(menu); 
  };

  return (
    <div className="w-[205px] h-[1024px] px-5 py-9 bg-white flex-col justify-start items-start gap-10 inline-flex overflow-hidden">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <img src="../Navigation/Screenshot.svg" />
        <div className="h-11 flex-col justify-center items-start inline-flex">
          <div className="text-zinc-950 text-lg font-semibold leading-7">
            NomNom
          </div>
          <div className="self-stretch text-zinc-500 text-xs font-normal leading-none">
            Swift delivery
          </div>
        </div>
      </div>
      <div className="h-[168px] flex-col justify-start items-center gap-6 inline-flex">
        <div>
          <Button
            className={`h-10 w-[165px] px-6 py-2 rounded-full justify-start items-center gap-2.5 inline-flex ${selected === "FoodMenu" ? "bg-black text-white" : ""}`}
            onClick={() => setSelectedMenu("FoodMenu")}
          >
            <LayoutDashboardIcon />
            <p className=" text-sm font-medium leading-tight">
              Food menu
            </p>
          </Button>
        </div>
        <div>
          <Button
            className={`h-10 w-[165px] px-6 py-2 rounded-full justify-start items-center gap-2.5 inline-flex ${selected === "Orders" ? "bg-black text-white" : ""}`}
            onClick={() => setSelectedMenu("Orders")}
          >
            <TruckIcon />
            <p className=" text-sm font-medium leading-tight">
              Orders
            </p>
          </Button>
        </div>
        <div>
          <Button
            className={`h-10 w-[165px] px-6 py-2 rounded-full justify-start items-center gap-2.5 inline-flex ${selected === "Settings" ? "bg-black text-white" : ""}`}
            onClick={() => setSelectedMenu("Settings")}
          >
            <SettingsIcon />
            <p className=" text-sm font-medium leading-tight">
              Settings
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};
