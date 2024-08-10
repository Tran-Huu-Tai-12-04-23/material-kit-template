import { useTheme } from "@emotion/react";
import { Box, Button, ButtonGroup, Stack, TextField, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import { HEADER } from "src/layouts/dashboard/config-layout";
import { bgBlur } from "src/theme/css";

function Filter() {
      const theme = useTheme();


    return     <Box
      sx={{
        boxShadow: 'none',
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        width: `calc(100%)`,
        height: HEADER.H_DESKTOP /2,
      }}
     >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: '100%',  width: '100%' }}>
            <Stack direction="row" gap={2}>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button variant="outlined"><Iconify icon="eva:board-fill" />  Board</Button>
                <Button variant="outlined"> <Iconify icon="eva:list-fill" />  List</Button>
            </ButtonGroup>
            <Button variant="text" >
               <Stack direction="row" alignItems="center" gap={1}> <Iconify icon="eva:lock-fill" color="gray"/>
                <Typography variant="h7" color="gray">Limited Access</Typography>
                <Iconify icon="eva:arrow-ios-downward-fill" color="gray"/></Stack>
            </Button>
            </Stack>
             <Stack direction="row" gap={2}>
                <TextField  label="" type="search" size="small" placeholder="Search ..."/>
           
                <Stack direction="row" alignItems="center" gap={1}>
                    <Button variant="outlined" sx={{padding: 1, borderColor: 'gray'}} > <Iconify  color='gray' icon="eva:list-fill" />  </Button>
                    <Button variant="outlined"  sx={{padding: 1, borderColor: 'gray'}}> <Iconify color='gray' icon="eva:list-fill" />  </Button>
                    <Button variant="outlined"  sx={{padding: 1,  borderColor: 'gray'}}> <Iconify   color='gray' icon="eva:list-fill" />  </Button>
                    <Button variant="outlined"  sx={{padding: 1,  borderColor: 'gray'}}> <Iconify   color='gray' icon="eva:list-fill" />  </Button>
                </Stack>
             </Stack>

        </Stack>

     </Box>
}

export default Filter;