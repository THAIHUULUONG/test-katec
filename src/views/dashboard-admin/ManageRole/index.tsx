// material-ui
import { CircularProgress } from '@mui/material';
import React from 'react';
import { dispatch, useSelector } from 'store';
import { getRoleList, getUsersList } from 'store/slices/allUser';
import { AllUserProfile, RoleProfile } from 'types/all-user-type';
import StickyHeadTable from './table';

//import components

export default function ManageRole() {
    
    const [role, setRole] = React.useState<RoleProfile[]>([]);
    const { usersS1, roleUser } = useSelector((state) => state.allUser);

    React.useEffect(() => {
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
                role?.length !== 0 ? <StickyHeadTable projectItem={role} roleItems={role}/> : <CircularProgress />
            }
        </div>
    );
}
