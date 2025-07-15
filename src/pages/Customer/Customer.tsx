/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createCustomerRow, customer } from "../../Constants/DataTableColumn";
import ModulePage from "../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	emptyCustomer,
	fetchCustomers,
	fetchCustomersCount,
} from "../../store/Reducers/CustomerReducers";
import { customerRowData } from "../../Types/Customer";
import { useNavigate } from "react-router-dom";
import { deleteCustomer } from "../../api/services/customer";
import { formatINR } from "../../Constants/commonFunctions";
import DialogBox from "../../components/DialogBox";
const Customer = () => {
	const { customers, loading, customerCount } = useAppSelector(
		(state) => state.customer
	);
	const rows: customerRowData[] = [];

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
					customer.id,
					customer.customerName,
					customer.phone,
					customer.email,
					formatINR(customer.currentBalance || "0.00"),
					customer.createdTime,
					customer.createdBy,
					customer.updatedTime,
					customer.updatedBy
				)
			);
		});
	}

	const navigate = useNavigate();

	function addCustomer() {
		navigate("add?from=detail");
	}

	function editCallback(e: number[]) {
		navigate(`${e[0]}/edit?from=detail`);
	}

	function deleteCallBack(e: number[]) {
		setId(e);
		setDeleteOpen(true);
	}

	function rowOnClick(_e: any) {
	}


	const [deleteOpen, setDeleteOpen] = useState(false)
	const [id, setId] = useState<number[]>()

	function successCallBack() {
		setDeleteOpen(false);

		if (id) {
			deleteCustomer(id).then(() => {
				dispatch(fetchCustomersCount());
				onPaginationModelChange({ page: 0, pageSize: 10 });
			})
		}
	}

	const onSortModelChange = (e: any) => {
		const sortObj = e[0];
		if (sortObj) {
			let fieldName = sortObj.field;
			const sortOrder = sortObj.sort.toUpperCase();
			if (sortObj.field === "customerName") {
				fieldName = "name";
			}
			if (sortObj.field === "createdTime") {
				fieldName = "created_time";
			}
			if (sortObj.field === "updatedTime") {
				fieldName = "updated_time";
			}
			dispatch(fetchCustomers({ sortBy: fieldName, sortOrder, page: 0, range: 10 }));
		} else {
			dispatch(fetchCustomers({ page: 0, range: 10 }));
		}
	}
	

	return (
		<>
			<DialogBox dialogDetails={{
				title: "Do you want to delete these customers",
				description: <>Can't restore any of these after the deletion</>,
				failureBtnText: "Cancel",
				id: "",
				successBtnText: "Delete",
			}}
				open={deleteOpen}
				setOpen={setDeleteOpen}
				successCallBack={successCallBack}
			/>
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
				rowOnClick={rowOnClick}
				isServerSideSort={true}
				onSortModelChange={onSortModelChange} 
				checkboxSelection={false}	
			/>
		</>
	);
};

export default Customer;
