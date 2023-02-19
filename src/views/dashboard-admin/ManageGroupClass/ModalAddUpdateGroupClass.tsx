// material-ui
import { Alert, Button, Collapse, Dialog, DialogActions, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { AUTH_API } from '_apis/api-endpoint';
import { GetRole } from 'hooks/fetchDataAll';
import React, { useState } from 'react';
import { dispatch } from 'store';
import { getGroupClassList } from 'store/slices/allUser';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
    group_name: any;
    id_group: any;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function ModalAddUpdateGroupClass({ title, open, handleClose, handleAlert, group_name, id_group}: Props) {

    const [groupName, setGroupName] = useState('');

    React.useEffect(() => {
        setGroupName(group_name);
    }, [group_name]);

    const handleUpdate = async () => {
        const response = await axios.post(`${AUTH_API.UpdateClassGroup}?id_group=${id_group}&group_name=${groupName}`);
        if (response.data.status === true) {
          handleClose(true)
          handleAlert(true)
          dispatch(getGroupClassList());
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
                            <TextField id="outlined-basic" value={groupName} label="Tài Nhóm" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setGroupName(e.target.value)} />
                        </Grid>
                        <DialogActions sx={{ mr: 2 }}>
                            <Button onClick={() => handleClose(false)} color="error">
                                Hủy bỏ
                            </Button>
                            <Button disabled={groupName === '' || groupName === group_name} variant="contained" size="small" onClick={handleUpdate} autoFocus>
                                Thêm
                            </Button>
                        </DialogActions>
                    </FormControl>
                </>
            )}
        </Dialog>
    );
}
