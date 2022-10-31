import React from 'react';
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
            <NavLink to="/" activeStyle>
                Home
            </NavLink>

            <NavLink to="/POSPage" activeStyle>
                POS
            </NavLink>
            
            <NavLink to="/ManagerPage" activeStyle>
                Manager
            </NavLink>

            <NavLink to="Inventory" activeStyle>
            </NavLink>

            <NavLink to="OrderHistory" activeStyle>
            </NavLink>

            <NavLink to="Excess" activeStyle>
            </NavLink>

            <NavLink to="Pair" activeStyle>
            </NavLink>

            <NavLink to="Restock" activeStyle>
            </NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
