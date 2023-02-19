
// material-ui
import { CircularProgress } from '@mui/material';

import { useState, useEffect } from 'react';
//import axios from 'axios';
import axios from 'utils/axios';
import StampDashBoard from './StampDashBoard';

//import components

export default function ProjectTabs() {
    const [loading, setLoading] = useState(true);
    const [projectItem, setProjectItem] = useState([] as any);

    //Call when init component
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/nft/all`
            );
            setProjectItem([...res?.data]);
            setLoading(false);
        } catch (e) { }
    };
    return (
        <div>
            {
                !loading ?
                    <StampDashBoard projectItem={projectItem} setProjectItem={setProjectItem} />
                    :
                    <CircularProgress />
            }
        </div>
    );
}
