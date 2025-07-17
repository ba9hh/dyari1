import React, { useState, useContext } from "react";
import dyari from "../assets/dyari.svg";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import {
  Tab,
  Tabs,
} from "@mui/material"
const NavBar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { type } = useParams();
  const [navbarElement, setNavbarElement] = useState(type || "");
  const categories = [
    { name: "Les salés 🍕", nameSm: "salés 🍕", link: "sales" },
    { name: "Les sucrés 🍩", nameSm: "sucrés 🍩", link: "sucres" },
    { name: "Un mélange 🍱", nameSm: "mélange 🍱", link: "" },
    { name: "Les gâteaux 🎂", nameSm: "gâteaux 🎂", link: "gateaux" },
    { name: "Les biscuits 🍪", nameSm: "biscuits 🍪", link: "biscuit" },
  ];
  const categoriesSm = [
    { name: "Un mélange 🍱", nameSm: "mélange 🍱", link: "" },
    { name: "Les salés 🍕", nameSm: "salés 🍕", link: "sales" },
    { name: "Les sucrés 🍩", nameSm: "sucrés 🍩", link: "sucres" },
    { name: "Les gâteaux 🎂", nameSm: "gâteaux 🎂", link: "gateaux" },
  ];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="h-fit sm:h-12 flex justify-between items-end w-full sm:pl-8 px-2 sm:pr-4 border sm:pb-0 pb-3">
        <div className="flex items-center gap-1">
          <img className="w-7" src={dyari} />
          <h1 className="text-2xl font-medium text-amber-800">Dyari</h1>
        </div>
        <div>
          {user ? (
            <Link to={"/account"}>
              <img
                src={user ? user.profilePicture : ""}
                className="rounded-full w-10 h-10"
              />
            </Link>
          ) : (
            <div>
              <Link
                className="px-2 pb-1 rounded-lg border-2 text-amber-700 border-amber-500 shadow-lg hidden sm:block"
                to={"/auth"}
              >
                se connecter
              </Link>
              <div className="flex gap-2">
                <Link
                  to={"/auth"}
                  className=" rounded-full p-1 text-gray-600 bg-amber-100 block sm:hidden"
                >
                  <SearchIcon style={{ fontSize: "1.3rem" }} />
                </Link>
                <Link
                  to={"/auth"}
                  className=" rounded-full p-1 text-gray-600 bg-amber-100 block sm:hidden"
                >
                  <PermIdentityIcon style={{ fontSize: "1.6rem" }} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="block sm:hidden">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Un mélange 🍱" sx={{ textTransform: "none" }} />
          <Tab label="Les salés 🍕" sx={{ textTransform: "none" }} />
          <Tab label="Les sucrés 🍩" sx={{ textTransform: "none" }} />
          <Tab label="Les gâteaux 🎂" sx={{ textTransform: "none" }} />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </div>
      <div className=" hidden sm:flex w-full justify-center items-center sm:gap-x-4 gap-x-1 mt-2 sm:mt-0">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="bg-white sm:rounded-full px-0.5 sm:px-6 py-2 shadow-md">
          <div className="">
            {categories.map((category) => (
              <Link
                key={category.link}
                to={`/${category.link}`}
                className={`px-3 py-2 ${
                  navbarElement == category.link
                    ? "border-b-[4px] border-amber-400"
                    : ""
                }`}
                onClick={() => setNavbarElement(category.link)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
};

export default NavBar;
