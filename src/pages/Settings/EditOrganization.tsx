import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import { fetchCompanyDetails } from "../../store/Reducers/UserReducers";

const EditOrganization = () => {
  const disaptch = useAppDispatch();

  useEffect(() => {
    disaptch(fetchCompanyDetails());
  });
};

export default EditOrganization;
