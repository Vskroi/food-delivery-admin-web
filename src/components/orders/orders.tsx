'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { ComboboxDemo } from "./ordersComboBox";

// Types for User and FoodOrder
type User = {
  _id: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
};

type FoodOrder = {
  createdAt: string;
  foodOrderItems: {
    food: {
      foodName: string;
      price: number;
      _id: string;
    };
    quantity: string;
    _id: string;
  }[];
  user: {
    email: string;
    phoneNumber: string;
    _id: string;
  };
  image: string;
  totalPrice: number;
  updatedAt: string;
  _id: string;
  status: string; // Add the status field to the FoodOrder type
};

export const Orders = () => {
  const [foodOrder, setFoodOrder] = useState<FoodOrder[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Track loading state

  const allUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users/allUsers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/foodOrder/order");
      setFoodOrder(response.data.data);  // Set food orders
      setLoading(false);  // Set loading to false after data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false);  // Set loading to false even if there’s an error
    }
  };

  useEffect(() => {
    allUsers();
    getData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="block">
      <div className="w-9 h-9 relative rounded-full">
        <img
          className="w-9 h-9 rounded-full"
          src={'default-image-url'}
          alt="User Avatar"
        />
      </div>
      <div className="border-[2px] rounded-md w-[1171px] ">
        <div className="self-stretch p-4 border-b border-border-border-border inline-flex justify-between items-center">
          <div className="w-[485.20px] inline-flex flex-col justify-start items-start">
            <div className="w-48 justify-start text-text-text-foreground text-xl font-bold font-['Inter'] leading-7">
              Orders
            </div>
            <div className="justify-start text-text-text-muted-foreground text-xs font-medium font-['Inter'] leading-none">
              {foodOrder.length} items{" "}
            </div>
          </div>
          <div className="flex justify-start items-center gap-3"></div>
        </div>
        <div className="w-full self-stretch p-4 border-b border-border-border-border flex justify-start items-center justify-between">
          <input type="checkBox" />
          <p className="justify-start text-text-text-foreground text-sm font-normal leading-tight">
            №
          </p>
          <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
            Customer
          </p>
          <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
            Food
          </p>
          <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
            Date
          </p>
          <div className="w-4 h-4 relative overflow-hidden">
            <div className="w-1.5 h-2.5 left-[4.67px] top-[2.67px] absolute outline outline-1 outline-offset-[-0.50px] outline-border-border-foreground"></div>
          </div>
          <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
            Total
          </p>
          <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
            Delivery Address
          </p>
          <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
            Delivery State
          </p>
        </div>

        {foodOrder.map((order) => (
          <div
            key={order._id}
            className="w-full self-stretch p-4 border-b border-border-border-border flex justify-start items-center justify-between"
          >
            <input type="checkBox" />
            <p className="justify-start text-text-text-foreground text-sm font-normal leading-tight">
             1  
            </p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
              {order.user.email}
            </p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
              {order.foodOrderItems
                .map((item) => item.food.foodName)
                .join(",")}
            </p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <div className="w-4 h-4 relative overflow-hidden">
              <div className="w-1.5 h-2.5 left-[4.67px] top-[2.67px] absolute outline outline-1 outline-offset-[-0.50px] outline-border-border-foreground"></div>
            </div>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
              ${order.totalPrice}
            </p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">
              {order.user.email}
            </p>
      
            <ComboboxDemo id={order._id} status={order.status} />
          </div>
        ))}
      </div>
    </div>
  );
};
