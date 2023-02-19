// material-ui
import { Button, Dialog, DialogActions, DialogTitle, FormControl, Grid, TextField } from '@mui/material';
import { AUTH_API } from '_apis/api-endpoint';
import { useState } from 'react';
import { dispatch } from 'store';
import { getRoleList } from 'store/slices/allUser';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function ModalAddRole({ title, open, handleClose, handleAlert}: Props) {

    const [role, setRole] = useState('');

    const handleCreate = async () => {
        const response = await axios.post(`${AUTH_API.CreateRole}?role_name=${role}`);
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
                            <TextField id="outlined-basic" label="Tên chức vụ" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setRole(e.target.value)} />
                        </Grid>
                        <DialogActions sx={{ mr: 2 }}>
                            <Button onClick={() => handleClose(false)} color="error">
                                Hủy bỏ
                            </Button>
                            <Button disabled={role === ''} variant="contained" size="small" onClick={handleCreate} autoFocus>
                                Thêm
                            </Button>
                        </DialogActions>
                    </FormControl>
                </>
            )}
        </Dialog>
    );
}
