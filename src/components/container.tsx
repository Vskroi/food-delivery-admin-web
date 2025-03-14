import React from "react";
import { Orders } from "./orders/orders";
import { FoodMenu } from "./foodMenu/food-menu";
import { Settings } from "./settings/settings";

interface ContainerProps {
  selected: string | null;
}

export const Container: React.FC<ContainerProps> = ({ selected }) => {

  
  return (
    <>
      {selected === "Orders" ? (
        <Orders />
      ) : selected === "FoodMenu" ? (
        <FoodMenu />
      ) : selected === "Settings" ? (
        <Settings />
      ) : null}
    </>
  );
};
