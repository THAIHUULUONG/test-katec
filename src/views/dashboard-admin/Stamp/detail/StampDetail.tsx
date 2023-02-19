// material-ui
import {
    Box, Button, CircularProgress, Divider,
    Grid,
    InputLabel,
    TextField
} from '@mui/material';

// project imports
import Moment from 'moment';
import { useParams } from "react-router-dom";
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';

// assets
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';
import { NFT } from '_apis/api-endpoint';
import RadioRate from '../StampTemplate/RadioRate';
import ModalExtendNft from './ModalExtendNft';
import ModalRevokeNft from './ModalRevokeNft';

export default function StampDetail() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [nftDetails, setNftDetails] = useState<any>();
    const [rating, setRating] = useState<any>({});
    const { id } = useParams();

    const _id = id;

    const wrap = {
        overflowWrap: 'break-word',
        mt: 0.5
    }

    //Call when init component
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                NFT.Detail + _id
            );
            setNftDetails(res.data);
            setLoading(false);
        } catch (e) { }
    };

    const updateRating = async () => {
        const { status } = await axios.put(NFT.UpdateRating + nftDetails._id, rating);
        if (status === 200 || status === 201) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Cập nhật thành công',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Cập nhật thất bại',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
        }
    }

    const convertDate = (dateInput: Date) => {
        return Moment(new Date(dateInput)).format('DD-MM-YYYY');
    }

    const handleGetRadio = (rating: any) => {
        setRating(rating);
    };

    const isRatingNotEmpty = () => {
        return rating?.legalRating && rating?.technologyRating && rating?.socialValue && rating?.communityReputation;
    }

    return (
        <div>
            {
                !loading ?
                    <>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MainCard title="Chi tiết con dấu NFT">
                                    <Grid container spacing={3} alignItems="center">
                                        <Grid item xs={12} lg={1}>
                                            {
                                                <img src="/assets/images/stampNFT/NFT1.png" alt="No" />
                                            }
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <h4>NFT Passport of Blockchain</h4>
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <img src="/assets/images/stampNFT/logo-tss.png" alt="No" />
                                            <img src="/assets/images/stampNFT/logo-bas.png" alt="No" />
                                            <img src="/assets/images/stampNFT/logo-vcb.png" alt="No" />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 0.5, mb: 2 }} alignItems="center">
                                        <Grid item xs={12} lg={2}>
                                            <InputLabel>Ngày phát hành</InputLabel>
                                            <Box sx={{ mt: 0.5 }}>{convertDate(nftDetails?.issuedAt)}</Box>
                                        </Grid>
                                        <Grid item xs={12} lg={1}>
                                            <InputLabel>Token ID</InputLabel>
                                            <Box sx={{ mt: 0.5 }}>{nftDetails?.tokenId}</Box>
                                        </Grid>
                                        <Grid item xs={12} lg={5}>
                                            <InputLabel>Contract Address</InputLabel>
                                            <Box sx={wrap}>{nftDetails?.contract}</Box>
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>TX Hash</InputLabel>
                                            <Box sx={wrap}>{nftDetails?.txHash}</Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid container spacing={3} sx={{ mt: 0.5, mb: 2 }} alignItems="center">
                                        <Grid item xs={12} lg={3}>
                                            <TextField
                                                id="expiredAt"
                                                name="expiredAt"
                                                label="Hạn sử dụng"
                                                //value={nftDetails?.expiredAt}  
                                                defaultValue={convertDate(nftDetails?.expiredAt)}
                                                inputProps={
                                                    { readOnly: true, }
                                                }
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={3}>
                                            <ModalExtendNft nftDetails={nftDetails}></ModalExtendNft>
                                        </Grid>
                                        <Grid item xs={12} lg={6} sx={{ textAlign: "right" }}>
                                            <ModalRevokeNft nftDetails={nftDetails}></ModalRevokeNft>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1}>
                                        <Grid item xs={12} lg={12} >
                                            <RadioRate handleGetRadio={handleGetRadio} nftInformation={nftDetails} />
                                        </Grid>
                                        <Grid item xs={12} lg={12} sx={{ textAlign: "right" }}>
                                            <Button variant="contained" size="large" color="success" disabled={!isRatingNotEmpty()}
                                                startIcon={<CheckBoxIcon />} onClick={updateRating}>Cập nhật</Button>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} sx={{ mt: 0.5, mb: 2 }} alignItems="center">
                                        <Grid item xs={12} lg={12} style={{ textAlign: "center" }}>
                                            <img src={nftDetails?.imageId} style={{ width: 1000 }} alt="No"></img>
                                        </Grid>
                                    </Grid>

                                </MainCard>
                            </Grid>
                        </Grid>
                    </>
                    :
                    <CircularProgress />
            }
        </div>

    )
}
