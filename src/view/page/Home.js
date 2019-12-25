import React from 'react'
import '../css/Home.css'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, 
    DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane } from 'reactstrap'
import fire from '../../config/fire'
import classnames from 'classnames'
import Blocks from './Blocks'
import Team from './Team'
import Welcome from './Welome'
import RPE from './RPE'

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: 'welcome'
        }

        this.logout = this.logout.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.getBody = this.getBody.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
    }

    render() {
        return (
            <div>
                {this.getMenu()}
                {this.getBody()}
            </div>
        )
    }

    logout() {
        fire.auth().signOut();
        this.props.history.push("/");
    }

    getMenu() {
        return (
            <Navbar color="light" light expand="md">
                <div className = "container">

                <NavbarBrand href="/home">Flight School</NavbarBrand>

                <Nav className="ml-auto" navbar>
                    <NavItem> <NavLink href="/guide" className="mr-5">Guide</NavLink> </NavItem>

                    <NavItem> <NavLink href="/about" className="mr-5">About</NavLink> </NavItem>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>Account</DropdownToggle>

                        <DropdownMenu right>
                            <DropdownItem>Account Details</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={ this.logout }>Logout</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>

                </div>
            </Navbar>
        )
    }

    getBody() {
        return (
            <div className="container mt-5">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.tab === 'welcome' })} onClick={() => { this.toggleTab("welcome") }}>
                        Welcome
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className={classnames({ active: this.state.tab === 'blocks' })} onClick={() => { this.toggleTab("blocks") }}>
                        Blocks
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className={classnames({ active: this.state.tab === 'RPE' })} onClick={() => { this.toggleTab("RPE") }}>
                        RPE Chart
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className={classnames({ active: this.state.tab === 'team' })} onClick={() => { this.toggleTab("team") }}>
                        Team
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.tab}>
                    <TabPane tabId="welcome">   <Welcome /> </TabPane>
                    <TabPane tabId="blocks">    <Blocks />  </TabPane>
                    <TabPane tabId="RPE">       <RPE />     </TabPane>
                    <TabPane tabId="team">      <Team />        </TabPane>
                </TabContent>
            </div>
        )
    }

    toggleTab(newTab) {
        this.setState({
            tab: newTab
        });
    }
}

export default Home