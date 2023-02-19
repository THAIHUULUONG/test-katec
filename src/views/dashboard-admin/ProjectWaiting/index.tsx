import React, { useState,useEffect } from "react";
import axios from 'utils/axios';
import ProjectWait from "./ProjectWait";
import {CircularProgress } from '@mui/material';
// styles
function IndexWaiting() {
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
                `/application/list-waiting-approve`,
            );
            setProjectItem([...res.data.data]);
            setLoading(false);
        } catch (e) {}
    };
    return (
        <div>
            {
                !loading ?  <ProjectWait projectItem={projectItem} setProjectItem={setProjectItem}/> : <CircularProgress />
            }
        </div>        
    );
}
export default IndexWaiting;



