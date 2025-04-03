"use client";



import { Navigation } from "@/components/Navigation/Navigation";


import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
/* import FoodMenu from "@/components/zzz/CatFoodMenu"; */

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    router.push("/login")
  })

    return (
      <>
        <div>
 {/*          <FoodMenu></FoodMenu> */}

       
        </div>
      </>
    );
  
}
