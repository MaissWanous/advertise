import { useState } from "react"; // useState is not strictly needed for this specific selection logic, but kept if other state is planned
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartBar, faUserCog,
    faCog,
    faCreditCard
} from '@fortawesome/free-solid-svg-icons';
const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon}>
            <Typography>
                {title}
            </Typography>
            <Link to={to}></Link>
        </MenuItem>
    )
}
export default function Sidbar() {
    const [selected, setSelected] = useState("Statistics")
    return (
        <>
            <Box sx={{
                ".pro-sidebar-inner": {
                    backgroundColor: "#0d1f44",
                    color: "#fff",
                    height: "100%",
                    paddingTop: "40px"
                },
                ".pro-inner-item": {
                    padding: "25px 35px 25px 20px !important",
                    boxShadow: "0px 9px 19px -23px !important",
                },
                ".pro-inner-item:hover": {
                    backgroundColor: '#1a3a6b',
                },
                ".pro-menu-item.active": {
                    backgroundColor: '#1a3a6b!important',
                }
            }}>
                <ProSidebar>
                    <Menu>
                        <Box>
                            <Item 
                            title="Statistics"
                            to="/DashbordAdmin/statistics"
                             icon={<FontAwesomeIcon icon={faChartBar} />}
                             selected={selected}
                             setSelected={setSelected}
                            />
                             <Item 
                            title="Administrative settings"
                            to="/DashbordAdmin/Administrative"
                            icon={<FontAwesomeIcon icon={faUserCog} />}
                             selected={selected}
                             setSelected={setSelected}
                            />
                             <Item 
                            title="General settings"
                            to="/DashbordAdmin/General"
                              icon={<FontAwesomeIcon icon={faCog} />}
                             selected={selected}
                             setSelected={setSelected}
                            />
                             <Item 
                            title="Pay settings"
                            to="/DashbordAdmin/Pay"
                              icon={<FontAwesomeIcon icon={faCreditCard} />}
                             selected={selected}
                             setSelected={setSelected}
                            />
                        </Box>
                   
                    </Menu>
                </ProSidebar>
            </Box>
        </>
    );
}
