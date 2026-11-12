import { createContext, useEffect, useState } from "react";
import {
  createUser,
  Login,
  ActivationServiceApi,
  GetMe,
  LogoutServiceApi,
  UpdateUserInfoApi,
  UpdateProfilePictureApi,
  UpdatePassword
} from "../services/api/authServices";
import { fetchAllUsers,deleteUser,updateRole } from "../services/api/adminServices";
import { CreateCourseApi,GetSingleCourseApi ,UpdateCourseApi,GetAllAdminCoursesApi,GetCourseContentApi} from "../services/api/courseServices";
import { GetCourseAnalyticsApi,GetUsersAnalyticsApi } from "../services/api/analyticsService";
// import { GetAllCoursesApi,GetMyLearningApi,CreatePaymentApi,VerifyPaymentApi,GetCategoriesApi } from "../services/api/lmsService";
import { CreateOrderApi ,GetAllOrdersDashboardApi} from "../services/api/orderServices";




export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
   const [AllUsers , setAllUsers] = useState(null)
  //useEffect for fetching token and based token fetch users
  //GLOBAL DATA
  // --------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("TOKEN");
      // No token -> user is not logged in
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        //if token present in localstorage call GetMe function
        const response = await GetMe();
        setLoading(true);
        setUser(response?.user ?? null);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  /*======================== REGISTER BLOCK START HERE ========================*/

  const register = async (name, email, password) => {
    try {
      //fetch
      const { success, activationToken, activationCode, mailUrl } =
        await createUser(name, email, password);

      if (success === true) {
        localStorage.setItem("activationToken", activationToken);
        localStorage.setItem("activationCode", activationCode);
        localStorage.setItem("successRes", success);
        localStorage.setItem("mailUrl", mailUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*======================== REGISTER BLOCK ENDS HERE ========================*/

  /*========================ACTIVATION USER CODE STARTS HERE ========================*/

  const ActivationUser = async (activation_token, activation_code) => {
    try {
      await ActivationServiceApi(activation_token, activation_code);
    } catch (error) {
      throw error;
    }
  };

  /*========================ACTIVATION USER CODE ENDS HERE ========================*/

  // const login = async (email, password) => {
  //   try {
  //     let { accessToken } = await Login(email, password);
  //     localStorage.setItem("TOKEN", accessToken);
  //       // IMPORTANT
  //       setToken(accessToken);
  //       const userData = await GetMe();
  //       console.log("USER DATA:", userData);
  //       setUser(userData.user);
  //     return userData.user;

  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // -----------------------------------------
  // LOGIN
  // -----------------------------------------
  const login = async (payload) => {
  try {
    const response = await Login(payload);

    console.log("CONTEXT LOGIN RESPONSE:", response);

    localStorage.setItem(
      "TOKEN",
      response.accessToken
    );

    setToken(response.accessToken);

    setUser(response.user);

    return response;

  } catch (error) {

    console.log(
      "CONTEXT LOGIN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

  /*=========================LOGOUT =======================*/
  const logout = async () => {
    let response = await LogoutServiceApi();
    console.log(response);
    return response;
  };

  /*----------------------PROFILE ------------------------*/
  const updateUserInfo = async (payload) => {
    let res = await UpdateUserInfoApi(payload);
    if (res?.user) {
      setUser(res.user);
    }
    return res;
  };


  /*----------------------UPDATE PROFILE PICTURE------------------------*/
  const updateProfilePicture = async (payload) => {
    let res = await UpdateProfilePictureApi({avatar:payload});
    if (res.user) {
      setUser(res.user);
    }
    return res;
  };

  /*----------UPDATE PASSWORD----------*/
  const updatePassword=async(payload)=>{
    try{
      const response=await UpdatePassword(payload);
      return response;
    }catch{
      console.error(error);
      throw error;
    }
  }
/*----------ADMIN DATA----------*/
 const getAllUsersApi = async () => {
    let  data  = await fetchAllUsers();
    setAllUsers(data.users)
   return data;
  };

  const updateRoleApi = async(payload) =>{
    let res = await updateRole(payload);
   setUser(res.user);
    return res;
  }

  const deleteUserApi = async(id) =>{
    let res = await deleteUser(id);
    return res;
  }

/*----------courses----------*/
const createCourse = async (payload) => {
  try {
    const response = await CreateCourseApi(payload);

    return response;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

const getSingleCourse = async (id) => {
  try {
    const response = await GetSingleCourseApi(id);
    return response;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

const updateCourse = async (id, payload) => {
  try {
    const response = await UpdateCourseApi(id, payload);
    return response;
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );
    throw error;
  }
};

const getAllAdminCourses = async () => {
  try {
    const response = await GetAllAdminCoursesApi();

    console.log(
      "GET ALL ADMIN COURSES RESPONSE:",
      response
    );

    return response;
  } catch (error) {
    console.error(
      "GET ALL ADMIN COURSES ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

const getCourseContent = async (id) => {
  try {
    const response = await GetCourseContentApi(id);
    console.log("GET COURSE CONTENT RESPONSE:", response);
    return response;
  } catch (error) {
    console.error(
      "GET COURSE CONTENT ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*----------Analytics----------*/
const getCourseAnalytics = async () => {
  try {
    const response = await GetCourseAnalyticsApi();

    console.log("COURSE ANALYTICS RESPONSE:", response);

    return response;
  } catch (error) {
    console.error(
      "COURSE ANALYTICS ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

const getUsersAnalytics = async () => {
  try {
    const response = await GetUsersAnalyticsApi();

    console.log(
      "GET USERS ANALYTICS RESPONSE:",
      response
    );

    return response;
  } catch (error) {
    console.error(
      "GET USERS ANALYTICS ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

/*----------LMS marketplace----------*/
const getAllCourses = async () => {
  try {
    const response = await GetAllCoursesApi();

    console.log("ALL COURSES:", response);

    return response;
  } catch (error) {
    console.error(
      "GET ALL COURSES ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

const getMyLearning = async () => {
  try {
    const response = await GetMyLearningApi();

    console.log("MY LEARNING RESPONSE:", response);

    return response;
  } catch (error) {
    console.error(
      "MY LEARNING ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

const createPayment = async (payload) => {
  try {
    const response = await CreatePaymentApi(payload);

    console.log("CREATE PAYMENT RESPONSE:", response);

    return response;
  } catch (error) {
    console.error(
      "CREATE PAYMENT ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

const verifyPayment = async (payload) => {
  try {
    const response = await VerifyPaymentApi(payload);

    console.log("VERIFY PAYMENT RESPONSE:", response);

    return response;
  } catch (error) {
    console.error(
      "VERIFY PAYMENT ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

const getCategories = async () => {
  try {
    const response = await GetCategoriesApi();

    console.log("CATEGORIES RESPONSE:", response);

    return response;
  } catch (error) {
    console.error(
      "GET CATEGORIES ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

/*----------ORDERS----------*/
const createOrder = async (payload) => {
  try {
    const response = await CreateOrderApi(payload);

    console.log("CREATE ORDER RESPONSE:", response);

    return response;
  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

const getAllOrdersDashboard = async () => {
  try {
    const response = await GetAllOrdersDashboardApi();

    console.log(
      "GET ALL ORDERS RESPONSE:",
      response
    );

    return response;
  } catch (error) {
    console.error(
      "GET ALL ORDERS ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};


  return (
    <>
      <AuthContext.Provider
        value={{
          register,
          login,
          ActivationUser,
          token,
          user,
          logout,
          updateUserInfo,
          updateProfilePicture,
          updatePassword,
          loading,
          getAllUsersApi,
         AllUsers,
         updateRoleApi,
         deleteUserApi,
         createCourse,
         getSingleCourse,
         updateCourse,
         getCourseAnalytics,
         getAllCourses,
         getMyLearning,
         createPayment,
         verifyPayment,
         getCategories,
         getAllAdminCourses,
         getCourseContent,
         getUsersAnalytics,
         createOrder,
         getAllOrdersDashboard
        
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
