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

         // GET ROLE STYLE 1
         getRoleListSuccess(state, action) {
            state.roleUser = action.payload;
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

