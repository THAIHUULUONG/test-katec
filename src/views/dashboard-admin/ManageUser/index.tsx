// material-ui
import { CircularProgress } from '@mui/material';
import StickyHeadTable from './table';
import { GetAllUser } from 'hooks/fetchDataAll';
import { dispatch, useDispatch, useSelector } from 'store';
import React from 'react';
import { AllUserProfile, RoleProfile } from 'types/all-user-type';
import { getRoleList, getUsersList } from 'store/slices/allUser';

//import components

export default function ManageUser() {
    
    const [data, setData] = React.useState<AllUserProfile[]>([]);
    const [role, setRole] = React.useState<RoleProfile[]>([]);
    const { usersS1, roleUser } = useSelector((state) => state.allUser);

    React.useEffect(() => {
        setData(usersS1);
        setRole(roleUser);
    }, [usersS1, roleUser]);

    React.useEffect(() => {
        dispatch(getUsersList());
        dispatch(getRoleList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div>
            {
                data?.length !== 0 ? <StickyHeadTable projectItem={data} roleItems={role}/> : <CircularProgress />
            }
        </div>
    );
}
