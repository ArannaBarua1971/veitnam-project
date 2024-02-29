import React from "react";
import {Logo} from "../../components"

function Header() {

  return (
    <section className="logoDesign py-2">
      <Logo src="/imgs/Logo.png" className="cursor-pointer p-0" style={{ width:"100px" }} />
    </section>
  );
}

export default Header;
