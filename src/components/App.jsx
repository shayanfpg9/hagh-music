// React:
import { useState } from "react";

// Components:
import Header from "./Header/Header";

// Contexts:
import MenuContext from "../contexts/Menu";
import Menu from "./Header/Menu";

export default function App() {
  const [isOpen, setMenuStatus] = useState(false);

  return (
    <>
      <MenuContext.Provider value={[isOpen, setMenuStatus]}>
        <Header/>
        <Menu />
      </MenuContext.Provider>
    </>
  );
}
