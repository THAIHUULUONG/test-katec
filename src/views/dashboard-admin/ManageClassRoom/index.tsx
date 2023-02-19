// material-ui
import { CircularProgress } from '@mui/material';
import StickyHeadTable from './table';
import { GetAllUser } from 'hooks/fetchDataAll';
import { dispatch, useDispatch, useSelector } from 'store';
import React from 'react';
import { AllUserProfile, ClassRoomProfile, RoleProfile } from 'types/all-user-type';
import { getClassRoomList, getRoleList, getUsersList } from 'store/slices/allUser';

//import components

export default function ManageClassRoom() {
    
    const [dataClassRoom, setClassRoom] = React.useState<ClassRoomProfile[]>([]);
    const { classRoom } = useSelector((state) => state.allUser);

    React.useEffect(() => {
        setClassRoom(classRoom);
    }, [classRoom]);

    React.useEffect(() => {
        dispatch(getClassRoomList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div>
            {
                dataClassRoom?.length !== 0 ? <StickyHeadTable projectItem={dataClassRoom}/> : <CircularProgress />
            }
        </div>
    );
}
