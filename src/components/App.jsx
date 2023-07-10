// React:
import { useState } from "react";

// Components:
import Header from "./Header/Header";
import Menu from "./Header/Menu";
import Footer from "./Footer/Footer";

// Contexts:
import MenuContext from "../contexts/Menu";

export default function App() {
  const [isOpen, setMenuStatus] = useState(false);

  return (
    <>
      <MenuContext.Provider value={[isOpen, setMenuStatus]}>
        <Header />
        <Menu />
        <Footer />
      </MenuContext.Provider>
    </>
  );
}
