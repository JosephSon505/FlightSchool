import React from 'react'
import fire from '../../config/fire'
import '../css/Home.css'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.getMenu = this.getMenu.bind(this);
    }

    render() {
        return this.getMenu();
    }

    getMenu() {
        return (
            <Navbar color="light" light expand="md">
                <div className = "container">

                <NavbarBrand href="/home">Flight School</NavbarBrand>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink /* href="/" */ >Blocks</NavLink>
                    </NavItem>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Account
                        </DropdownToggle>

                        <DropdownMenu right>
                            <DropdownItem className="mr-auto">
                            Account Details
                            </DropdownItem>

                            <DropdownItem divider />

                            <DropdownItem onClick={ this.logout }>
                            Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>

                </div>
            </Navbar>
        )
    }

    logout() {
        fire.auth().signOut();
        this.props.history.push("/");
    }
}

export default Home