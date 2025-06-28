import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = (): string => cookies.get("gacoan_token");

export const setToken = (token: string) => {
  cookies.set("gacoan_token", token, { path: "/" });
};

export const removeToken = () =>
  cookies.remove("gacoan_token", { path: "/" });
