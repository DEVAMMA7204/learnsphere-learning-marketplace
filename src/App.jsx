import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layouts/Navbar";
import HomePage from "./pages/HomePage";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ActivationCode from "./components/auth/ActivationCode";

import ProfileDashboard from "./components/profile/ProfileDashboard";
import UpdateProfileInfo from "./components/profile/UpdateProfileInfo";
import ProfileIndexPage from "./components/profile/ProfileIndexPage";
import UpdateProfilePicture from "./components/profile/UpdateProfilePicture";
import UpdatePassword from "./components/profile/UpdatePassword";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import AdminDashboard from "./components/Admin/AdminDashboard";
import GetAllUsers from "./components/Admin/GetAllUsers";
import SingleUser from "./components/Admin/SingleUser";

import CreateCourse from "./components/Admin/course/CreateCourse";
import CourseDetails from "./components/Admin/course/CourseDetails";
import CourseContent from "./components/Admin/course/CourseContent";
import GetAllCourses from "./components/Admin/course/GetAllCourses";

import CourseAnalytics from "./components/Admin/Analytics/CourseAnalytics";

import CourseMarketplace from "./components/LMS/CourseMarketplace";
import MyLearning from "./components/LMS/MyLearning";
import Payments from "./components/LMS/Payments";
import Categories from "./components/LMS/Categories";
import Analytics from "./components/Admin/Analytics/Analytics";
import UsersAnalytics from "./components/Admin/Analytics/UsersAnalytics";
import OrdersAnalytics from "./components/Admin/Analytics/OrdersAnalytics";
import CreateOrder from "./components/Admin/Orders/CreateOrder";

const App = () => {
  return (
    <Fragment>
      <Router>
        <section id="navbar">
          <article className="container">
            <aside className="top_header">
              <Navbar />
            </aside>

            <main className="main">
              <Routes>
                {/* Public Routes */}

                <Route path="/" element={<HomePage />} />

                <Route path="/auth/register" element={<Register />} />

                <Route path="/auth/activate" element={<ActivationCode />} />

                <Route path="/auth/login" element={<Login />} />

                <Route path="/course/:id" element={<CourseDetails />} />

                {/* Protected Routes */}

                <Route element={<ProtectedRoute />}>
                  {/* Profile */}

                  <Route path="/user/profile" element={<ProfileDashboard />}>
                    <Route index element={<ProfileIndexPage />} />

                    <Route
                      path="update-user-info"
                      element={<UpdateProfileInfo />}
                    />

                    <Route
                      path="update-profile-picture"
                      element={<UpdateProfilePicture />}
                    />

                    <Route
                      path="update-password"
                      element={<UpdatePassword />}
                    />
                  </Route>

                  {/* USER LMS ROUTES */}

                  <Route path="/lms/courses" element={<CourseMarketplace />} />

                  <Route path="/lms/my-learning" element={<MyLearning />} />

                  <Route path="/lms/payments" element={<Payments />} />

                  <Route path="/lms/categories" element={<Categories />} />

                  {/* ADMIN ROUTES */}

                  <Route element={<AdminRoute />}>
                    <Route
                      path="admin/admin-dashboard"
                      element={<AdminDashboard />}
                    >
                      <Route path="users" element={<GetAllUsers />} />

                      <Route path="courses" element={<GetAllCourses />} />


                      <Route path="analytics" element={<Analytics />}>
                        <Route path="users" element={<UsersAnalytics />} />
                        <Route path="courses" element={<CourseAnalytics />} />
                        <Route path="orders" element={<OrdersAnalytics />} />
                      </Route>
                    </Route>

                    <Route
                        path="order/create-order"
                        element={<CreateOrder/>}
                      />

                    {/* Single User */}

                    <Route path="user/:id" element={<SingleUser />} />

                    {/* Create Course */}

                    <Route
                      path="/course/create-course"
                      element={<CreateCourse />}
                    />

                    {/* Get Single Course */}

                    <Route
                      path="/course/get-course/:id"
                      element={<CourseDetails />}
                    />

                    {/* Edit Course */}

                    <Route
                      path="/course/edit-course/:id"
                      element={<CreateCourse />}
                    />

                    {/* Course Content */}

                    <Route
                      path="/course/content/:id"
                      element={<CourseContent />}
                    />
                  </Route>
                </Route>
              </Routes>
            </main>
          </article>
        </section>
      </Router>
    </Fragment>
  );
};

export default App;
