"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export const DishesCategory = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState<Category>({
    hide: false,
    cateryName: null,
    _id: null,
  });
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Dishes");
  console.log(addCategory);

  const category = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      const data = response.data.data;
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const AddNewCategory = async () => {
    try {
      await fetch("http://localhost:4000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cateryName: addCategory.cateryName }),
      });
      category();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleAddCategory = () => {
    setAddCategory((prevState) => ({
      ...prevState,
      hide: !prevState.hide,
    }));
  };

  const onCagegoryChange = (e: event) => {
    setAddCategory((prev) => ({ ...prev, cateryName: e.target.value }));
  };

  const setSelected = (menu: string) => {
    const params = new URLSearchParams(searchParams.toString());

    setSelectedCategory(menu);
    params.set("cateryName", menu);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    category();
  }, []);

  return (
    <>
      <div className=" p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12">
        <div className="self-stretch inline-flex justify-center items-center gap-2.5">
          <div className="justify-center items-center gap-2.5">
            <h4 className="justify-start text-xl font-semibold ">
              Dishes category
            </h4>
            <div className="flex flex-wrap w-[1100px] gap-3">
              {categories.map((category) => (
                <>
                  <div
                    key={category._id}
                    className="inline-flex justify-start items-center gap-3 flex-wrap content-center overflow-hidden"
                  >
                    <div
                      
                      className={`h-9 px-4 py-2 bg-background-bg-background rounded-full border-[1px] flex justify-start items-center gap-2
        ${
          selectedCategory === category.cateryName!
            ? "border-red-600"
            : "border-black"
        }`}
                      onClick={() => setSelected(category.cateryName!)}
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
                <Plus stroke="white" />
              </div>
              {addCategory.hide ? (
                <div className="w-[460px] bg-white rounded-md">
                  <div className="flex">
                    <p className=" justify-start text-lg font-semibold ">
                      Add new category
                    </p>
                    <button
                      onClick={toggleAddCategory}
                      className="w-7 h-7 px-2 py-2 bg-zinc-100 rounded-full inline-flex justify-center items-center gap-2"
                    >
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
      </div>
    </>
  );
};
