import { createContext, useContext, useEffect, useState } from "react";
type CategoryContextType = {
  cateryName: string | undefined;
  _id: string | undefined;
};
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);
export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setcategory] = useState<CategoryContextType | undefined>(undefined);
  useEffect(() => {
    const category = localStorage.getItem("category");
    setcategory(JSON.parse(category || "{}"));
  }, []);

if (!window) {
  return <div>hello</div>;
}
return (
    <CategoryContext.Provider value={{cateryName: category?.cateryName , _id: category?._id }}>
        {category ? children : <div>... loading</div>}
    </CategoryContext.Provider>
)
};
export const useCategory = () => {
    const context = useContext(CategoryContext)
    return context
}