"use client";

import { LoginFeatures } from "@/_features/Login/Login-Featuts";
import { Navigation } from "@/components/AdminWeb/Navigation/Navigation";

import { Login } from "@/components/Login/Login";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
const [step , nextStep] = useState(false)

    return (
      <>
        <div>
          {!step ?   <Navigation></Navigation> : <Login nextStep={nextStep}></Login>  }
       
        </div>
      </>
    );
  
}
