import { Avatar, AvatarGroup, Box, Button, IconButton, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
import Iconify from "src/components/iconify";
import { HEADER } from "src/layouts/dashboard/config-layout";
import { bgBlur } from "src/theme/css";

function Header() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        boxShadow: 'none',
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        width: `calc(100%)`,
        height: HEADER.H_DESKTOP,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: '100%' }}>
        <Stack gap={1} alignItems="center" direction="row">
          <Typography fontWeight={900} variant="h5">Task Boards</Typography>
          <Button variant="text">Edit</Button>
        </Stack>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Calendar" {...a11yProps(1)} />
          <Tab label="Timeline" {...a11yProps(2)} />
          <Tab label="Progress" {...a11yProps(2)} />
        </Tabs>
        <Stack direction="row" gap={2}>
            <AvatarGroup total={24}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
       <IconButton aria-label="fingerprint" color="primary" size="large" sx={{
        border: () => `dashed 1px ${theme.palette.divider}`,
       }}>
            <Iconify icon="eva:plus-fill" />
        </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
 CustomTabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
  };
export default Header;