// material-ui
import { CircularProgress } from '@mui/material';
import StickyHeadTable from './table';
import { GetAllUser } from 'hooks/fetchDataAll';
import { useDispatch, useSelector } from 'store';
import React from 'react';
import { UserAllProfile } from 'types/allUser';
import { getUsersList } from 'store/slices/allUser';

//import components

export default function ManageUser() {
    
    const {dataUser, loading} = GetAllUser()

    const [data, setData] = React.useState<UserAllProfile[]>([]);
    const { dataAllUser } = useSelector((state) => state.allUser);
    React.useEffect(() => {
        setData(dataAllUser);
    }, [dataAllUser]);

    // React.useEffect(() => {
    //     useDispatch(getUsersList());
    // }, []);
    console.log('data123', dataAllUser);

    return (
        <div>
            {
                !loading ? <StickyHeadTable projectItem={dataUser}/> : <CircularProgress />
            }
        </div>
    );
}
