import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

import { useFormik } from "formik";
import { foodSchema } from "@/utils/foodValidationSchame";
import { AddNewFood } from "./AddNewFood";
import { SelectedCategories } from "./SelectedCategories";


const NEXT_PUBLIC_CLOUDINARY_API_KEY = "449676792634373";
const CLOUDINARY_UPLOAD_PRESET = "H8ahs3";
const CLOUDINARY_CLOUD_NAME = "dwauz9le4";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const ProductList = () => {
  const [catery, setCatery] = useState<Cat>({
    name: "",
    _id: "",
  });

  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [data, setData] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [addFood, setAddFood] = useState<Food>({
    _id: "",
    foodName: "",
    price: "",
    ingerdiets: "",
    image: "",
    category: "",
  });
  console.log(addFood)

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
      console.log("ca", values);
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
  const AddNewFoods = async () => {
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
      formik.resetForm();
      setLoading(true);
    } catch (error) {
      console.error("Error adding dish:", error);
    }
   
  };

  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (!files) return;
    const file = files[0];
    console.log(file)
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
      console.log(response)

      setAddFood((prev) => ({...prev , image : response.data.secure_url }))
      setLoading(true);
      setTimeout(() => {
        AddNewFoods()
      }, 3467);
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
        if(response) {
          setAllFoods(response.data.data);
          console.log('1')
        }else{
          setAllFoods([]);
          console.log('2')
        }
       
      }
      setLoading(true);
    } catch (error) {
      console.log(error);
      setAllFoods([]);
      console.log('2')
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
  const addnewFoodCategory = (id: string) => {
    setAddFood((prev) => ({ ...prev, category: id }));
  };

  useEffect(() => {
    category();
    getFoods();
  }, []);

  const onFoodNameChange = (e: event) => {
    setAddFood((prev) => ({ ...prev, foodName: e.target.value }));
  };

  const onFoodPriceChange = (e: event) => {
    setAddFood((prev) => ({ ...prev, price: e.target.value }));
  };

  const onIngredientsChange = (e: event) => {
    setAddFood((prev) => ({ ...prev, ingerdiets: e.target.value }));
  };


  return (
    <>
      {catery.name === "AllDish" ? (
        categories.map((cat) => (
          <div
            key={cat.cateryName}
            className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12"
          >
            <div>{cat.cateryName}</div>
            <div className="grid gap-8 grid-cols-4">
            <AddNewFood
              handleUploadImg={handleUploadImg}
              previewImg={previewImg}
              onIngredientsChange={onIngredientsChange}
              onFoodNameChange={onFoodNameChange}
              catery={catery}
              addnewFoodCategory={addnewFoodCategory}
              onFoodPriceChange={onFoodPriceChange}
              AddNewFoods={UploadCloudiinary}
            />
              {allFoods.filter((f) => f.category === cat._id).length > 0 ? (
                allFoods
                  .filter((f) => f.category === cat._id)
                  .map((food) => (
                    <SelectedCategories food={food} />
                  ))
              ) : (
                <div>No food found</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12">
          <p>{catery.name}</p>
          <div className="grid gap-8 wrap grid-cols-4">
          <AddNewFood
              handleUploadImg={handleUploadImg}
              previewImg={previewImg}
              onIngredientsChange={onIngredientsChange}
              onFoodNameChange={onFoodNameChange}
              catery={catery}
              addnewFoodCategory={addnewFoodCategory}
              onFoodPriceChange={onFoodPriceChange}
              AddNewFoods={UploadCloudiinary}
            />

            {allFoods && allFoods.length > 0 ? (
              allFoods.map((food) => (
          <SelectedCategories food={food} />
              ))
            ) : (
             <div>no food found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
