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
    } | null;
  };
  onSignInSuccess: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: {
    isAuthenticated: false,
    userData: null,
  },
  onSignInSuccess: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userData: null,
  });

  const [signInCompleted, setSignInCompleted] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const authenticationResult = await verifyAuth();
      authenticationResult &&
        setAuthState({
          isAuthenticated: authenticationResult.isAuthenticated,
          userData: authenticationResult.userData,
        });
    }

    checkAuthentication();
  }, [signInCompleted]);

  const handleSignInSuccess = () => {
    setSignInCompleted(true);
  };

  return (
    <AuthContext.Provider
      value={{ authState, onSignInSuccess: handleSignInSuccess }}
    >
      {children}
    </AuthContext.Provider>
  );
};
