import { useEffect } from "react";
import { createCustomerRow, customer } from "../../Constants/DataTableColumn";
import ModulePage from "../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	fetchCustomers,
	fetchCustomersCount,
} from "../../store/Reducers/CustomerReducers";
import { customerRowData } from "../../Types/Customer";
import { useNavigate } from "react-router-dom";

const Customer = () => {
	const { customers, loading, customerCount } = useAppSelector(
		(state) => state.customer
	);
	const companyDetails = useAppSelector((state) => state.user.companyDetails);
	let rows: customerRowData[] = [];

	const dispatch = useAppDispatch();
	const companyId = companyDetails?.companyId as number;

	useEffect(() => {
		if (typeof companyId === "number") {
			dispatch(fetchCustomersCount(companyId));
			if (customerCount > 0) {
				onPaginationModelChange({ page: 0, pageSize: 10 });
			}
		}
	}, [dispatch, customerCount]);

	function onPaginationModelChange(e: any) {
		dispatch(
			fetchCustomers({
				page: e.page,
				range: e.pageSize,
			})
		);
	}

	if (customers && customers.length > 0) {
		customers.map((customer) => {
			rows.push(
				createCustomerRow(
					customer.customerId,
					customer.companyName,
					customer.firstName,
					customer.phoneNumber,
					customer.email,
					customer.gstNumber
				)
			);
		});
	}

	const navigate = useNavigate();

	function addCustomer() {
		navigate("/app/sales/customer/add?from=detail");
	}

	function editCallback(e: number[]) {
		navigate(`/app/sales/customer/${e[0]}/edit`);
	}

	function deleteCallBack() {}

	return (
		<>
			<ModulePage
				moduleName="Customer"
				rows={rows}
				columns={customer}
				isLoading={loading}
				onPaginationModelChange={onPaginationModelChange}
				rowCount={customerCount}
				addCallBack={addCustomer}
				isServerPagination={true}
				editCallBack={editCallback}
				deleteCallBack={deleteCallBack}
			/>
		</>
	);
};

export default Customer;
