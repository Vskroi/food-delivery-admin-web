/* import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddCategoryModal } from "./addCategoryModal";

export default function FoodMenu() {
  const [addCat, setAddCat] = useState(false);

  // Fetch categories using React Query
  const {
    data: catList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/categories");
      return response.data.data;
    },
  });

  useEffect(() => {
    document.body.style.overflow = addCat ? "hidden" : "auto";
  }, [addCat]);

  return (
    <div className="w-[calc(100vw-205px)] bg-gray-100">

      {addCat && <AddCategoryModal setAddCat={setAddCat} refetch={refetch} />}

   
      <div className="w-full h-[60px] flex">
        <img
          src="./profile.jpg"
          className="rounded-full absolute w-[50px] mt-[10px] right-[30px]"
          alt="Profile"
        />
      </div>

      
      <div className="p-[24px] rounded-[12px] bg-white m-[30px] flex flex-col gap-[20px]">
        <div className="font-bold text-[25px]">Dishes category</div>
        <div className="flex gap-[15px] flex-wrap">
          <div className="border px-[20px] py-[5px] rounded-full bg-white">
            All dishes
          </div>
          {isLoading ? (
            <div>Loading categories...</div>
          ) : (
            catList.map((category, index) => (
              <div
                key={index}
                className="border px-[20px] py-[5px] rounded-full bg-white"
              >
                {category.categoryName} 
              </div>
            ))
          )}
          <div
            className="w-[36px] h-[36px] rounded-full bg-red-500 text-white text-[22px] text-center cursor-pointer flex items-center justify-center"
            onClick={() => setAddCat(true)}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
}
 */