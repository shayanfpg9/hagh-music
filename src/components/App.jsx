// React:
import { useState } from "react";

// Components:
import Header from "./Header/Header";

// Contexts:
import Menu from "../contexts/Menu";

export default function App() {
  const [isOpen, setMenuStatus] = useState(false);

  return (
    <>
      <Menu.Provider value={[isOpen, setMenuStatus]}>
        <Header />
      </Menu.Provider>
    </>
  );
}
