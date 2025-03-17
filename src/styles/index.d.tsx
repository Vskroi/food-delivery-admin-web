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

type Category = {
  cateryName: string | null;
  hide?: boolean;
  _id: string | null;
};

type Dish = {
  foodName: string | null;
  price: number | null;
  ingerdiets: string | null;
  image: string | null;
  category?: string;
};
type Food = {
  _id: string;
  category: string;
  foodName: string;
  image: string;
  ingerdiets: string;
  price: number;
  __v: number;
};