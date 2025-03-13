"use client";

import { AdminPage } from "@/_features/admin/adminPgae";

import { Navigation } from "@/components/AdminWeb/Navigation/Navigation";

import { Login } from "@/components/Login/Login";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
const [step , nextStep] = useState(false)

    return (
      <>
        <div>
          {!step ?   <AdminPage></AdminPage>: <Login nextStep={nextStep}></Login>  }
       
        </div>
      </>
    );
  
}
