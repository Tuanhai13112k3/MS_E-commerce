import { createContext, useContext } from "react";
import { useFetchUserProfile } from "../hooks/queries";
import { AuthContextType } from "../type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: user, isLoading, isError } = useFetchUserProfile();
    const isAuthenticated = !!user || (!isError);
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};