"use client"
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type Category = {
  cateryName: string;
  _id: string;
};

type CategoryContextType = {
  categories: Category[];
  refetch: () => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, refetch: fetchData }}>
      {children }
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
