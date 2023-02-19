// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultStateProps } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultStateProps['allUser'] = {
    error: null,
    usersS1: [],
    roleUser: [],
    groupClass: [],
    classRoom: [],
    student: [],
};

const slice = createSlice({
    name: 'allUser',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET USERS 
        getUsersListSuccess(state, action) {
            state.usersS1 = action.payload;
        },

         // GET ROLE
         getRoleListSuccess(state, action) {
            state.roleUser = action.payload;
        },

         // GET groupClass
         getGroupClassListSuccess(state, action) {
            state.groupClass = action.payload;
        },

         // GET classRoom
         getClassRoomListSuccess(state, action) {
            state.classRoom = action.payload;
        },

        // GET classRoom
        getStudentListSuccess(state, action) {
            state.student = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsersList() {
    return async () => {
        try {
            const response = await axios.get('/showAllUser');
            dispatch(slice.actions.getUsersListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getRoleList() {
    return async () => {
        try {
            const response = await axios.post('/viewRole');
            dispatch(slice.actions.getRoleListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getGroupClassList() {
    return async () => {
        try {
            const response = await axios.get('/viewClassGroup');
            dispatch(slice.actions.getGroupClassListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getClassRoomList() {
    return async () => {
        try {
            const response = await axios.get('/viewClassRoom');
            dispatch(slice.actions.getClassRoomListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getStudentList() {
    return async () => {
        try {
            const response = await axios.get('/viewStudent');
            console.log('reponse1231', response);
            dispatch(slice.actions.getStudentListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
