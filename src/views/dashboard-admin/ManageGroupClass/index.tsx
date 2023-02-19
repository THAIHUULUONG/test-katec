// material-ui
import { CircularProgress } from '@mui/material';
import StickyHeadTable from './table';
import { GetAllUser } from 'hooks/fetchDataAll';
import { dispatch, useDispatch, useSelector } from 'store';
import React from 'react';
import { AllUserProfile, RoleProfile } from 'types/all-user-type';
import { getGroupClassList, getRoleList, getUsersList } from 'store/slices/allUser';

//import components

export default function ManageGroupClass() {
    
    const [dataGroupClass, setdDataGroupClass] = React.useState<RoleProfile[]>([]);
    const { groupClass } = useSelector((state) => state.allUser);

    React.useEffect(() => {
        setdDataGroupClass(groupClass);
    }, [ groupClass]);

    React.useEffect(() => {
        dispatch(getGroupClassList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {
                groupClass?.length !== 0 ? <StickyHeadTable projectItem={groupClass}/> : <CircularProgress />
            }
        </div>
    );
}
