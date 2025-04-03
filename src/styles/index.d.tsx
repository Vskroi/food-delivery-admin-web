type Login = {
  email?: string;
  password?: string;
};

type ChechEmailPassword = {
  email: String;
  password: string;
};

type event = { target: { value: string } };

type setMenuSelected = { setMenuSelected: { setMenuSelected: string } };

type ContainerProps = {
  selected: string;
};

type AdminPageState = string;

type NavigationProps = {
  setMenuSelected: (menu: string) => void;
};







///
type Category = {
  _id: string | null;
  cateryName: string | null;
};

type Food = {
  _id?: string | null;
  foodName: string | null;
  price: number | null;
  ingerdiets: string | null;
  image: string | null;
  category: string | null;
};

type Dish = {
  foodName: string | null;
  price: number | null;
  ingerdiets: string | null;
  image: string | null;
  category: string | undefined;
};

type Cat = {
  name?: string;
  _id: string | null;
};
type UserContextType = {
  data: {
    email: string;
    _id: string;
    role: string;
  };
  exp: number;
  iat: number;
} | undefined;
