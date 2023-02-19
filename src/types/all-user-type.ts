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

export type GroupClassProfile = {
    id?: number;
    group_name?: string;
    is_adult?: number;
};

export type ClassRoomProfile = {
    id?: number;
    id_group?: number;
    id_user?: number;
    class_name?: string;
    group_name?: string;
    user_name?: string;
};

export type StudentProfile = {
    id?: number;
    id_class?: number;
    student_gender?: number;
    student_name?: string;
    gender_name?: string;
    class_name?: string;
};
