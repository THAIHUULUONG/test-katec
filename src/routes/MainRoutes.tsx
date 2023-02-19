import { lazy } from "react";
// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";
import ManageRole from "views/dashboard-admin/ManageRole";
import ManageGroupClass from "views/dashboard-admin/ManageGroupClass";
import ManageClassRoom from "views/dashboard-admin/ManageClassRoom";
import ManageStudent from "views/dashboard-admin/ManageStudent";

const ManageUser = Loadable(
  lazy(() => import("views/dashboard-admin/ManageUser"))
);

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/manage-user",
      element: <ManageUser />,
    },
    {
      path: "/role-user",
      element: <ManageRole />,
    },
    {
      path: "/group-class",
      element: <ManageGroupClass />,
    },
    {
      path: "/class-room",
      element: <ManageClassRoom />,
    },
    {
      path: "/manage-student",
      element: <ManageStudent />,
    },
  ],
};

export default MainRoutes;
