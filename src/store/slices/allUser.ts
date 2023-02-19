// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['allUser'] = {
    error: null,
    dataAllUser: [],
};

const slice = createSlice({
    name: 'allUser',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET ALL 
        getUsersListSuccess(state, action) {
            state.dataAllUser = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsersList() {
    return async () => {
        try {
            const response = await axios.get('/showAllUser');
            console.log('response123', response);
            dispatch(slice.actions.getUsersListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

