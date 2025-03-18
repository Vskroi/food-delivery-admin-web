import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Image, Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import axios from "axios";
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
import { FoodMenu } from "./food-menu";

const NEXT_PUBLIC_CLOUDINARY_API_KEY = "449676792634373";
const CLOUDINARY_UPLOAD_PRESET = "H8ahs3";
const CLOUDINARY_CLOUD_NAME = "dwauz9le4";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const ProductList = () => {
  const [catery, setCatery] = useState<Cat>({
    name: "All Dishes",
    _id: "",
  });
  const searchParams = useSearchParams();
  const [addNewDishs, setAddNewDish] = useState<Dish>({
    foodName: null,
    price: null,
    ingerdiets: null,
    image: null,
    category: undefined,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | undefined>();
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  console.log(allFoods)
  const handleUploudImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (!files) return;
    const file = files[0];
    setData(file);
    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const category = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      const data = await response.data.data;
      setCategories( data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllFood = async () => {
    try {
      const response = await axios.get("http://localhost:4000/food/allfoods");
      setAllFoods(response.data.data);
   
    } catch (error) {
      console.log(error);
    }
  };

  const getFood = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/food/category/${catery._id}`
      );
      const data = await response.data.data
      setAllFoods(await data);
    } catch (error) {
      console.log(error);
    }
  };

  const UploadCloudiinary = async () => {
    if (!data) alert("Please insert photo");
    try {
      const file = new FormData();
      file.append("file", data as File);
      file.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      file.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const response = await axios.post(API_URL, file, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      setAddNewDish((prev) => ({ ...prev, image: response.data.secure_url }));
      await addNewDish()
    } catch (error) {
      console.log(error);
    }
  };

  const addNewDish = async () => {
    try {
      const response = await fetch("http://localhost:4000/food/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: addNewDishs.foodName,
          price: addNewDishs.price,
          ingerdiets: addNewDishs.ingerdiets,
          image: addNewDishs.image,
          category: addNewDishs.category,
        }),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const categoryId = () => {
    const category = categories.find((cat) => cat._id === catery._id);

    setAddNewDish((prev) => ({
      ...prev,
      category: category?._id as string,
    }));
  };
  useEffect(() => {
    const selectedCategory = searchParams.get("cateryName");
    console.log(selectedCategory , "selectedCategory")
    setCatery((prev) => ({ ...prev, _id: selectedCategory }));
    const category = categories.find((cat) => cat._id === catery._id);
    if (category) {
      setCatery((prev) => ({ ...prev, name: category?.cateryName }));
    }

    const Alldish = categories.find(
      (category) => category._id === catery._id
    );
console.log({"Alldish" : Alldish , "categories" : categories , "catery" : catery})
    if (!Alldish) {
      getAllFood();
    } else if (Alldish) {
      getFood();
    }
    categoryId();
  }, [searchParams]);

  useEffect(() => {
    category();
  }, []);

  useEffect(() => {
  }, [catery]);

  const onFoodNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddNewDish((prev) => ({ ...prev, foodName: e.target.value }));
  };

  const onFoodPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddNewDish((prev) => ({ ...prev, price: e.target.value }));
  };

  const onIngredientsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddNewDish((prev) => ({ ...prev, ingerdiets: e.target.value }));
  };

  return (
    <>
      <div className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12">
        <p>{catery.name} ()</p>
        <div className="grid gap-8 wrap grid-cols-4">
          <AlertDialog>
            <AlertDialogTrigger onClick={categoryId}>
              <div className="w-[270.75px] h-[241px] px-4 py-2 border-[1px] border-dashed border-red-500 rounded-[20px] inline-flex flex-col justify-center items-center gap-6 overflow-hidden">
                <div className="flex justify-center items-center w-[36px] h-[36px] bg-[#ef4444] rounded-full">
                  <Plus stroke="white" />
                </div>
                <div className="w-40 text-center justify-start text-text-text-secondary-foreground text-sm font-medium leading-tight">
                  Add new Dish to Salads{" "}
                </div>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="justify-start text-lg font-semibold">
                  Add new Dish to Appetizers
                </AlertDialogTitle>
                <AlertDialogDescription className="text-black"></AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-5">
                <div>
                  <p>Food Name</p>
                  <Input
                    onChange={onFoodNameChange}
                    placeholder="Type food name"
                  ></Input>
                </div>
                <div>
                  <p>Food price</p>
                  <Input
                    onChange={onFoodPriceChange}
                    placeholder="Type price..."
                  ></Input>
                </div>
              </div>
              <div>
                <div>
                  <p>Ingredients</p>
                  <Input
                    onChange={onIngredientsChange}
                    placeholder="List ingredients..."
                  ></Input>
                </div>
                <div>
                  <p>Food image</p>
                  <label
                    htmlFor="files"
                    className="relative w-full h-[230px] flex-col justify-center items-center inline-flex h-[180px] w-[416px] bg-[#7e7e7f]/5 rounded-lg flex-col justify-center items-center gap-2 inline-flex overflow-hidden"
                  >
                    <img src={previewImg} />
                    <input
                      id="files"
                      onChange={handleUploudImg}
                      type="file"
                      className="invisible"
                      name="profileImage"
                      accept="image/*"
                    />
                    <div className="h-9 w-9 rounded-full bg-white flex-col justify-center items-center inline-flex">
                      <Image />
                    </div>
                    <p>Choose a file or drag & drop it heree</p>
                  </label>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={UploadCloudiinary}>
                  add dish
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {allFoods && allFoods.length > 0 ? (
          allFoods.map((food) => (
            <div
              key={food._id}
              className="w-[270.75px] h-[241px] rounded-[22px] border-[1px] bg-white border-[#E4E4E7] p-4"
            >
              <img
                className="w-[238.75px] h-[129px] gap-10 rounded-xl"
                src={food.image}
                alt={food.foodName}
              />
              <div className="self-stretch inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                  <div className="flex-1 justify-start text-Tailwind-red---Text-color-500 text-sm font-medium leading-tight">
                    {food.foodName}
                  </div>
                  <div className="justify-start text-text-text-foreground text-xs font-normal leading-none">
                    ${food.price}
                  </div>
                </div>
                <div className="self-stretch justify-start text-text-text-foreground text-xs font-normal leading-none">
                  {food.ingerdiets}
                </div>
              </div>
            </div>
          ))) : (
            <div>No food items available.</div>
          )}
        </div>
      </div>
    </>
  );
};
