import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Image, Plus } from "lucide-react";
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
import { useFormik } from "formik";
import { foodSchema } from "@/utils/foodValidationSchame";

const NEXT_PUBLIC_CLOUDINARY_API_KEY = "449676792634373";
const CLOUDINARY_UPLOAD_PRESET = "H8ahs3";
const CLOUDINARY_CLOUD_NAME = "dwauz9le4";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const ProductList = () => {
  const [catery, setCatery] = useState<Cat>({
    name: "",
    _id: "",
  });
  console.log(catery);
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [data, setData] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const formik = useFormik({
    initialValues: {
      foodName: "",
      ingredients: "",
      price: "",
      category: "",
      image: "",
    },
    validationSchema: foodSchema,
    onSubmit: async (values) => {
      try {
        setLoading(false);
        if (data) {
          await UploadCloudiinary();
        }
        const response = await fetch("http://localhost:4000/food/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodName: values.foodName,
            price: values.price,
            ingerdiets: values.ingredients,
            image: formik.values.image,
            category: values.category,
          }),
        });
        getFoods();
        const result = await response.json();
        console.log("Dish added successfully:", result);
        formik.resetForm();
        setLoading(true);
      } catch (error) {
        console.error("Error adding dish:", error);
      }
    },
  });

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

  const UploadCloudiinary = async () => {
    if (!data) {
      alert("Please insert photo");
      return;
    }
    try {
      setLoading(false);
      const file = new FormData();
      file.append("file", data as File);
      file.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      file.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY);

      const response = await axios.post(API_URL, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      formik.setFieldValue("image", response.data.secure_url);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const category = async () => {
    try {
      setLoading(false);
      const response = await axios.get("http://localhost:4000/categories");
      setCategories(response.data.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getFoods = async () => {
    try {
      setLoading(false);
      const Alldish = categories.find(
        (category) => category._id === catery._id
      );

      if (!Alldish) {
        const response = await axios.get("http://localhost:4000/food/allfoods");
        setAllFoods(response.data.data);
      } else {
        const response = await axios.get(
          `http://localhost:4000/food/category/${catery._id}`
        );
        setAllFoods(response.data.data);
      }
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const selectedCategory = searchParams.get("cateryName");
    setCatery((prev) => ({ ...prev, _id: selectedCategory || "" }));
    const cateryName = categories.find((a) => a._id === selectedCategory);
    if (cateryName) {
      setCatery((prev) => ({ ...prev, name: cateryName.cateryName || "" }));
    } else {
      setCatery((prev) => ({ ...prev, name: "AllDish" }));
    }

    getFoods();
  }, [searchParams]);

  useEffect(() => {
    category();
    getFoods();
  }, []);

  const onFoodNameChange = (e: event) => {
    formik.setFieldValue("foodName", e.target.value);
  };

  const onFoodPriceChange = (e: event) => {
    formik.setFieldValue("price", e.target.value);
  };

  const onIngredientsChange = (e: event) => {
    formik.setFieldValue("ingredients", e.target.value);
  };
  if (!loading) {
    return <div>is loading ...</div>;
  }
  

  return (
    <>
      {catery.name === "AllDish" ? (
        <>
          {categories.map((cat) => (
            <div key={cat.cateryName}>
              <div>{cat.cateryName}</div>
              
            </div>
          ))}
        </>
      ) : (
        <div>Other dish is selected.</div>
      )}
      <div className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12">
        <p>{catery.name}</p>
        <div className="grid gap-8 wrap grid-cols-4">
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="w-[270.75px] h-[241px] px-4 py-2 border-[1px] border-dashed border-red-500 rounded-[20px] inline-flex flex-col justify-center items-center gap-6 overflow-hidden">
                <div className="flex justify-center items-center w-[36px] h-[36px] bg-[#ef4444] rounded-full">
                  <Plus stroke="white" />
                </div>
                <div className="w-40 text-center justify-start text-text-text-secondary-foreground text-sm font-medium leading-tight">
                  Add new Dish to Salads
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
                    value={formik.values.foodName}
                    onChange={onFoodNameChange}
                    name="foodName"
                    placeholder="Type food name"
                  />
                  {formik.errors.foodName && formik.touched.foodName && (
                    <div className="text-red-500">{formik.errors.foodName}</div>
                  )}
                </div>
                <div>
                  <p>Food Price</p>
                  <Input
                    value={formik.values.price}
                    onChange={onFoodPriceChange}
                    name="price"
                    placeholder="Type price..."
                  />
                  {formik.errors.price && formik.touched.price && (
                    <div className="text-red-500">{formik.errors.price}</div>
                  )}
                </div>
              </div>
              <div>
                <p>Ingredients</p>
                <Input
                  value={formik.values.ingredients}
                  onChange={onIngredientsChange}
                  name="ingredients"
                  placeholder="List ingredients..."
                />
                {formik.errors.ingredients && formik.touched.ingredients && (
                  <div className="text-red-500">
                    {formik.errors.ingredients}
                  </div>
                )}
              </div>
              <div>
                <p>Food Image</p>
                <label
                  htmlFor="files"
                  className="relative w-full h-[230px] flex-col justify-center items-center inline-flex h-[180px] w-[416px] bg-[#7e7e7f]/5 rounded-lg flex-col justify-center items-center gap-2 inline-flex overflow-hidden"
                >
                  <img src={previewImg} alt="Preview" />
                  <input
                    id="files"
                    onChange={handleUploadImg}
                    type="file"
                    className="invisible"
                    name="profileImage"
                    accept="image/*"
                  />
                  <div className="h-9 w-9 rounded-full bg-white flex-col justify-center items-center inline-flex">
                    <Image />
                  </div>
                  <p>Choose a file or drag & drop it here</p>
                </label>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => formik.handleSubmit}>
                  Add Dish
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {allFoods && allFoods.length > 0 ? (
            allFoods.map((food) => (
              <div
                key={food._id} // Add the key prop here, assuming _id is unique
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
            ))
          ) : (
            <div>No food items available.</div>
          )}
        </div>
      </div>
    </>
  );
};
