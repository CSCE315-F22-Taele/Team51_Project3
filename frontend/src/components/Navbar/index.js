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
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
