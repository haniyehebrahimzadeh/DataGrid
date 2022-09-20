import React, { useState, useEffect } from "react";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import axios from "axios";
import { Box, Typography, InputBase } from "@mui/material";
import { TextField, Button } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import Autocomplete from "@mui/material/Autocomplete";

export default function DataTable() {
  const [row, setRow] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerpage] = React.useState();
  const [total, setTotal] = React.useState();
  const [totalPages, setTotalPages] = React.useState();
  const [allData, setAllData] = React.useState([]);
  const [search, setSearch] = useState();
  const [combo, setCombo] = useState();

  function handleSearchChange(value) {
    if (value.length > 1 || value.length == 0) {
      console.log(`handleSearchChange:${search}`);

      setSearch(value);
    }
  }
  function handleComboChange(newValue) {
    setCombo(newValue);
  }

  useEffect(() => {
    if (search || search == "") {
      filterData();
    }
  }, [search]);
  useEffect(() => {
    if (combo) {
      setData();
    } else {
      getData();
    }
  }, [combo]);

  useEffect(() => {
    getData();
  }, [page]);
  const columns = [
    {
      field: "id",
      width: 70,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "userId",
      headerName: "userId",
      width: 130,
      sortable: false,
      headerAlign: "center",
    },

    {
      field: "title",
      width: 300,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "Search",
      width: 200,
      sortable: false,

      renderHeader: () => {
        return (
          <Box width="auto" display="flex" justifyContent="flex-start">
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={(evt) => {
                handleSearchChange(evt.target.value);
              }}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <Box width="auto" display="flex" justifyContent="flex-start">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allData}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(allData) => (allData.title ? allData.title : "")}
          sx={{ width: 450, mb: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Please Select a User..." />
          )}
          onChange={(evt, newValue) => {
            handleComboChange(newValue);
          }}
        />
      </Box>

      <DataGrid
        sx={{ p: 1 }}
        columns={columns}
        pageSize={perPage}
        rows={row}
        onPageChange={(page) => setPage(page + 1)}
        onPageSizeChange={(pageSize) => setTotalPages(pageSize)}
        rowCount={total}
        enableRangeSelection={true}
        disableColumnMenu
        hideFooterSelectedRowCount
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Box display="flex" alignItems="center">
        <Typography>
          Page {page + 1} of {pageCount}
        </Typography>
        <Pagination
          color="primary"
          count={pageCount}
          page={page + 1}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
      </Box>
    );
  }

  function getData() {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?page=${page}`)
      .then((response) => {
        console.log(response);

        setAllData(response.data);
        setRow(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  function filterData() {
    if (search) {
      let newList = allData.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
      console.log(newList);
      setRow(newList);
    } else {
      getData();
    }
  }
  function setData() {
    if (combo) {
      console.log(combo.title.length);
      setRow([combo]);
      console.log(combo);
    } else {
      getData();
    }
  }
}
