import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'utils/axios';
// material-ui
import { Box, Button, CardProps, MenuItem, Modal, Select, Stack, Typography } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { NFT } from '_apis/api-endpoint';
// assets
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const extendType = [
    {
        value: "1",
        label: "6 tháng",
    },
    {
        value: "2",
        label: "1 năm",
    }
];

// modal position
function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}
interface BodyProps extends CardProps {
    modalStyle: React.CSSProperties;
    handleClose: () => void;
    value?: string,
    setValue?: React.Dispatch<React.SetStateAction<string>>,
    nftDetails?: any
}
const fetchData = async (url: string, body?: any) => {
    try {
        if (body) {
            await axios.put(url, body);
            return true;
        }
    }
    catch (e) {
        return false;
    }
};
const alertSnackbar = (message: string, color: string, _id: string) => {
    dispatch(openSnackbar({
        open: true,
        message: message,
        variant: 'alert',
        alert: {
            color: color
        },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        close: true,
    }))
    // setTimeout(() => {
    // window.location.href = "/admin/project-stamp";
    // }, 2000);
}
const BodyExtend = React.forwardRef(({ modalStyle, handleClose, nftDetails }:
    BodyProps, ref: React.Ref<HTMLDivElement>) => {

    const navigate = useNavigate();
    const [extendTypeUpdate, setExtendTypeUpdate] = React.useState<string>('1');

    const body = {
        extendNftType: extendTypeUpdate
    }

    const handleExtend = () => {
        fetchData(NFT.Extend + nftDetails._id, body).then(val => {
            if (val) {
                handleClose();
                alertSnackbar('Gia hạn con dấu thành công', 'success', nftDetails._id);
                navigate("/admin/project-stamp", {replace: true});
            }
            else {
                handleClose();
                alertSnackbar('Gia hạn con dấu thất bại', 'error', nftDetails._id)
            }
        }).catch(err => console.log(err))
    }

    const handleSelect = (event: { target: { value: any } }) => {
        const { value } = event.target;
        setExtendTypeUpdate(value);
    };

    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                style={modalStyle}
                sx={{
                    position: 'absolute',
                    width: { xs: 280, lg: 450 },
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                content={false}
            >
                <Box sx={{ padding: '24px' }}>
                    <Typography variant="body1" sx={{ fontWeight: 900, mb: 2 }}>
                        Gia hạn con dấu NFT
                    </Typography>
                    <Select
                        displayEmpty
                        defaultValue="1"
                        name="extendType"
                        id="extendType"
                        fullWidth
                        value={extendTypeUpdate}
                        onChange={handleSelect}
                    >
                        {
                            extendType.map((item, index) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <Box sx={{ justifyContent: "flex-end", alignItems: "center", display: 'flex', p: "18px" }}>
                        <Typography variant="body2" sx={{ color: "red", cursor: "pointer" }} onClick={handleClose}>
                            Hủy
                        </Typography>
                        <Button sx={{ ml: 3 }} variant="contained" type="button" onClick={handleExtend}>
                            Xác nhận
                        </Button>
                    </Box>
                </Box>
            </MainCard>
        </div>
    )
});
// ==============================|| SIMPLE MODAL ||============================== //
export default function ModalExtendNft({ nftDetails }: any) {
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Stack direction="row" justifyContent="flex-start" sx={{ px: 2 }}>
            <Modal open={open} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                {
                    (<BodyExtend
                        modalStyle={modalStyle}
                        handleClose={handleClose}
                        nftDetails={nftDetails}
                    />)
                }
            </Modal>
            <Box>
                <Button
                    startIcon={<ModeEditIcon />}
                    onClick={handleOpen}
                    type="submit" variant="contained">
                    Gia hạn
                </Button>
            </Box>
        </Stack>
    )
}
