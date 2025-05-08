import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchOrgs } from "../../store/Thunks/OrgThunks";
import { useEffect } from "react";

const CompanyList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrgs());
  }, [dispatch]);

  const { organizations } = useAppSelector((state) => state.organizations);

  if (organizations?.length === 0) {
    navigate(`/app/organization/new`);
  }

  return <></>;
};

export default CompanyList;
