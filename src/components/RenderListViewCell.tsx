import { Tooltip } from "@mui/material";

interface ICellDetails {
  text: string;
  showViewDetail: boolean | false;
  onCellClick: () => void;
}

const RenderListViewCell = ({
  text,
  showViewDetail,
  onCellClick,
}: ICellDetails) => {
  return (
    <Tooltip title="View Details" arrow>
      <div
        className={showViewDetail ? "cursor-pointer" : ""}
        onClick={() => onCellClick()}
      >
        <span>{text}</span>
      </div>
    </Tooltip>
  );
};

export default RenderListViewCell;
