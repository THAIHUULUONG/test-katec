// material-ui
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { AUTH_API } from '_apis/api-endpoint';
import { dispatch } from 'store';
import { getRoleList } from 'store/slices/allUser';
import axios from 'utils/axios';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    handleAlert: (status: boolean) => void;
    id_role: number;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function AlertItemDeleteRole({ title, open, handleClose, handleAlert, id_role }: Props) {

    const handleDelete = async () => {
        const response = await axios.post(`${AUTH_API.DeleteRole}?id_role=${id_role}`);
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
                    <DialogTitle id="item-delete-title">{title} - Bạn chắc chắn muốn xóa?</DialogTitle>
                    <DialogActions sx={{ mr: 2 }}>
                        <Button onClick={() => handleClose(false)} color="error">
                            Cancel
                        </Button>
                        <Button variant="contained" size="small" onClick={handleDelete} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}
