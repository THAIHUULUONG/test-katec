// material-ui
import { CircularProgress } from '@mui/material';
import StickyHeadTable from './table';
import { GetAllUser } from 'hooks/fetchDataAll';
import { dispatch, useDispatch, useSelector } from 'store';
import React from 'react';
import { AllUserProfile, StudentProfile, RoleProfile } from 'types/all-user-type';
import { getStudentList, getRoleList, getUsersList } from 'store/slices/allUser';

//import components

export default function ManageStudent() {
    
    const [dataStudent, setStudent] = React.useState<StudentProfile[]>([]);
    const { student } = useSelector((state) => state.allUser);

    React.useEffect(() => {
        setStudent(student);
    }, [student]);

    React.useEffect(() => {
        dispatch(getStudentList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log('dataStudent', dataStudent);
    

    return (
        <div>
            {
                dataStudent?.length !== 0 ? <StickyHeadTable projectItem={dataStudent}/> : <CircularProgress />
            }
        </div>
    );
}
