"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {  Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

export const FoodMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState({
    hide: false,
  });
  console.log(addCategory)

  const category = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      const data = response.data.data;
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  const AddNewCategory = async () => {
    try {
        await fetch("http://localhost:4000/categories" ,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({cateryName: addCategory.cateryName}),
              }
            );
        
      
      
      } catch (error) {
        console.log(error);
      }
    
  }
  const toggleAddCategory = () => {
    setAddCategory((prevState) => ({
      ...prevState,
      hide: !prevState.hide,
    }));
  };
  
  const onCagegoryChange = (e: event) => {
    setAddCategory((prev) => ({ ...prev, cateryName: e.target.value }));
  };
  useEffect(() => {
    category();
  }, []);

  return (
    <>
      <div className="p-6 bg-white rounded-xl justify-start items-start gap-4 overflow-hidden">
        <div className="justify-center items-center gap-2.5">
          <h4 className="justify-start text-xl font-semibold ">
            Dishes category
          </h4>

          <div className="flex flex-wrap w-800px">
            <div
              data-size="Default"
              data-state="Default"
              data-style="Default"
              data-variant="Outline"
              className="h-9 w-fit px-4 py-2 bg-background-bg-background rounded-full outline outline-1 outline-offset-[-1px] outline-Tailwind-red---Text-color-500 flex justify-start items-center gap-2"
            >
              <p>All Dishes</p>
            </div>
            {categories.map((category, index) => (
              <>
                <div
                  key={`category${index}`}
                  className=" inline-flex justify-start items-center gap-3 flex-wrap content-center overflow-hidden"
                >
                  <div
                    data-size="Default"
                    data-state="Default"
                    data-style="Default"
                    data-variant="Outline"
                    className="h-9 px-4 py-2 bg-background-bg-background rounded-full outline outline-1 outline-offset-[-1px] outline-Tailwind-red---Text-color-500 flex justify-start items-center gap-2"
                  >
                    <p>{category.cateryName}</p>
                  </div>
                </div>
              </>
            ))}
            <div
              onClick={toggleAddCategory}
              className="flex justify-center items-center w-[36px] h-[36px] bg-[#ef4444] rounded-full"
            >
              <Plus />
            </div>
            {addCategory.hide ? (
              <div className="w-[460px] bg-white rounded-md">
                <div className="flex">
                  <p className=" justify-start text-lg font-semibold ">
                    Add new category
                  </p>
                  <button  onClick={toggleAddCategory}
                   className="w-7 h-7 px-2 py-2 bg-zinc-100 rounded-full inline-flex justify-center items-center gap-2">
                    <X></X>
                  </button>
                </div>
                <div>
                  <p className="text-sm">Category name</p>

                  <Input
                    onChange={onCagegoryChange}
                    type="text"
                    placeholder="tyoe category name..."
                    className="w-60"
                  ></Input>
                </div>
                <Button
                  onClick={AddNewCategory}
                  className="justify-start h-[35px] w-[120px] rounded-sm bg-black text-sm font-medium text-white"
                >
                  Add category
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
