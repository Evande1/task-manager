import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import React, {
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Typography } from '@mui/material';
import { AddCircle, TaskAlt } from '@mui/icons-material';
import { Link } from "react-router-dom";

type BaseTemplateProps = {
  children: ReactElement | ReactNode | null;
  onShowForm: () => void;
};

const BaseTemplate = ({ children, onShowForm }: BaseTemplateProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (bool: boolean) => {
    setOpenDrawer(bool);
  };

  const drawerList = [
    { text: 'home', icon: <TaskAlt />, link: "/" },
    { text: 'urgent', icon: <TaskAlt />, link: "/urgent"},
    { text: 'current', icon: <TaskAlt /> , link: "/current"},
    { text: 'optional', icon: <TaskAlt />, link: "/optional" },
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={(e) => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            <IconButton
              size="small"
              color="inherit"
              aria-label="menu"
              onClick={onShowForm}
            >
              <AddCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={(e) => toggleDrawer(false)}
          onClick={(e) => toggleDrawer(false)}
        >
          <List>
            {drawerList.map((item,index) => {
              const {text, icon, link} = item;
              return (<Link to={link}>
              <ListItem button key={text}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text}/>
              </ListItem></Link>);
            })}
          </List>
        </Drawer>
      </Box>
      {children}
    </div>
  );
};

export default BaseTemplate;
