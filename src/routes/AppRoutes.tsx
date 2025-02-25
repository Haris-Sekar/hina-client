import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import notFound from "../assets/404.gif";
import EmptyPage from "../components/EmptyPage";
import { CircularProgress } from "@mui/material"; 

function AppRoutes() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Private Routes */}
        <Route path="/app/*" element={<PrivateRoutes />} />

        
        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <EmptyPage
              heading="Page not found!"
              image={notFound}
              description="The page you are looking for is avaliable"
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
