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
  _id: string;
  cateryName: string;
};

type Food = {
  _id: string;
  foodName: string;
  price: string;
  ingerdiets: string;
  image: string;
  category: string;
};

type Dish = {
  foodName: string | null;
  price: string | null;
  ingerdiets: string | null;
  image: string | null;
  category: string | undefined;
};

type Cat = {
  name: string;
  _id: string | null;
};
