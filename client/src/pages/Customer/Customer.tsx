import { useEffect } from "react";
import { createCustomerRow, customer } from "../../Constants/DataTableColumn";
import ModulePage from "../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	emptyCustomer,
	fetchCustomers,
	fetchCustomersCount,
	setCustomerLoading,
} from "../../store/Reducers/CustomerReducers";
import { customerRowData } from "../../Types/Customer";
import { useNavigate } from "react-router-dom";
import { deleteCustomer } from "../../api/services/customer";

const Customer = () => {
	const { customers, loading, customerCount } = useAppSelector(
		(state) => state.customer
	);
	let rows: customerRowData[] = [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(emptyCustomer());
		dispatch(fetchCustomersCount());
	}, [dispatch]);

	useEffect(() => {
		if (customerCount > 0) {
			onPaginationModelChange({ page: 0, pageSize: 10 });
		}
	}, [customerCount]);

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
					customer.lastName,
					customer.phoneNumber,
					customer.email,
					customer.gstNumber,
					customer.mainArea.name
				)
			);
		});
	}

	const navigate = useNavigate();

	function addCustomer() {
		navigate("/app/sales/customer/add?from=detail");
	}

	function editCallback(e: number[]) {
		navigate(`/app/sales/customer/${e[0]}/edit?from=detail`);
	}

	function deleteCallBack(e: number[]) {
		deleteCustomer(e).then(() => {
			dispatch(emptyCustomer());
			dispatch(fetchCustomersCount());
		});
	}

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
