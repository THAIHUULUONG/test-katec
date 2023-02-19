// material-ui
import { Alert, Button, Collapse, Dialog, DialogActions, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { AUTH_API } from '_apis/api-endpoint';
import { GetRole } from 'hooks/fetchDataAll';
import React, { useState } from 'react';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
    dataGroupClass: any;
    id_group: any;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function ModalAddUpdateGroupClass({ title, open, handleClose, handleAlert, dataGroupClass, id_group}: Props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [permission, setPermission] = useState('...');
    const [user_account, setUser_account] = useState('');

    React.useEffect(() => {
        setRole(dataGroupClass?.id_role);
        setUsername(dataGroupClass?.user_name);
        setPassword(dataGroupClass?.user_password);
        setPermission(dataGroupClass?.permission);
        setUser_account(dataGroupClass?.user_account);
    }, [dataGroupClass]);

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
                            <TextField id="outlined-basic" value={username} label="Tài khoản" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setUsername(e.target.value)} />
                            <TextField id="outlined-basic" value={user_account} label="Tên người dùng" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setUser_account(e.target.value)} />
                            <TextField id="outlined-basic" value={password} label="Mật khẩu" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setPassword(e.target.value)} />
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
