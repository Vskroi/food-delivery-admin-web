import { Container } from "@/components/AdminWeb/container";
import { Navigation } from "@/components/AdminWeb/Navigation/Navigation";
import { useState } from "react";



export const AdminPage = () => {
  const [selected, setMenuSelected] = useState<AdminPageState>("FoodMenu");

  return (
    <div className="flex">
      <Navigation setMenuSelected={setMenuSelected} />
      <Container selected={selected} />
    </div>
  );
};
