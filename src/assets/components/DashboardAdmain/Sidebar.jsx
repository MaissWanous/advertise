import { useState } from "react"; // useState is not strictly needed for this specific selection logic, but kept if other state is planned
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartBar, faUserCog,
    faCog,
    faCreditCard
} from '@fortawesome/free-solid-svg-icons';

export default function Sidbar() {
    const location = useLocation();


    const isActive = (path) => location.pathname === path;

    return (
        <>
            <Box sx={{
                ".pro-sidebar-inner": {
                    backgroundColor: "#0d1f44",
                    color: "#fff",
                    height: "100vh",
                    paddingTop:"40px"
                },
                 ".pro-inner-item": {
                    padding: "25px 35px 25px 20px !important",
                      boxShadow: "0px 9px 19px -23px !important", 
                }
            }}>
                <ProSidebar>
                    <Menu>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faChartBar} />}
                            component={<Link to="/statistics" />}
                            active={isActive("/statistics")}
                        >
                            Statistics
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faUserCog} />}
                            component={<Link to="/admin-settings" />}
                            active={isActive("/admin-settings")}
                        >
                            Administrative settings
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faCog} />}
                            component={<Link to="/general-settings" />}
                            active={isActive("/general-settings")}
                        >
                            General settings
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faCreditCard} />}
                            component={<Link to="/pay-settings" />}
                            active={isActive("/pay-settings")}
                        >
                            Pay settings
                        </MenuItem>
                    </Menu>
                </ProSidebar>
            </Box>
        </>
    );
}
