import { AllUserProfile, RoleProfile } from "./all-user-type";

export interface AllUserStateProps {
    usersS1: AllUserProfile[];
    roleUser: RoleProfile[];
    error: object | string | null;
}