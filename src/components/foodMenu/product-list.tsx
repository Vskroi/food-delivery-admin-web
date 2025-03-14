import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
export const ProductList = () => {
  const [cateryName, setcateryName] = useState<string | null>("All Dishes");
  const searchParams = useSearchParams();
  const [AddNewDish, setAddNewDish] = useState<dish>({
    hide: false,
  });

  useEffect(() => {
    const selectedCategory = searchParams.get("cateryName");
    setcateryName(selectedCategory);
  }, [searchParams]);

  const toggleAddNewDish = () => {
    setAddNewDish((prev) => ({
      ...prev,
      hide: !prev.hide,
    }));
  };

  return (
    <>
      <div className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12">
        <p>{cateryName} ()</p>
        <div
          className=" w-[270.75px] h-[241px] px-4 py-2 border-[1px] border-dashed border-red-600  rounded-[20px] inline-flex flex-col justify-center items-center gap-6 overflow-hidden"
          onClick={toggleAddNewDish}
        >
          <div className="flex justify-center items-center w-[36px] h-[36px] bg-[#ef4444] rounded-full">
            <Plus stroke="white" />
          </div>

          <div className="w-40 text-center justify-start text-text-text-secondary-foreground text-sm font-medium leading-tight">
            Add new Dish to Salads{" "}
          </div>
        </div>
      </div>
      {AddNewDish.hide ? (
        <div className="w-[460px] p-4 h-[592px] rounded-xl border-[1px] border-grey-100 bg-white relative z-10 top-[-200px] left-[400px]">
          <div className="flex w-full justify-between">
            <p>Add new dish to Appetizers</p>{" "}
            <button
              onClick={toggleAddNewDish}
              className="w-7 h-7 px-2 py-2 bg-zinc-100 rounded-full inline-flex justify-center items-center gap-2"
            >
              <X></X>
            </button>
            <div className="flex">
              <p>Food Name</p>
              <Input placeholder="Type food name"></Input>
              <p>Food price</p>
              <Input placeholder="Type price..."></Input>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
