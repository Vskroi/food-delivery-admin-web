import { MoveLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import axios from "axios"

export const Login = () => {
  const [loginValue, setLoginValue] = useState<Login >({});
  const [errors, setErrors] = useState<ChechEmailPassword[]>([]);

  const getData = async() =>{
    const response = await axios.get("http://localhost:4000")
    console.log(response)
  }
  useEffect(() => {
    getData()
  },[])


  const onSubmit = () => {
   

  };
  const onEmailValueChange  = (e : event )  => {
    setLoginValue((prev) => ({ ...prev, email: e.target.value }));
  };
  const onPasswordValueChange = (e: event) => {
    setLoginValue((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <div>
      <Button>
        <MoveLeft></MoveLeft>
      </Button>
      <h1>Log in</h1>
      <p>Log in enjoy your favorite dishes.</p>
      <Input
        className="w-[416px]"
        placeholder="Enter Your email address"
        onChange={onEmailValueChange}
      ></Input>
      <Input
        className="w-[416px]"
        placeholder="Password"
        onChange={onPasswordValueChange}
      ></Input>
      <Button onClick={onSubmit}>Let's Go</Button>
    </div>
  );
};
