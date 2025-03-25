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
import { Image, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import axios from "axios";
const NEXT_PUBLIC_CLOUDINARY_API_KEY = "449676792634373";
const CLOUDINARY_UPLOAD_PRESET = "H8ahs3";
const CLOUDINARY_CLOUD_NAME = "dwauz9le4";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

type AddNewFoodProps = {
  NewFoodCategoryId: string | null;
  getFoods: () => void;
};

export const AddNewFood: React.FC<AddNewFoodProps> = ({
  NewFoodCategoryId,
  getFoods,
  
}) => {
  console.log("NewFoodCategoryId" , NewFoodCategoryId)
  const [addFood, setAddFood] = useState<Food>({
    _id: null,
    foodName: null,
    price: null,
    ingerdiets: null,
    image: null,
    category: null,
  });
console.log(addFood)
  const [data, setData] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | undefined>();

  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (!files) return;
    const file = files[0];

    setData(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImg(reader.result as string);
      console.log(reader);
    };

    reader.readAsDataURL(file);
  };
  const AddNewFoods = async () => {
    try {
      if (data) {
        await UploadCloudiinary();
      }
      const response = await fetch("http://localhost:4000/food/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: addFood.foodName,
          price: addFood.price,
          ingerdiets: addFood.ingerdiets,
          image: addFood.image,
          category: addFood.category,
        }),
      });
      getFoods();
      const result = await response.json();
      console.log("Dish added successfully:", result);
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };
  const UploadCloudiinary = async () => {
    if (!data) {
      alert("Please insert photo");
      return;
    }
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
      console.log(response, "asd");

      setAddFood((prev) => ({ ...prev, image: response.data.secure_url }));

      setTimeout(() => {
        AddNewFoods();
      }, 6467);
    } catch (error) {
      console.log(error);
    }
  };

  const addnewFoodCategory = (id: string) => {
    setAddFood((prev) => ({ ...prev, category: id }));
  };

  const onFoodNameChange = (e: event) => {
    setAddFood((prev) => ({ ...prev, foodName: e.target.value }));
  };

const onFoodPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setAddFood((prev) => ({ ...prev, price: Number(e.target.value) }));
};

  const onIngredientsChange = (e: event) => {
    setAddFood((prev) => ({ ...prev, ingerdiets: e.target.value }));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={() => addnewFoodCategory(NewFoodCategoryId as string)}
      >
        <div className="w-[270px] h-[241px] px-4 py-2 border border-dashed border-red-500 rounded-[20px] flex flex-col justify-center items-center gap-6">
          <div className="flex justify-center items-center w-9 h-9 bg-red-500 rounded-full">
            <Plus stroke="white" />
          </div>
          <div className="w-40 text-center text-sm font-medium text-gray-500">
            Add new Dish to Salads
          </div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Add new Dish to Appetizers
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black"></AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex gap-5">
          <div>
            <p className="text-sm font-medium">Food Name</p>
            <Input
              onChange={onFoodNameChange}
              name="foodName"
              placeholder="Type food name"
            />
          </div>
          <div>
            <p className="text-sm font-medium">Food Price</p>
            <Input
              type="number"
              onChange={onFoodPriceChange}
              name="price"
              placeholder="Type price..."
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">Ingredients</p>
          <Input
            onChange={onIngredientsChange}
            name="ingredients"
            placeholder="List ingredients..."
          />
        </div>

        <div>
          <p className="text-sm font-medium">Food Image</p>
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

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={AddNewFoods}>Add Dish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
