// material-ui
import { CircularProgress } from '@mui/material';
import StickyHeadTable from './table';
import { GetAllUser } from 'hooks/fetchDataAll';
import { dispatch, useDispatch, useSelector } from 'store';
import React from 'react';
import { AllUserProfile, StudentProfile, RoleProfile, ClassRoomProfile } from 'types/all-user-type';
import { getStudentList, getRoleList, getUsersList, getClassRoomList } from 'store/slices/allUser';

//import components

export default function ManageStudent() {
    
    const [dataStudent, setStudent] = React.useState<StudentProfile[]>([]);
    const [dataClassRoom, setClassRoom] = React.useState<ClassRoomProfile[]>([]);
    const { student, classRoom } = useSelector((state) => state.allUser);

    React.useEffect(() => {
        setStudent(student);
        setClassRoom(classRoom);
    }, [student, classRoom]);

    React.useEffect(() => {
        dispatch(getStudentList());
        dispatch(getClassRoomList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {
                dataStudent?.length !== 0 ? <StickyHeadTable projectItem={dataStudent} dataClassRoom={dataClassRoom}/> : <CircularProgress />
            }
        </div>
    );
}
