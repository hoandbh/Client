import { NavLink, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from 'react'

import { Button, Tooltip, Menu, Toolbar, Box, AppBar, Typography, IconButton, MenuItem } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { AuthContext } from "../context/authContext"
import LogoutDialog from "./LogoutDialog";


const Tab = ({ path, icon, text }) => {
  return (
    <Button style={{ color: 'white' }} component={NavLink} to={path} startIcon={icon}>
      <Typography textAlign="center" sx={{ fontFamily: 'monospace' }}>{text}</Typography>
    </Button>
  )
}

const TeacherNav = () => {
  return <>
    <Tab path='/questionnaires' icon={<ListIcon />} text='questionnaires' />
    <Tab path='/questionnaire/new' icon={<AddIcon />} text='create questionnaire' />
    <Tab path='/statistic' icon={<BarChartIcon />} text='statistic' />
    <Tab path='/courses' icon={<SchoolIcon />} text='courses' />
    <Tab path='/upload' icon={<AddIcon />} text='upload' />
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

  useEffect(() => {
  }, [permission])

  useEffect(() => {
    setPermission(currentUser?.permission || 0);
  }, [currentUser])

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    handleCloseUserMenu();
    setOpen(true);
  }

  return (
    <>
      <LogoutDialog open={open} setOpen={setOpen} />
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', 'justifyContent': 'space-between' }}>
          <Box>
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

          {currentUser && <Box >
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircle style={{ fontSize: 40, color: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">{'logout'}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          }

        </Toolbar>
      </AppBar>
    </>
  );
}
export default Nav

