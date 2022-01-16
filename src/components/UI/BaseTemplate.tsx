import { AppBar, Box, Toolbar } from '@material-ui/core';
import React, { ReactElement, ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

type BaseTemplateProps = {
  children: ReactElement | ReactNode | null;
  onShowForm: () => void;
};

const BaseTemplate = ({ children, onShowForm }: BaseTemplateProps) => {
    return (<div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
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
          <AddCircle/>
        </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    {children}
    </div>
  );
};

export default BaseTemplate;
