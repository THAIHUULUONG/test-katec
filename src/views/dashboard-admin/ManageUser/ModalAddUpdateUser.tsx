// material-ui
import { Alert, Button, Collapse, Dialog, DialogActions, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { AUTH_API } from '_apis/api-endpoint';
import { GetRole } from 'hooks/fetchDataAll';
import { useState } from 'react';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function ModalAddUpdateUser({ title, open, handleClose, handleAlert}: Props) {

    const { dataRole, loading } = GetRole()
    console.log('dataRole', dataRole);

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
          localStorage.setItem('status', 'Thành công');
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
                            <TextField id="outlined-basic" label="Tài khoản" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setUsername(e.target.value)} />
                            <TextField id="outlined-basic" label="Tên người dùng" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setUser_account(e.target.value)} />
                            <TextField id="outlined-basic" label="Mật khẩu" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setPassword(e.target.value)} />
                            <FormControl sx={{ width: '90%' }}>
                                <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
                                <Select
                                    id="select-basic"
                                    value={role}
                                    label="Vai trò"
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
                                Hủy bỏ
                            </Button>
                            <Button disabled={username === '' || password === '' || role === ''} variant="contained" size="small" onClick={handleCreate} autoFocus>
                                Thêm
                            </Button>
                        </DialogActions>
                    </FormControl>
                </>
            )}
        </Dialog>
    );
}
