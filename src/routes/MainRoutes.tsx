import { lazy } from "react";
// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";

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
      element: <ManageUser />,
    },
    {
      path: "/group-class",
      element: <ManageUser />,
    },
    {
      path: "/class-room",
      element: <ManageUser />,
    },
    {
      path: "/manage-student",
      element: <ManageUser />,
    },
  ],
};

export default MainRoutes;
