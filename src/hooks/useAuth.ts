// Placeholder for auth hook - to be implemented with auth
export const useAuth = () => {
  return {
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
  };
};

export default useAuth;
