import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import { fetchCompanyDetails } from "../../store/Reducers/UserReducers";

const EditOrganization = () => {
  const { orgId } = useParams();

  const disaptch = useAppDispatch();

  useEffect(() => {
    disaptch(fetchCompanyDetails())
  })

};
