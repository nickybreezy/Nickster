import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import {NavLink} from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div style={{display: 'flex', overflow: 'scroll initial', float: "left", height: "100vw"}}>
            <CDBSidebar textColor="#fff" backgroundColor="#240208">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{color: '#527141'}}>
                        Menu
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/Player" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="music">Player</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/Library" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="th-large">Library</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/SearchAlbum" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Search Albums</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/Login" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Login</CDBSidebarMenuItem>
                        </NavLink>

                    </CDBSidebarMenu>
                </CDBSidebarContent>


            </CDBSidebar>
        </div>
    );
};

export default Sidebar;