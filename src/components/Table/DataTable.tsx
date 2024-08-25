"use client";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./DataTable.scss";
import ActionBtn from "../ActionBtn";
import { MdBlock, MdDelete } from "react-icons/md";
import {
  BANNER,
  BRAND,
  CATEGORY,
  ORDER,
  SUCCESS_STATUS,
  USER,
} from "@/constant/commonConstant";
import { ReactNode } from "react";
import userApi from "@/apis/userApi";
import { FaUnlockAlt } from "react-icons/fa";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  blockUserBtn?: (data: any) => ReactNode;
};

const DataTable = (props: Props) => {
  console.log("data", props.rows);
  const handleDelete = async (id: string) => {
    let response;
    switch (props.slug) {
      case USER:
        response = await userApi.deleteUser(id);
        break;

      default:
        console.log("invalid value");
    }
    console.log("first", response);
    if (response?.code === 200) {
      window.location.reload();
    }
  };

  const handleBlock = async (id: string) => {
    console.log("id", id);
    const response = await userApi.blockUser(id);
    if (response?.code === 200) {
      window.location.reload();
    }
  };

  const handleUnBlock = async (id: string) => {
    console.log("id", id);
    const response = await userApi.updateUser(id, { locked: false });
    if (response?.code === 200) {
      window.location.reload();
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (param) => {
      return (
        <div className="flex justify-between gap-4 w-full">
          {param.row.locked ? (
            <ActionBtn
              icon={FaUnlockAlt}
              onClick={() => handleUnBlock(param.row.id)}
            />
          ) : (
            <ActionBtn
              icon={MdBlock}
              onClick={() => handleBlock(param.row.id)}
            />
          )}

          <ActionBtn
            icon={MdDelete}
            onClick={() => handleDelete(param.row.id)}
          />
        </div>
      );
    },
  };

  return (
    <div>
      <DataGrid
        className="bg-white p-5"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
