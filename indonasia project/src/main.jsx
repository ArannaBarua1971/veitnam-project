import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

import Login from "./Pages/Login.jsx";
import MainTemplate from "./Pages/Tamplate/MainTemplate.jsx";
import Tổngquan from "./Pages/Tổngquan.jsx";
import GóiDịchVụ from "./Pages/GóiDịchVụ.jsx";
import UserInfo from "./Pages/UserInfo.jsx";
import Registration from "./Pages/Registration.jsx";
import NhậnDịnhFIDT from "./Pages/NhậnDịnhFIDT.jsx";
import CheckOutDetails from "./Pages/CheckOutDetails.jsx";
import CheckOutPage from "./Pages/CheckOutPage.jsx";
import Tínhiệu from "./Pages/Tínhiệu.jsx";
import Báocáo from "./Pages/Báocáo.jsx";
import AdminPanel from "./Admin panel/AdminPanel.jsx";
import AddArticle from "./Admin panel/AdminPages/AddArticle.jsx";
import AddMemberShip from "./Admin panel/AdminPages/AddMemberShip.jsx";
import AllMembershipUser from "./Admin panel/AdminPages/AllMembershipUser.jsx";
import AllMembeShip from "./Admin panel/AdminPages/AllMembeShip.jsx";
import AllUser from "./Admin panel/AdminPages/AllUser.jsx";
import Data from "./Pages/Data.jsx";
import Dealtíchsảncổphiếu from "./Pages/Dealtíchsảncổphiếu.jsx";
import AdminProtected from "./components/AdminProtected.jsx";
import AddShortDeal from "./Admin panel/AdminPages/AddShortDeal.jsx";
import AddLongDeal from "./Admin panel/AdminPages/AddLongDeal.jsx";
import VideoContent from "./Pages/VideoContent.jsx";
import AddVedio from "./Admin panel/AdminPages/AddVedio.jsx";
import AllVideo from "./Admin panel/AdminPages/AllVideo.jsx";
import AddAsset from "./Admin panel/AdminPages/AddAsset.jsx";
import AllShortDeal from "./Admin panel/AdminPages/AllShortDeal.jsx";
import AllLongDeal from "./Admin panel/AdminPages/AllLongDeal.jsx";
import AllAsset from "./Admin panel/AdminPages/AllAsset.jsx";
import AddData from "./Admin panel/AdminPages/AddData.jsx";
import AddCourse from "./Admin panel/AdminPages/AddCourse.jsx";
import CourseDetails from "./Pages/CourseDetails.jsx";
import AllActiveCourses from "./Pages/AllActiveCourses.jsx";
import AllCourses from "./Admin panel/AdminPages/AllCourses.jsx";
import AllCourseBuyerUser from "./Admin panel/AdminPages/AllCourseBuyerUser.jsx";
import AllData from "./Admin panel/AdminPages/AllData.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <MainTemplate />,
        children: [
          {
            path: "/:token?",
            element: <Tổngquan />,
          },
          {
            path: "/nhan-dinh-thi-truong",
            element: <NhậnDịnhFIDT />,
          },
          {
            path: "/Deal-cổ-phiếu-đánh-ngắn",
            element: <AdminProtected Component={Báocáo} />,
          },
          {
            path: "/Deal-cổ-phiếu-trung-hạn",
            element: <AdminProtected Component={Tínhiệu} />,
          },
          {
            path: "/Deal-tích-sản-cổ-phiếu",
            element: <AdminProtected Component={Dealtíchsảncổphiếu} />,
          },
          {
            path: "/Dữ-liệu",
            element: <Data />,
          },
          {
            path: "/Khóa_đào_tạo_hội_viên",
            element: <AdminProtected Component={AllActiveCourses} />,
          },

          {
            path: "/Kiến-Thức-Đầu-Tư",
            element: <AdminProtected Component={Tổngquan} />,
          },
          {
            path: "/Bài-Giảng-Thực-Chiến",
            element: <AdminProtected Component={Tổngquan} />,
          },
          {
            path: "/user-information",
            element: <UserInfo />,
          },
          {
            path: "/course_details",
            element: <AdminProtected Component={CourseDetails} />,
          },
        ],
      },
      {
        path: "/video_content/:id",
        element: <AdminProtected Component={VideoContent} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/gói_dịch_vụ",
        element: <GóiDịchVụ />,
      },
      {
        path: "/check_out_details/:course?/:slug",
        element: <CheckOutDetails />,
      },
      {
        path: "/check_out_page",
        element: <CheckOutPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPanel />,
    children: [
      { path: "/admin/add-article", element: <AddArticle /> },
      { path: "/admin/add-membership", element: <AddMemberShip /> },
      { path: "/admin/all-membership-user", element: <AllMembershipUser /> },
      { path: "/admin/all-course-user", element: <AllCourseBuyerUser /> },
      { path: "/admin/all-membership", element: <AllMembeShip /> },
      { path: "/admin/all-user", element: <AllUser /> },
      { path: "/admin/short-deal/:id?", element: <AddShortDeal /> },
      { path: "/admin/all-short-deal", element: <AllShortDeal /> },
      { path: "/admin/long-deal/:id?", element: <AddLongDeal /> },
      { path: "/admin/all-long-deal", element: <AllLongDeal /> },
      { path: "/admin/add-asset/:id?", element: <AddAsset /> },
      { path: "/admin/all-Asset", element: <AllAsset /> },
      { path: "/admin/upload-data", element: <AddData /> },
      { path: "/admin/Add-vedio/:slug?", element: <AddVedio /> },
      { path: "/admin/all-vedio", element: <AllVideo /> },
      { path: "/admin/Add-course/:slug?", element: <AddCourse /> },
      { path: "/admin/all-course", element: <AllCourses /> },
      { path: "/admin/all-data", element: <AllData /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
