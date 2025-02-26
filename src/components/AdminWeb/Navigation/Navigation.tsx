import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, SettingsIcon, TruckIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export const Navigation = () => {
  const searchParams = useSearchParams();
  const [selected, setselected] = useState<string[]>([]);
  const { menuNAme } = useParams<{ menuNAme: string }>();
  const router = useRouter();
  const setSelectedMenu = (menu: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const allMenu = [...menu];
    if (allMenu.includes(menu)) {
      const filteredMenu = allMenu.filter((menuNAme) => menuNAme !== menu);
      allMenu.length = 0;
      allMenu.push(...filteredMenu);
    } else {
      allMenu.push(menu);
    }
    params.set("Menu", allMenu.join(","));
    router.push(`?${params.toString()}`);
    setselected(allMenu);
  };

  return (
    <div className="w-[205px] h-[1024px] px-5 py-9 bg-white flex-col justify-start items-start gap-10 inline-flex overflow-hidden">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <img src="../Navigation/Screenshot.svg" />
        <div className="h-11 flex-col justify-center items-start inline-flex">
          <div className="text-zinc-950 text-lg font-semibold  leading-7 ">
            NomNom
          </div>
          <div className="self-stretch text-zinc-500 text-xs font-normal  leading-none">
            Swift delivery
          </div>
        </div>
      </div>
      <div className="h-[168px] flex-col justify-start items-center gap-6 inline-flex">
        <div>
          <Button
            className="h-10 w-[165px] px-6 py-2 rounded-full justify-start items-center gap-2.5 inline-flex"
            onClick={() => setSelectedMenu("FoodMenu")}
          >
            <LayoutDashboardIcon />
            <p className="text-zinc-950 text-sm font-medium leading-tight">
              Food menu
            </p>
          </Button>
        </div>
        <div>
          <Button
            className="h-10 w-[165px] px-6 py-2 rounded-full justify-start items-center gap-2.5 inline-flex"
            onClick={() => setSelectedMenu("Orders")}
          >
            <TruckIcon />
            <p className="text-zinc-950 text-sm font-medium leading-tight">
              Orders
            </p>
          </Button>
        </div>
        <div>
          <Button
            className="h-10 w-[165px] px-6 py-2 rounded-full justify-start items-center gap-2.5 inline-flex"
            onClick={() => setSelectedMenu("Settings")}
          >
            <SettingsIcon />
            <p className="text-zinc-950 text-sm font-medium leading-tight">
              Settings
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};
