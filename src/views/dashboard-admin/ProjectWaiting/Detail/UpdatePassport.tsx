import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import BussinessStamp from "views/dashboard-admin/Stamp/StampTemplate/BusinessStamp";
import FundStamp from "views/dashboard-admin/Stamp/StampTemplate/FundStamp";
import PersonalStamp from "views/dashboard-admin/Stamp/StampTemplate/PersonalStamp";
import axios from 'utils/axios';
import { CircularProgress } from '@mui/material';

const FIELD_NEED_UPDATE_PASSPORT_PERSONAL = [
    'name',
    'nationality',
    'gender',
    'birthday',
    'placeOfBirth',
    'identity',
    'portrait'
];
const FIELD_NEED_UPDATE_PASSPORT_FUND = [
    'name',
    'createdAt',
    'officeAddress',
    'businessAreas',
    'contactRepresentative',
];
const FIELD_NEED_UPDATE_PASSPORT_BUSSINESS = [
    'name',
    'contracts',
    'symbol',
    'incorporationAddress',
    'placeOfBirth',
    'identity'
];

export default function UpdatePassport(props: { [x: string]: any; projectData: any; }) {

    const { projectData } = props;

    // const [imageBase64, setImageBase64] = useState('');
    const [projectInformation] = useState(projectData);
    const [fieldChangedData] = useState(projectData.fieldChanged);
    const [loading, setLoading] = useState(true);
    const [check, setCheck] = useState<boolean>(false)
    const search = window.location.search;
    const applicationId = new URLSearchParams(search);
    const params = new URLSearchParams(search);
    const id = applicationId.get('_id');
    const projectType = params.get('projectType');
    console.log(projectType)

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/project/checkNft/${id}?projectType=${projectType}`,
            );
            console.log("date ne: " + res.data)
            setCheck(res.data)
            setLoading(false);
        } catch (e) { }
    };

    const hasFieldChangeNeedUpdatePassport = () => {
        let listFieldUpdate: any[] = [];
        switch (projectInformation.projectType) {
            case 1: listFieldUpdate = FIELD_NEED_UPDATE_PASSPORT_BUSSINESS; break;
            case 2: listFieldUpdate = FIELD_NEED_UPDATE_PASSPORT_FUND; break;
            case 3: listFieldUpdate = FIELD_NEED_UPDATE_PASSPORT_PERSONAL; break;
        }
        if (fieldChangedData !== null) {
            const contains = listFieldUpdate.some(field => {
                return fieldChangedData.includes(field);
            });
            return contains;
        } else {
            return false
        }
    }

    const handleGetImageBase64 = (imageBase64: string) => {
        props.handleSetPassportImage(imageBase64);
    }

    return (
        !loading ?
            <> {
                hasFieldChangeNeedUpdatePassport() && check === true && projectInformation.applicationType === 2 &&
                <SubCard title="CẬP NHẬT HÌNH PASSPORT">
                    <Stack>
                        <Box>
                            <Typography variant="h6" component="h6" color="error">
                                Passport sẽ được cập nhật do thông tin của hồ sơ có thay đổi
                            </Typography>
                        </Box>
                        {projectInformation?.projectType === 1 &&
                            <>
                                <BussinessStamp data={projectInformation} handleGetImageBase64={handleGetImageBase64}></BussinessStamp>
                            </>}
                        {projectInformation?.projectType === 2 &&
                            <>
                                <FundStamp data={projectInformation} handleGetImageBase64={handleGetImageBase64}></FundStamp>
                            </>}
                        {projectInformation?.projectType === 3 &&
                            <>
                                <PersonalStamp data={projectInformation} handleGetImageBase64={handleGetImageBase64}></PersonalStamp>
                            </>}
                    </Stack>
                </SubCard>
            }
            </>
            :
            <CircularProgress />
    )

}