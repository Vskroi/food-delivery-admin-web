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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Image, Pencil, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { FoodMenuComboBox } from "./comboBox";

const NEXT_PUBLIC_CLOUDINARY_API_KEY = "449676792634373";
const CLOUDINARY_UPLOAD_PRESET = "H8ahs3";
const CLOUDINARY_CLOUD_NAME = "dwauz9le4";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
export const UpdateFood = ({ food }: { food: Food }) => {
  const [data, setData] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | undefined>();
  const [updateFood, setUpdateFood] = useState<Food>({
    foodName: null,
    price: null,
    ingerdiets: null,
    image: null,
    category: null,
  });

  console.table(updateFood);
  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
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
  const deleteFood = async (_id: string) => {
    try {
      if (data) {
        await UploadCloudiinary();
      }
      const response = await fetch("http://localhost:4000/food/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
          foodName: food.foodName,
        }),
      });

      const result = await response.json();
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };

  const UploadCloudiinary = async () => {
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

      setUpdateFood((prev) => ({ ...prev, image: response.data.secure_url }));
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateDish = async () => {
    try {
      await UploadCloudiinary();
      const response = await fetch(`http://localhost:4000/food/${food._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: updateFood.foodName,
          price: updateFood.price,
          ingerdiets: updateFood.ingerdiets,
          image: updateFood.image,
          category: updateFood.category,
        }),
      });

      const result = await response.json();
      console.log("Dish added successfully:", result);
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };
  const onIngredientsChange = (e: event) => {
    setUpdateFood((prev) => ({ ...prev, ingerdiets: e.target.value }));
  };
  const onDishNameChange = (e: event) => {
    setUpdateFood((prev) => ({ ...prev, foodName: e.target.value }));
  };
  const onCategoryChange = (id: string) => {
    setUpdateFood((prev) => ({ ...prev, category: id }));
    console.log(id)
  };
  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateFood((prev) => ({ ...prev, price: Number(e.target.value) }));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="absolute bottom-2 right-2 flex justify-center items-center w-[36px] h-[36px] bg-white rounded-full">
          <Pencil stroke="red" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Dishes info</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex w-full justify-between items-center mb-5">
              <div className="text-grey-400">Dish Name</div>{" "}
              <Input
                className="w-[300px]"
                placeholder="Dish Name"
                onChange={onDishNameChange}
              />
            </div>
            <div className="flex w-full justify-between items-center mb-5">
              <div className="text-grey-400">Dish category</div>{" "}
            
             <FoodMenuComboBox onCategoryChange={onCategoryChange}/>
            </div>
            <div className="flex w-full justify-between items-center mb-5">
              <div className="text-grey-400">Ingredients</div>{" "}
              <Input
                className="w-[300px]"
                placeholder="Ingredients"
                onChange={onIngredientsChange}
              />
            </div>
            <div className="flex w-full justify-between items-center mb-5">
              <div className="text-grey-400">Price</div>{" "}
              <Input
                type="number"
                className="w-[300px]"
                placeholder="Price"
                onChange={onPriceChange}
              />
            </div>
            <div className="w-full">
              <div className="text-sm font-medium">Food Image</div>
              <label
                htmlFor="files"
                className="w-full h-[180px] flex flex-col justify-center items-center bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
              >
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-white flex justify-center items-center">
                      <Image />
                    </div>
                    <p className="text-gray-500 text-sm">
                      Choose a file or drag & drop
                    </p>
                  </div>
                )}
                <input
                  id="files"
                  onChange={handleUploadImg}
                  type="file"
                  className="hidden"
                  name="profileImage"
                  accept="image/*"
                />
              </label>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full justify-between">
          <Button
            className="w-[35px] h-[35px] border-[1px] border-red-500"
            onClick={() => deleteFood(food._id as string)}
          >
            <Trash stroke="red" />{" "}
          </Button>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={UpdateDish}>
            Save changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
