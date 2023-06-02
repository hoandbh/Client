import { NavLink } from "react-router-dom"
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { Button, Divider, Toolbar, Box, SvgIcon, Typography, Tooltip,IconButton, Menu, MenuItem } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { AuthContext } from "../context/authContext"
import LogoutDialog from "./LogoutDialog";

const Tab1 = ({ path, icon, text }) => {
  return (
    <Button style={{ color: 'gray' }} component={NavLink} to={path} startIcon={icon}>
      <Typography textAlign="center" sx={{ fontFamily: 'monospace' }}>{text}</Typography>
    </Button>
  )
}

const Tab = ({ path, icon, text }) => {
  return (
    // <Button
    //   style={{ color: 'gray' }}
    //   component={NavLink}
    //   to={path}
    // >
    //   <Box
    //     style={{ color: 'gray' }}
    //     component="div"
    //     border={1}
    //     borderRadius={4}
    //     p={1}
    //   >
    //     {icon}
    //   </Box>
    // </Button>
    // <Button component={Link} to="/" color="inherit">Home</Button>
    // <SvgIcon >
    //   <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    // </SvgIcon>
    <Tooltip title = {text}>

    <Button
      component={NavLink}
      to={path}
      sx={{
        minWidth: '40px',
        height: '40px',
        margin: '2px',
        //paddingLeft: '1px',
        //paddingRight: '1px',
        color: 'rgb(62, 80, 96)',
        border: '1px solid rgb(224, 227, 231)',
        borderRadius: '10px',
        '&:hover': {
          background: 'rgb(231, 235, 240)',
          borderColor: 'rgb(205, 210, 215)',
        },
      }}
    >
      <SvgIcon >
        {icon}
      </SvgIcon>
    </Button>
    </Tooltip>


  )
}

const TeacherNav = () => {
  return <>
    <Tab path='/questionnaires' icon={<ListIcon />} text='questionnaires' />
    <Tab path='/questionnaire/new' icon={<AddIcon />} text='create questionnaire' />
    <Tab path='/statistic' icon={<BarChartIcon />} text='statistic' />
    <Tab path='/courses' icon={<SchoolIcon />} text='courses' />
  </>
}

const AdminNav = () => {
  return <>
    <Tab path='/courses' icon={<SchoolIcon />} text='Courses' />
  </>
}

const UnidentifiedUserNav = () => {
  return <>
    <Tab path='/login' icon={<LockIcon />} text='Login' />
    <Tab path='/register' icon={<PersonAddIcon />} text='Register' />
  </>
}


const Nav = () => {

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { currentUser } = useContext(AuthContext);
  const [permission, setPermission] = useState(currentUser?.permission || 0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setPermission(currentUser?.permission || 0);
    setUserName(`${currentUser?.firstName} ${currentUser?.lastName}`);
  }, [currentUser])

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    handleCloseUserMenu();
    setOpen(true);
  }
  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          marginTop: 0,
          marginBottom: 4,
          maxHeight: '70px',
          height: '70px',
          minHeight: '70px',
        }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            position: 'sticky',
            maxHeight: '70px',
            height: '70px',
            minHeight: '70px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Tab path='/' icon={<HomeIcon />} text='home' />
            {
              (() => {
                switch (permission) {
                  case 1:
                    return <TeacherNav />
                  case 2:
                    return <AdminNav />
                  default:
                    return <UnidentifiedUserNav />
                }
              })()
            }
          </Box>

          {currentUser &&
            <Box
            //width={150}
            // sx={{ 
            //   display: 'flex' 
            // }}
            >
              <AccountCircle style={{ fontSize: 35, color: 'gray', paddingTop: 5 }} onClick={handleLogout} />
              <Typography variant="body2" color='gray'>
                {userName}
              </Typography>
            </Box>
          }
        </Toolbar>
        <Divider></Divider>
      </Box>

      <LogoutDialog open={open} setOpen={setOpen} />
    </>
  );
}
export default Nav
