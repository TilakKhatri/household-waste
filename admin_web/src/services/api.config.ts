export const DashboardConfig = {
  GET_DETAILS: () => `/admin/dashboard`,
};

export const AuthConfig = {
  LOGIN: () => "/admin/login",
  REGISTER: () => "/admin/register",
};

export const LocationConfig = {
  GET_ALL: () => "/locations",
  ADD_LOCATION: () => "/locations/add",
};

export const ClusterConfig = {
  GET_ALL: () => `${import.meta.env.VITE_LOCAL_URL}/pickups/cluster`,
};

export const PickersConfig = {
  GET_ALL: () => `${import.meta.env.VITE_LOCAL_URL}/sys/admin/pickers`,
};
