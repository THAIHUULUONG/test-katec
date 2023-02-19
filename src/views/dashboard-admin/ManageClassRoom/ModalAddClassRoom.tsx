// material-ui
import { Button, Dialog, DialogActions, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { AUTH_API } from '_apis/api-endpoint';
import { useState } from 'react';
import { dispatch } from 'store';
import { getClassRoomList, getUsersList } from 'store/slices/allUser';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
    dataGroupClass: any;
    dataUser: any;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function ModalAddClassRoom({ title, open, handleClose, handleAlert, dataGroupClass, dataUser}: Props) {

    const [clasSName, setClassName] = useState('');
    const [idGroup, setIdGroup] = useState('');
    const [idUser, setIdUser] = useState('');
 
    const handleChangeGroup = (event: SelectChangeEvent) => {
        setIdGroup(event.target.value);
    };
    const handleChangeUser = (event: SelectChangeEvent) => {
        setIdUser(event.target.value);
    };

    const handleCreate = async () => {
        const response = await axios.post(`${AUTH_API.CreateClassRoom}?class_name=${clasSName}&id_group=${idGroup}&id_user=${idUser}`);
        if (response.data.status === true) {
          handleClose(true)
          handleAlert(true)
          dispatch(getClassRoomList());
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
                            <TextField id="outlined-basic" label="Tên lớp" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setClassName(e.target.value)} />
                            <FormControl sx={{ width: '90%' }}>
                                <InputLabel id="demo-simple-select-label">Nhóm lớp</InputLabel>
                                <Select
                                    id="select-basic"
                                    value={idGroup}
                                    label="Nhóm lớp"
                                    onChange={handleChangeGroup}
                                >
                                    {dataGroupClass.map((items: any) => (
                                        <MenuItem value={items.id} >{items.group_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: '90%' }}>
                                <InputLabel id="demo-simple-select-label">Người dùng</InputLabel>
                                <Select
                                    id="select-basic"
                                    value={idUser}
                                    label="Người dùng"
                                    onChange={handleChangeUser}
                                >
                                    {dataUser.map((items: any) => (
                                        <MenuItem value={items.id} >{items.user_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <DialogActions sx={{ mr: 2 }}>
                            <Button onClick={() => handleClose(false)} color="error">
                                Hủy bỏ
                            </Button>
                            <Button disabled={clasSName === '' || idGroup === '' || idUser === ''} variant="contained" size="small" onClick={handleCreate} autoFocus>
                                Thêm
                            </Button>
                        </DialogActions>
                    </FormControl>
                </>
            )}
        </Dialog>
    );
}
