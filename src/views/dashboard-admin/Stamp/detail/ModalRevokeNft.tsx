import React from 'react';
// material-ui
import { Button, Modal, Typography, CardProps, Stack, Box } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// assets
import { useTheme } from '@mui/material/styles';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'utils/axios';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
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
    value?:string,
    setValue?:React.Dispatch<React.SetStateAction<string>>,
    nftDetails?:any
}
const fetchData = async (url:string,body?:any) => {
    try {
        if(body) {       
            const res = await axios.post(url,body);            
            return res;       
        }
    }
    catch (e) {       
        return false;
    }      
};
const alertSnackbar = (message:string,color:string)=>{
    dispatch( openSnackbar({
        open: true,
        message: message,
        variant: 'alert',
        alert: {
            color: color
        },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        close: true,
    }))
} 

const BodyApprove = React.forwardRef(({ modalStyle, handleClose, nftDetails }: 
    BodyProps, ref: React.Ref<HTMLDivElement>) => {
    const body = {
        projectType: nftDetails.stampType, 
        nftId: nftDetails._id 
    }
    const handleRevoke = () => {
    fetchData(`nft/revoke`,body).then((val) => { 
        console.log(val);
        if (val && (val.status === 200 || val.status === 201)) {
            handleClose();
            alertSnackbar('Thu hồi con dấu thành công','success');
            setTimeout(() => {
                window.location.href="/admin/project-stamp";     
            }, 2000); 
        }
        else {
            handleClose();
            alertSnackbar('Thu hồi con dấu thất bại','error')
        }       
    }).catch(err=>console.log(err))
   } 
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
            // title="Bạn có chắc chắn muốn xác nhận hồ sơ này?"
            content={false}
        >            
            <Box sx={{padding:'24px'}}>
                <Typography variant="body1" sx={{fontWeight:900}}>
                    Bạn có chắc chắn muốn thu hồi con dấu NFT ?
                </Typography>            
                <Box sx={{justifyContent:"flex-end",alignItems:"center",display:'flex',p:"18px"}}>
                    <Typography variant="body2" sx={{color:"red",cursor:"pointer"}} onClick={handleClose}>
                        Hủy
                    </Typography>  
                    <Button sx={{ml:3}} variant="contained" type="button" onClick={handleRevoke}>
                        Xác nhận
                    </Button>
                </Box>
            </Box>
        </MainCard>
    </div>
   )
});
// ==============================|| SIMPLE MODAL ||============================== //
export default function ModalRevokeNft({nftDetails}:any) {
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [checktype] =React.useState<string>();
    const handleOpen = () => {     
        console.log('open')   
        setOpen(true);      
        //Setchecktype(e);
    };
    const handleClose = () => {
        setOpen(false);
    };
    console.log(checktype)
    return (
    <Stack direction="row" justifyContent="flex-end"sx={{px:2}}>   
        <Modal open={open} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            { 
                (<BodyApprove 
                    modalStyle={modalStyle} 
                    handleClose={handleClose} 
                    nftDetails={nftDetails} 
                />)
            }
        </Modal> 
        <Box> 
            <Button 
                startIcon={<ClearOutlinedIcon />}  
                onClick={handleOpen} 
                variant="contained" type="submit"  
                sx={{ background: theme.palette.error.main, 
                    '&:hover': { background: theme.palette.error.dark },
                    mt: 1 }}>
                Thu hồi con dấu    
            </Button>
        </Box>
    </Stack>
    )
}
