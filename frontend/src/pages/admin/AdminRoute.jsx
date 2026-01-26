import { useAuth } from "@/context/AuthContext";
import { defaultTransformValue } from "framer-motion";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading) return null;

    return user?.role === "ADMIN"? children:<Navigate to="/products"/>
}

export default AdminRoute;