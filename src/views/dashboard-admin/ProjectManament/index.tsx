// material-ui
import { CircularProgress } from '@mui/material';

import { useState, useEffect } from 'react';
//import axios from 'axios';
import axios from 'utils/axios';

//import components
import StickyHeadTable from './table';

export default function ProjectTabs() {
    const [loading, setLoading] = useState(true);
    const [projectItem, setProjectItem] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/project/all`);
            setProjectItem([...res.data]);
            setLoading(false);
        } catch (e) { }
    };

    return (
        <div>
            {
                !loading ? <StickyHeadTable projectItem={projectItem} setProjectItem={setProjectItem} /> : <CircularProgress />
            }
        </div>
    );
}
