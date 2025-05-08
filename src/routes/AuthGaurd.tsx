import { ReactNode, useEffect } from 'react';
import { Navigate, } from 'react-router-dom'; 
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUserRoleAndPermissions } from '../store/Thunks/UserThunks';
import { CircularProgress } from '@mui/material';

export const AuthGuard = ({
  children,
  module,
  accessType
}: {
  children: ReactNode;
  module: string;
  accessType: "canRead" | "canCreate" | "canUpdate" | "canDelete"
}) => {
  
  const { loginUserPermissions, metaDataLoading } = useAppSelector((state) => state.user);   

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if(loginUserPermissions.length === 0) {
      dispatch(fetchUserRoleAndPermissions());
    }
  }, [dispatch])

  

  if(metaDataLoading){
    return <CircularProgress />
  }


  if(loginUserPermissions.length > 0) {

    const modulePermission = loginUserPermissions.find((permission) => permission.module.name.toLowerCase() === module);

    if (!modulePermission) {
      return <Navigate to="/unauthorized" replace />;
    }

    if (modulePermission[accessType] !== true) {
      return <Navigate to="/unauthorized" replace />;
    } 
  }

  return <>{children}</>;
};


