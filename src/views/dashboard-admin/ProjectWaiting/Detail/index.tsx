// material-ui
import {
  CircularProgress
} from '@mui/material';
import axios from 'utils/axios';
import {useEffect, useState } from 'react';
import DetailBuss from './DetailBuss';
import DetailFund from './DetailFund';
import DetailPer from './DetailPer';
export default function DetailWaiting() {
  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState<any>();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('_id');
  const projectType = params.get('projectType'); 
 useEffect(() => {
      fetchData();
  }, []);
 const fetchData = async () => {
      setLoading(true);
      try {
          const res = await axios.get(
              `/application/detail-waiting-approve?_id=${id}&projectType=${projectType}`
          );
          setProjectDetails(res.data);
          setLoading(false);
      } catch (e) { 
        console.log(e)
      }
  };
  const renderSwitchType = (projectType: any) => {
      switch (projectType) {
        case "1":
          return <DetailBuss projectDetails={projectDetails} />;         
        case "2":
          return <DetailFund projectDetails={projectDetails} stateEdit={true}/>;             
        case "3":
          return <DetailPer projectDetails={projectDetails} stateEdit={true}/>; 
        default:
             return;
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
