"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCategory } from "@/providers/categoryProvider";
export const DishesCategory = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
 /*  const [categories, setCategories] = useState<Category[]>([]); */
  const [addCategory, setAddCategory] = useState<Category>({
    cateryName: null,
    _id: null,
  });
  const { categories, refetch } = useCategory();

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined | null
  >("AllDishes");

 
  const AddNewCategory = async () => {
    try {
      await fetch("http://localhost:4000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cateryName: addCategory.cateryName }),
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const onCagegoryChange = (e: event) => {
    setAddCategory((prev) => ({ ...prev, cateryName: e.target.value }));
  };

  const setSelected = (menu: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (menu === "AllDishes") {
      setSelectedCategory("AllDishes");
    } else {
      const selecetedCategory = categories.find((name) => name._id === menu);
      setSelectedCategory(selecetedCategory?.cateryName);
    }

    params.set("cateryName", menu);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    refetch();
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
              <div className="inline-flex justify-start items-center gap-3 flex-wrap content-center overflow-hidden">
                <div
                  className={`h-9 px-4 py-2 cursor-pointer bg-background-bg-background rounded-full border-[1px] flex justify-start items-center gap-2
        ${
          selectedCategory === "AllDishes" ? "border-red-600" : "border-black"
        }`}
                  onClick={() => setSelected("AllDishes")}
                >
                  <p className="cursor-pointer">All Dishes</p>
                </div>
              </div>
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="inline-flex cursor-pointer justify-start items-center gap-3 flex-wrap content-center overflow-hidden"
                >
                  <div
                    className={`h-9 px-4 py-2 cursor-pointer bg-background-bg-background rounded-full border-[1px] flex justify-start items-center gap-2
        ${
          selectedCategory === category.cateryName!
            ? "border-red-600"
            : "border-black"
        }`}
                    onClick={() => setSelected(category._id!)}
                  >
                    <p className="cursor-pointer">{category.cateryName}</p>
                  </div>
                </div>
              ))}

              <AlertDialog>
                <AlertDialogTrigger>
                  {" "}
                  <div className="flex justify-center items-center w-[36px] h-[36px] bg-[#ef4444] rounded-full">
                    <Plus stroke="white" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="justify-start text-lg font-semibold ">
                      Add new category
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-black">
                      Category name
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Input
                    onChange={onCagegoryChange}
                    type="text"
                    placeholder="type category name..."
                    className="w-60"
                  ></Input>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={AddNewCategory}>
                      Add category
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
