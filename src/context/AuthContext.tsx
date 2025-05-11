import {createContext, useContext, useState, ReactNode} from "react";

interface AuthContextType {
    token: string | null;
    firstName: string;
    login: (token: string, firstName: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children : ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string>("guest");

    const login = (newToken: string, firstName: string) => {
        setToken(newToken);
        setFirstName(firstName)
    };

    const logout = () => setToken(null);

    const value = {
        firstName,
        token,
        login,
        logout,
        isAuthenticated: !token ? false : true
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within AuthProvider");

    return context;
};