import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/AdminDashboard">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/AdminDashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Admin Panal" />
                </ListItemButton>
                <ListItemButton component={Link} to="/editalbum">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith('/editalbum') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Package" />
                </ListItemButton>
                <ListItemButton component={Link} to="/bookingdetail">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/bookingdetail") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Booking Details" />
                </ListItemButton>
                <ListItemButton component={Link} to="/InventoryMnagement">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/InventoryMnagement") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Inventory" />
                </ListItemButton>
                <ListItemButton component={Link} to="/emp">
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/emp") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Employee" />
                </ListItemButton>
                <ListItemButton component={Link} to="/FeedbackOptions">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/FeedbackOptions") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Feedback" />
                </ListItemButton>
                <ListItemButton component={Link} to="/supplierHome">
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/supplierHome") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Supplier" />
                </ListItemButton>
            
                <ListItemButton component={Link} to="/PhotographerHome">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/PhotographerHome") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Photographer" />
                </ListItemButton>
                <ListItemButton component={Link} to="/FinanceManagement">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/FinanceManagement") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Finance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/ViewPayment">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/ViewPayment") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Payment" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBar
