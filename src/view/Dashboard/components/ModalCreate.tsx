import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Grid, TextField } from "@mui/material";

const ModalCreate = () => {
    return (
        <Grid sx={{minWidth: '500px', minHeight: '300px', background:'#fff',  borderRadius:'20px'}}>
            <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', padding: '5px'}} fontSize={23} fontWeight={500}>
                Thêm mới
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', padding: '5px', justifyContent: 'space-around'}} fontSize={23} fontWeight={500}>
                <AccountCircleIcon fontSize='large'/>
                <TextField id="standard-basic" label="user_name" variant="outlined" sx={{width: '80%'}}/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', padding: '5px', justifyContent: 'space-around'}} fontSize={23} fontWeight={500}>
                <AccountCircleIcon fontSize='large'/>
                <TextField id="standard-basic" label="permission" variant="outlined" sx={{width: '80%'}}/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', padding: '5px', justifyContent: 'space-around'}} fontSize={23} fontWeight={500}>
                <Button variant='outlined'>Thêm mới</Button>
            </Box>
        </Grid>
    );
};

export default ModalCreate;