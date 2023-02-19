// material-ui
import { Alert, Button, Collapse, Dialog, DialogActions, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { AUTH_API } from '_apis/api-endpoint';
import { GetRole } from 'hooks/fetchDataAll';
import React, { useState } from 'react';
import { dispatch } from 'store';
import { getRoleList } from 'store/slices/allUser';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
    id_role: any;
    role_name: any;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function ModalAddUpdateRole({ title, open, handleClose, handleAlert, id_role, role_name}: Props) {

    const [role, setRole] = useState('');
    React.useEffect(() => {
        setRole(role_name)
    }, [role_name]);

    

    const handleCreate = async () => {
        const response = await axios.post(`${AUTH_API.UpdateRole}?id_role=${id_role}&role_name=${role}`);
        if (response.data.status === true) {
          handleClose(true)
          handleAlert(true)
          dispatch(getRoleList());
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
                            <TextField id="outlined-basic" value={role} label="Tên chức vụ" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setRole(e.target.value)} />
                        </Grid>
                        <DialogActions sx={{ mr: 2 }}>
                            <Button onClick={() => handleClose(false)} color="error">
                                Hủy bỏ
                            </Button>
                            <Button disabled={role === '' || role === role_name} variant="contained" size="small" onClick={handleCreate} autoFocus>
                                Thêm
                            </Button>
                        </DialogActions>
                    </FormControl>
                </>
            )}
        </Dialog>
    );
}
