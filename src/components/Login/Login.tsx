import { MoveLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { object, string } from "yup";

interface LoginProps {
  nextStep: (isAdmin: boolean) => void;
}

export const Login = ({ nextStep }: LoginProps) => {
  const [loginValue, setLoginValue] = useState<Login>({});
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState<Login>({});
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/users");
      const adminData = response.data[0];
      setAdmin(adminData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async () => {
    const userSchema = object({
      email: string().email().required(),
      password: string().min(6).required(), 
    });

    try {
      await userSchema.validate(loginValue);

      if (loginValue.email === admin.email && loginValue.password === admin.password) {
        setError(null);
        console.log("Login successful");
        nextStep(true); 
        setError("Invalid email or password");
        console.log("Invalid credentials");
      }
    } catch (err) {
      setError("Please check your inputs");
    }
  };

  const onEmailValueChange = (e: event) => {
    setLoginValue((prev) => ({ ...prev, email: e.target.value }));
  };

  const onPasswordValueChange = (e: event) => {
    setLoginValue((prev) => ({ ...prev, password: e.target.value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex">
      <div className="w-[416px] h-[376px] flex-col justify-center items-start gap-6 inline-flex mt-[326px] ml-[90px]">
        <Button>
          <MoveLeft />
        </Button>
        <h1 className="text-zinc-950 text-2xl font-semibold leading-loose">
          Log in
        </h1>
        <p className="text-zinc-500 text-base font-normal leading-normal">
          Log in and enjoy your favorite dishes.
        </p>
        <Input
          className="h-9 flex-col justify-start items-start gap-2 w-[336px] text-zinc-500 text-sm font-normal leading-tight"
          placeholder="Enter Your email address"
          onChange={onEmailValueChange}
          value={loginValue.email}
        />
        <Input
          className="h-9 flex-col justify-start items-start gap-2 w-[336px] text-zinc-500 text-sm font-normal leading-tight"
          placeholder="Password"
          type="password"
          onChange={onPasswordValueChange}
          value={loginValue.password}
        />
        {error && <div className="text-red-500">{error}</div>}
        <a href="#" className="underline">
          Forgot password?
        </a>
        <Button onClick={onSubmit} className="w-[336px]">
          Let's Go
        </Button>
      </div>
      <div className="w-[856px] h-[904px] bg-black mt-10"></div>
    </div>
  );
};
