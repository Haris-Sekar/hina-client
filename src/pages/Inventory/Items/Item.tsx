import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchItem } from "../../../store/Reducers/InventoryReducerts";
import { Paper } from "@mui/material";

const Item = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	const dispatch = useAppDispatch();

	const { items } = useAppSelector((state) => state.inventory);

	useEffect(() => {
		dispatch(fetchItem({ itemId: id }));
	}, [id]);

	return (
		<>
			{items && (
				<Paper>
					<div>{items?.itemDetails?.itemName}</div>
				</Paper>
			)}
		</>
	);
};

export default Item;
