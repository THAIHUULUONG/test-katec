// material-ui
import { CircularProgress } from '@mui/material';
import StickyHeadTable from './table';
import { GetAllUser } from 'hooks/fetchDataAll';
import { dispatch, useDispatch, useSelector } from 'store';
import React from 'react';
import { AllUserProfile, ClassRoomProfile, RoleProfile } from 'types/all-user-type';
import { getClassRoomList, getGroupClassList, getRoleList, getUsersList } from 'store/slices/allUser';

//import components

export default function ManageClassRoom() {
    
    const [dataClassRoom, setClassRoom] = React.useState<ClassRoomProfile[]>([]);
    const [dataGroupClass, setdDataGroupClass] = React.useState<RoleProfile[]>([]);
    const [dataUser, setData] = React.useState<AllUserProfile[]>([]);

    const { classRoom, groupClass, usersS1 } = useSelector((state) => state.allUser);

    React.useEffect(() => {
        setClassRoom(classRoom);
        setdDataGroupClass(groupClass);
        setData(usersS1);
    }, [classRoom, groupClass, usersS1]);

    React.useEffect(() => {
        dispatch(getClassRoomList());
        dispatch(getGroupClassList());
        dispatch(getUsersList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div>
            {
                dataClassRoom?.length !== 0 ? <StickyHeadTable projectItem={dataClassRoom} dataGroupClass={dataGroupClass} dataUser={dataUser}/> : <CircularProgress />
            }
        </div>
    );
}
