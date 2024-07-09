import React, { useState , useEffect} from 'react';
import { CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton } from '@mui/material';
import { Container, Grid, Paper } from '@mui/material';
import styled from 'styled-components';
import CountUp from 'react-countup';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../src/Components/styles'; // Adjust the path accordingly
import AdminHomePage from './Components/AdminHomePage';
import axios from 'axios';
import { MdComment } from "react-icons/md";




import SideBar from './Components/SideBar';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch bookings
        axios.get("http://localhost:8070/Bookingdetail/getcontactdetails")
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
                 

    }, []);
    useEffect(() => {
        // Fetch feedbacks
        axios.get("http://localhost:8070/api/CustomerAffairs")
            .then((res) => {
                setFeedbacks(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);


    const toggleDrawer = () => {
        setOpen(!open);
    };

    const styles = {
        boxStyled: {
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        toolBarStyled: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
        },
        drawerStyled: {
            display: "flex"
        },
        hideDrawer: {
            display: 'flex',
            '@media (max-width: 600px)': {
                display: 'none',
            },
        },
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <SideBar />
                    </List>
                </Drawer>
                <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3} lg={3}>
                            <StyledPaper>
                               <MdComment />
                                <img  src="Images/hotel-booking-date.png" alt="Bookings" />
                                <Title>Booking</Title>
                                <Data start={0} duration={2.5} end={bookings.length} />
                            </StyledPaper>
                        </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src="Images/office-staff.png" alt="Staffs" />
                            <Title>
                                Staffs
                            </Title>
                            <Data start={0}  duration={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img  src="Images/feedback.png" alt="Feedbacks" />
                            <Title>
                                feedback
                            </Title>
                            <Data start={0}  duration={2.5} end={feedbacks.length} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img  src="Images/growth.png" alt="Revenue" />
                            <Title>
                                  Revenue
                            </Title>
                            <Data start={0} end={23000} duration={2.5} prefix="$" />                        </StyledPaper>
                    </Grid>
                    
                    </Grid>
                </Container>
                
            </Box>
        </>
    );
};

const StyledPaper = styled(Paper)`
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;

const Title = styled.p`
    font-size: 1.25rem;
`;

const Data = styled(CountUp)`
    font-size: calc(1.3rem + .6vw);
    color: green;
`;

export default AdminDashboard;