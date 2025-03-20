"use client";

import { AdminPage } from "@/_features/admin/adminPgae";

import { Navigation } from "@/components/Navigation/Navigation";

import { Login } from "@/components/Login/Login";
import axios from "axios";
import { useEffect, useState } from "react";
import FoodMenu from "@/components/zzz/CatFoodMenu";

export default function Home() {
const [step , nextStep] = useState(false)

    return (
      <>
        <div>
          <FoodMenu></FoodMenu>
        {/*   {!step ?   <AdminPage></AdminPage>: <Login nextStep={nextStep}></Login>  } */}
       
        </div>
      </>
    );
  
}
