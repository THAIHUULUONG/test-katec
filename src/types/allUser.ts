export type UserAllProfile = {
    id?: any;
    id_role?: any;
    user_name?: any;
    role_name?: any;
};

export interface GetAllUserStateProps {
    dataAllUser: UserAllProfile[];
    error: object | string | null;
}

