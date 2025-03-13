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
  selected: string ;
};
type AdminPageState = string ;

type NavigationProps = {
  setMenuSelected: (menu: string) => void;
};
type Category = {
  cateryName: string;
};