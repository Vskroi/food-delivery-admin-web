import {
    QueryClient,
    QueryObserverResult,
    RefetchOptions,
    useMutation,
  } from "@tanstack/react-query";
  import axios from "axios";
  import { Dispatch, SetStateAction, useState } from "react";
  import { toast } from "react-toastify";
   
  type AddCatergoryModalProps = {
    setAddCat: Dispatch<SetStateAction<boolean>>;
    refetch: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<any, Error>>;
  };
   
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
   
  export const AddCategoryModal = ({
    setAddCat,
    refetch,
  }: AddCatergoryModalProps) => {
    const [newCat, setNewCat] = useState("");
    const queryClient = new QueryClient();
   
    const { mutate: addCategory, isPending } = useMutation({
      mutationFn: async ({ name }: { name: string }) => {
        await axios.post("http://localhost:4000/categories", { cateryName: name });
      },
      onSuccess: async () => {
        setAddCat(false);
   
        // await timeout(3000);
        await queryClient.refetchQueries({
          queryKey: ["categories"],
          type: "active",
        });
   
        // await refetch();
   
        toast("🦄 Successfully added category", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to add category", {
          position: "top-right",
          autoClose: 3000,
        });
      },
    });
   
    return (
      <div className="w-full h-full ml-[-205px] fixed bg-black/25 flex justify-center items-center">
        <div className="w-[500px] h-[300px] rounded-[5px] bg-white p-[25px]">
          <div className="w-full h-[50px] flex justify-between">
            <div className="text-[20px] font-bold">Add new category</div>
            <div
              className="p-[5px] w-fit h-fit bg-gray-100 rounded-full"
              onClick={() => setAddCat(false)}
            >
              <img src="./x.svg" className="w-[30px] h-[30px]" />
            </div>
          </div>
          <div className="flex flex-col gap-[10px] mt-[20px]">
            <div className="font-bold">Category name</div>
            <input
              type="text"
              placeholder="Add category..."
              className="w-full outline-none h-[40px] rounded-[5px] border p-[10px]"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
            />
          </div>
          <button
            className="ml-[320px] rounded-[5px] mt-[50px] bg-black text-white px-[15px] py-[10px]"
            onClick={() => {
              addCategory({ name: newCat });
            }}
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add category"}
          </button>
        </div>
      </div>
    );
  };