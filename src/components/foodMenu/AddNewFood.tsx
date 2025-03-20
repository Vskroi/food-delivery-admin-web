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
  
  interface AddNewFoodProps {
    handleUploadImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
    previewImg?: string;
    onIngredientsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFoodNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFoodPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    AddNewFoods:  (event: React.MouseEvent<HTMLButtonElement>) => void;
    catery: (Cat)
    addnewFoodCategory: (event: string) => void
  }
  
  export const AddNewFood: React.FC<AddNewFoodProps> = ({
    handleUploadImg,
    previewImg,
    onIngredientsChange,
    onFoodNameChange,
    onFoodPriceChange,
    catery,
    addnewFoodCategory,
    AddNewFoods
  }) => {
    
    return (
      <AlertDialog>
        <AlertDialogTrigger onClick={()=>addnewFoodCategory(catery._id as string)}>
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
  
          {/* Food Name & Price Fields */}
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
                onChange={onFoodPriceChange}
                name="price"
                placeholder="Type price..."
              />
            </div>
          </div>
  
          {/* Ingredients Input */}
          <div>
            <p className="text-sm font-medium">Ingredients</p>
            <Input
              onChange={onIngredientsChange}
              name="ingredients"
              placeholder="List ingredients..."
            />
          </div>
  
          {/* Image Upload */}
          <div>
            <p className="text-sm font-medium">Food Image</p>
            <label
              htmlFor="files"
              className="w-full h-[180px] flex flex-col justify-center items-center bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
            >
              {previewImg ? (
                <img src={previewImg} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-white flex justify-center items-center">
                    <Image />
                  </div>
                  <p className="text-gray-500 text-sm">Choose a file or drag & drop</p>
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
            <AlertDialogAction onClick={AddNewFoods} >Add Dish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  