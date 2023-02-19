import { Box, FormControl, Grid, InputLabel, ListSubheader, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";
import MainCard from "ui-component/cards/MainCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import axios from 'utils/axios';
import * as yup from 'yup';
import { NFT, PROJECT } from "_apis/api-endpoint";
import BussinessStamp from "./StampTemplate/BusinessStamp";
import PersonalStamp from "./StampTemplate/PersonalStamp";
import FundStamp from "./StampTemplate/FundStamp";
import RadioRate from "./StampTemplate/RadioRate";
import Web3 from 'web3';
import BigNumber from "bignumber.js";

const wrap = {
    overflowWrap: 'break-word',
    mt: 0.5
}

const validationSchema = yup.object({
    project: yup.string().required('Chọn dự án')
});

const PROJECT_TYPE = {
    BUSINESS: 1,
    FUND: 2,
    PERSONAL: 3
}

export default function IssueStamp() {
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [imageBase64, setImageBase64] = useState('');
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any>({});
    const [radio, setRadio] = useState<any>({});
    const [balance, setBalance] = useState('');

    const MINTER_ADDRESS = "0xD394CF0934dF5b0a0dE17bb2809fba02f5E6B252"; //TO DO

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            project: ''
        },
        validationSchema,
        onSubmit: () => {
            mintNft();
        }
    });

    const getListProjectNotHaveNft = async () => {
        try {
            const { data } = await axios.get(
                PROJECT.NoneOfNft
            );
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (e) { }
    }

    const getProject = async (projectId: string, projectType: string) => {
        const { data } = await axios.get(PROJECT.Detail + `${projectId}?projectType=${projectType}`)
        setSelectedProject(data);
    }

    const mintNft = async () => {
        setLoadingButton(true)
        setLoading(true);
        const data = {
            stampType: selectedProject.projectType,
            owner: selectedProject.ownerAddress,
            project: selectedProject._id,
            image: imageBase64,
            legalRating: radio.legalRating,
            technologyRating: radio.technologyRating,
            socialValue: radio.socialValue,
            communityReputation: radio.communityReputation

        }
        const response = await axios.post(NFT.Issue, data);
        if (response.status === 201) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Cấp NFT thành công',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
            refreshData();
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Cấp NFT thất bại',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
        }
        setLoading(false);
        setLoadingButton(false)
    }

    const handleChangeProject = (event: any) => {
        const project = projects.find((item: any) => item._id === event.target.value);
        if (project) {
            formik.setFieldValue(event.target.name, project._id);
            getProject(project._id, project.projectType);
        }
    }
    const handleGetImageBase64 = (imageBase64: string) => {
        setImageBase64(imageBase64);
    }

    const handleGetRadio = (rating: any) => {
        setRadio(rating);
    }

    const refreshData = () => {
        setImageBase64('');
        setSelectedProject({});
        getListProjectNotHaveNft();
    }

    const isActiveSubmitButton = (): boolean => {
        return selectedProject?._id && imageBase64 && !loading;
    }

    const genMenuItem = (projectType: number) => {
        const filteredProject = projects.filter(project => project.projectType === projectType);
        return filteredProject.map((item: any) =>
            <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
        )
    }

    useEffect(() => {
        getListProjectNotHaveNft();
        getBalanceAddress();
    }, [])

    const getBalanceAddress = async () => {
        let walletAddress = process.env.REACT_APP_MINTER_ADDRESS;

        if (!walletAddress) {
            walletAddress = MINTER_ADDRESS;
        }
        //const web3 = new Web3('https://bsc-dataseed.binance.org'); //mainnet 'https://bsc-dataseed1.binance.org:443' //TO DO
        const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); //testnet

        var balance = await web3.eth.getBalance(walletAddress);

        var convertBalance = new BigNumber(balance as any / Math.pow(10, 18)).toFormat(4);

        setBalance(convertBalance);
    }

    return <>
        <MainCard title="Cấp con dấu NFT">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4} sx={{ mb: 2 }} alignItems="center">
                    <Grid item xs={12} lg={3}>
                        <FormControl sx={{ m: 1, width: '100%' }} size="small">
                            <InputLabel id="project-select">Dự án</InputLabel>
                            <Select
                                labelId="project-select"
                                id="project"
                                name="project"
                                value={formik.values.project}
                                onChange={handleChangeProject}
                                label="project"
                            >
                                <ListSubheader color="primary">
                                    Dự án
                                </ListSubheader>
                                {genMenuItem(PROJECT_TYPE.BUSINESS)}

                                <ListSubheader color="primary">
                                    Qũy đầu tư
                                </ListSubheader>
                                {genMenuItem(PROJECT_TYPE.FUND)}

                                <ListSubheader color="primary">
                                    Cá nhân
                                </ListSubheader>
                                {genMenuItem(PROJECT_TYPE.PERSONAL)}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <AnimateButton>
                                <LoadingButton loading={loadingButton} variant="contained" type="submit" disabled={!isActiveSubmitButton()}>
                                    Cấp NFT
                                </LoadingButton>
                            </AnimateButton>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <InputLabel>Ví tạo NFT</InputLabel>
                        <Box sx={wrap}>{process.env.REACT_APP_MINTER_ADDRESS}</Box>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <InputLabel>Số dư ví</InputLabel>
                        <Box sx={wrap}>{balance} BNB</Box>
                    </Grid>
                </Grid>
            </form>
            {selectedProject?.projectType === 1 &&
                <>
                    <RadioRate handleGetRadio={handleGetRadio} nftInformation={{}} />
                    <BussinessStamp data={selectedProject} handleGetImageBase64={handleGetImageBase64}></BussinessStamp>
                </>}
            {selectedProject?.projectType === 2 &&
                <>
                    <RadioRate handleGetRadio={handleGetRadio} nftInformation={{}} />
                    <FundStamp data={selectedProject} handleGetImageBase64={handleGetImageBase64}></FundStamp>
                </>}
            {selectedProject?.projectType === 3 &&
                <>
                    <RadioRate handleGetRadio={handleGetRadio} nftInformation={{}} />
                    <PersonalStamp data={selectedProject} handleGetImageBase64={handleGetImageBase64}></PersonalStamp>
                </>}
        </MainCard>
    </>

}