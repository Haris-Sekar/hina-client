import { useEffect } from "react";
import { createMainAreaRow, mainArea } from "../../Constants/DataTableColumn";
import ModulePage from "../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchMainArea } from "../../store/Reducers/CustomerReducers";
import { mainAreaRowData } from "../../Types/Customer";
import { useNavigate } from "react-router-dom";

const MainArea = () => {
	const { mainAreas, loading } = useAppSelector((state) => state.customer);
	let rows: mainAreaRowData[] = [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMainArea());
	}, [dispatch]);

	if (mainAreas && mainAreas.length > 0) {
		mainAreas.map((mainAreas) => {
			rows.push(createMainAreaRow(mainAreas.mainAreaId, mainAreas.name));
		});
	}

	const navigate = useNavigate();

	function addMainArea() {
		navigate("/app/sales/mainArea/add?from=detail");
	}

	function editCallback() {}

	function deleteCallBack() {}

	return (
		<>
			<ModulePage
				moduleName="Main Area"
				rows={rows}
				columns={mainArea}
				isLoading={loading}
				addCallBack={addMainArea}
				editCallBack={editCallback}
				deleteCallBack={deleteCallBack}
				isServerPagination={false}
			/>
		</>
	);
};

export default MainArea;
