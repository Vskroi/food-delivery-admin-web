import { Container } from "@/components/container";
import { Navigation } from "@/components/Navigation/Navigation";
import { useState } from "react";



export const AdminPage = () => {
  const [selected, setMenuSelected] = useState<AdminPageState>("FoodMenu");

  return (
    <div className="flex">
      <Navigation setMenuSelected={setMenuSelected} />
      <Container selected={selected}/>
    </div>
  );
};
