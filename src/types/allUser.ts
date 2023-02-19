import { AllUserProfile, ClassRoomProfile, GroupClassProfile, RoleProfile, StudentProfile } from "./all-user-type";

export interface AllUserStateProps {
    usersS1: AllUserProfile[];
    roleUser: RoleProfile[];
    groupClass: GroupClassProfile[];
    classRoom: ClassRoomProfile[];
    student: StudentProfile[];
    error: object | string | null;
}
