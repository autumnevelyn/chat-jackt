"use client";

import { User } from "@/types";
import { createContext, useContext, useState, FC, ReactNode } from "react";

interface AuthContextType {
    session: { user: User } | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [session, setSession] = useState<{ user: User } | null>(null);

    const login = (user: User) => {
        setSession({ user });
    };

    const logout = () => {
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
