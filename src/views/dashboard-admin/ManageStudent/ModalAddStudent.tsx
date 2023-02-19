// material-ui
import { Button, Dialog, DialogActions, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { AUTH_API } from '_apis/api-endpoint';
import { useState } from 'react';
import { dispatch } from 'store';
import { getStudentList, getUsersList } from 'store/slices/allUser';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
    dataClassRoom: any;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function ModalAddUpdateStudent({ title, open, handleClose, handleAlert, dataClassRoom}: Props) {
    console.log('dataClassRoom', dataClassRoom);
    
    const [studentName, setStudentName] = useState('');
    const [studentGender, setStudentGender] = useState('');
    const [idClass, setIdClass] = useState('');
    const [studentBirthday, setStudentBirthday] = useState('...');

    const handleChange = (event: SelectChangeEvent) => {
        setIdClass(event.target.value);
    };

    const handleCreate = async () => {
        // const response = await axios.post(`${AUTH_API.CreateStudent}?student_name=${studentName}&student_gender=${studentGender}&student_birthday=${studentBirthday}&id_class=${idClass}`);
        const response = await axios.post(`${AUTH_API.CreateStudent}?student_name=${studentName}&student_gender=1&student_birthday=1&id_class=${idClass}`);
        if (response.data.status === true) {
          handleClose(true)
          handleAlert(true)
          dispatch(getStudentList());
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
                            <TextField value={studentName} id="outlined-basic" label="Tên học sinh" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setStudentName(e.target.value)} />
                            <TextField value={studentGender} id="outlined-basic" label="Giới tính" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setStudentGender(e.target.value)} />
                            <TextField value={studentBirthday} type='date' id="outlined-basic" label="Ngày sinh" variant="outlined" sx={{ width: '90%' }} onChange={(e) => setStudentBirthday(e.target.value)} />
                            <FormControl sx={{ width: '90%' }}>
                                <InputLabel id="demo-simple-select-label">Lớp học</InputLabel>
                                <Select
                                    id="select-basic"
                                    value={idClass}
                                    label="Chức vụ"
                                    onChange={handleChange}
                                >
                                    {dataClassRoom.map((items: any) => (
                                        <MenuItem value={items.id} >{items.class_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <DialogActions sx={{ mr: 2 }}>
                            <Button onClick={() => handleClose(false)} color="error">
                                Hủy bỏ
                            </Button>
                            <Button disabled={studentName === ''} variant="contained" size="small" onClick={handleCreate} autoFocus>
                                Thêm
                            </Button>
                        </DialogActions>
                    </FormControl>
                </>
            )}
        </Dialog>
    );
}
