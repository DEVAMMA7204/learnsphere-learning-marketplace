import api from "./axios";

export const fetchAllUsers=async()=>{
 let { data } = await api.get("/auth/get-all-user-dashboard");
  return data;
}

export const updateRole = async(payload) =>{
  let {data} = await api.put("/auth/update-user-roles" , payload);
  return data;
}

export const deleteUser = async(id) =>{
  let {data} = await api.delete(`/auth/delete-user/${id}`);
  return data;
}