// material-ui
import { Button, Dialog, DialogActions, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { AUTH_API } from '_apis/api-endpoint';
import { useState } from 'react';
import { dispatch } from 'store';
import { getUsersList } from 'store/slices/allUser';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
    dataRole: any;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function ModalAddUser({ title, open, handleClose, handleAlert, dataRole}: Props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [permission, setPermission] = useState('...');
    const [user_account, setUser_account] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    };

    const handleCreate = async () => {
        const response = await axios.post(`${AUTH_API.CreateUser}?user_name=${username}&id_role=${role}&permission=${permission}&user_password=${password}&user_account=${user_account}`);
        if (response.data.status === true) {
          handleClose(true)
          handleAlert(true)
          dispatch(getUsersList());
        } else {
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            keepMounted
            maxWidth="xs"
            aria-labelledby="item-delete-title"
            aria-describedby="item-delete-description"
        >
            {open && (
                <>
                    <DialogTitle align='center' id="item-delete-title">{title}</DialogTitle>
                    <FormControl>
                        <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', minWidth: '400px' }}>
                            <TextField id="outlined-basic" label="T??i kho???n" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setUsername(e.target.value)} />
                            <TextField id="outlined-basic" label="T??n ng?????i d??ng" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setUser_account(e.target.value)} />
                            <TextField id="outlined-basic" label="M???t kh???u" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setPassword(e.target.value)} />
                            <FormControl sx={{ width: '90%' }}>
                                <InputLabel id="demo-simple-select-label">Ch???c v???</InputLabel>
                                <Select
                                    id="select-basic"
                                    value={role}
                                    label="Ch???c v???"
                                    onChange={handleChange}
                                >
                                    {dataRole.map((items: any) => (
                                        <MenuItem value={items.id} >{items.role_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <DialogActions sx={{ mr: 2 }}>
                            <Button onClick={() => handleClose(false)} color="error">
                                H???y b???
                            </Button>
                            <Button disabled={username === '' || password === '' || role === ''} variant="contained" size="small" onClick={handleCreate} autoFocus>
                                Th??m
                            </Button>
                        </DialogActions>
                    </FormControl>
                </>
            )}
        </Dialog>
    );
}
