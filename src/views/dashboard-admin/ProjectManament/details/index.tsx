// material-ui
import {
    CircularProgress
} from '@mui/material';

// project imports
import { useSearchParams, useParams } from "react-router-dom";
import axios from 'utils/axios';
import PersonalDetails from './DetailPersonal'

// assets
import {useEffect, useState } from 'react';
import BussinessDetails from './DetailBussiness';
import FundDetails from './DetailsFund';
export default function Details() {
    const [loading, setLoading] = useState(true);
    const [projectDetails, setProjectDetails] = useState<any>();
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    searchParams.get("__firebase_request_key")
    const projectType = searchParams.toString().split("=")[1];
    const _id = id;

    //Call when init component
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `project/detail/${_id}?projectType=${projectType}`
            );
            setProjectDetails(res.data);
            setLoading(false);
        } catch (e) { }
    };

    const renderSwitchType = (projectType: any) => {
        switch (projectType) {
            case "3":
                return <PersonalDetails projectDetails={projectDetails} stateEdit={true}/>;
            case "2":
                return <FundDetails projectDetails={projectDetails} stateEdit={true}/>;
            case "1":
                return <BussinessDetails projectDetails={projectDetails} />;
            default:
                return '';
        } 
    }

    return (
        <div>
            {
                !loading ?
                    renderSwitchType(projectType)
                    :
                    <CircularProgress />
            }
        </div>
    )
}
