export type HandleFunction = (i: string, s: string) => Promise<void>;

export type AllUserProfile = {
    id?: number;
    id_role?: number;
    user_name?: string;
    role_name?: string;
};

export type RoleProfile = {
    id?: number;
    is_rank?: number;
    role_name?: string;
};
