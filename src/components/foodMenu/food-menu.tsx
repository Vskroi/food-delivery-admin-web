import { DishesCategory } from "./DishesCategory";
import { ProductList } from "./product-list"
export const FoodMenu = () => {
  return (
    <>
      <div className="w-[840px] lg:w-[1440px] md relative bg-[#f4f4f5]">
        <DishesCategory></DishesCategory>
        <ProductList></ProductList>
      </div>
    </>
  );
};
