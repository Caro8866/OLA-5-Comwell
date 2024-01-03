import { createContext, useContext, useEffect, useState } from "react";
import verifyAuth from "@/utils/verifyAuth";

type AuthContextType = {
  authState: {
    isAuthenticated: boolean;
    userData: {
      sub: number;
      email: string;
      fullName: string;
      zipCode: number;
      phone: number;
      gender: "Male" | "Female" | "Prefer not to say" | "Other";
      dateOfBirth: string;
      roles: string[];
    } | null;
  };
  onSignInSuccess: () => void;
  onSignOutSuccess: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: {
    isAuthenticated: true,
    userData: null,
  },
  onSignInSuccess: () => {},
  onSignOutSuccess: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: true,
    userData: null,
  });

  useEffect(() => {
    async function checkAuthentication() {
      const authenticationResult = await verifyAuth("profile");
      if (authenticationResult) {
        setAuthState({
          isAuthenticated: authenticationResult.isAuthenticated,
          userData: authenticationResult.userData,
        });
      }
    }

    checkAuthentication();
  }, [authState.isAuthenticated]);

  const handleSignInSuccess = () => {
    setAuthState({
      ...authState,
      isAuthenticated: true,
    });
  };

  const handleSignOutSuccess = () => {
    setAuthState({
      ...authState,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        onSignInSuccess: handleSignInSuccess,
        onSignOutSuccess: handleSignOutSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
