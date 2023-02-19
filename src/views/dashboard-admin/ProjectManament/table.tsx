import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { KeyedObject } from "types";
import { gridSpacing } from "store/constant";
import { IconSearch } from "@tabler/icons";
import MainCard from "ui-component/cards/MainCard";
import IBreadcrumsCustom from "ui-component/breadcrums";
import Moment from 'moment';


const projectType = [
  {
    value: "0",
    label: "Loại dự án",
  },
  {
    value: "1",
    label: "Doanh Nghiệp",
  },
  {
    value: "2",
    label: "Quỹ",
  },
  {
    value: "3",
    label: "Cá nhân",
  },
];

const isActive = [
  {
    value: "0",
    label: "Tình trạng",
  },
  {
    value: "1",
    label: "Hoạt động",
  },
  {
    value: "2",
    label: "Ẩn",
  },
];

const createdAt = [
  {
    value: "0",
    label: "Ngày gửi đơn",
  },
  {
    value: "1",
    label: "Hôm nay",
  },
  {
    value: "2",
    label: "7 ngày gần đây",
  },
  {
    value: "3",
    label: "30 ngày gần đây",
  },
];

const convertDate = (dateInput: Date) => {
  return Moment(new Date(dateInput)).format('DD-MM-YYYY');
}

let originalRows: any = [];

// table data
function createData(
  _id: string,
  number: number,
  name: string,
  projectType: string,
  tmpActive: boolean,
  createdAt: Date
) {
  let isActive;
  if (tmpActive == true) {
    isActive = "Hoạt động";
  } else if (tmpActive == false) {
    isActive = "Ẩn";
  }
  return { _id, number, name, projectType, isActive, createdAt };
}

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable(props: {
  [x: string]: any;
  projectItem: any;
}) {
  const [formValues, setFormValues] = useState([] as any);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<any[]>(originalRows);
  const [select, setSelect] = useState("0");
  const [selectIsActive, setSelectIsActive] = useState("0");
  const [selectCreatedAt, setSelectCreatedAt] = useState("0");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(props && props.projectItem){
      setFormValues([...props.projectItem]);
    }
  }, [props]);

  useEffect(() => {
    getOriginalRows()
  }, [formValues]);

  let filteredRows: any = [];

  useEffect(() => {
    filteredRows = originalRows.filter((row: any) => {
      return row.name.toLowerCase().includes(search.toLowerCase());
    });
    if (select !== "0") {
      filteredRows = filteredRows.filter((row: any) => {

        return row.projectType == select;
      });
    }
    if (selectIsActive !== "0") {
      let temp = "";
      if (selectIsActive == "1") {
        temp = "Hoạt động";
      } else if (selectIsActive == "2") {
        temp = "Ẩn";
      }
      filteredRows = filteredRows.filter((row: any) => {
        return row.isActive.toLowerCase().includes(temp.toLowerCase());
      });
    }
    if (selectCreatedAt !== "0") {
      if (selectCreatedAt == "1") {
        let endDate = new Date();
        filteredRows = filteredRows.filter((row: any) => {
          let date = new Date(row.createdAt);
          return date.getDate() == endDate.getDate();
        });
      } else if (selectCreatedAt == "2") {
        let endDate = new Date();
        let weekAgo = new Date(
          new Date().setDate(new Date().getDate() - 7)
        );
        filteredRows = filteredRows.filter((row: any) => {
          let date = new Date(row.createdAt);
          return date >= weekAgo && date <= endDate;
        });
      } else {
        let endDate = new Date();
        let monthAgo = new Date(
          new Date().setDate(new Date().getDate() - 30)
        );
        filteredRows = filteredRows.filter((row: any) => {
          let date = new Date(row.createdAt);
          return date >= monthAgo && date <= endDate;
        });
      }
    }
    setRows(filteredRows);
  }, [select, search, selectIsActive, selectCreatedAt]);

  function getOriginalRows() {
    let number = 1;
    originalRows.length = 0;
    for (let i = 0; i < formValues.length; i++) {
      originalRows.push(
        createData(
          formValues[i]._id,
          number,
          formValues[i].name,
          formValues[i].projectType,
          formValues[i].isActive,
          formValues[i].createdAt
        )
      );
      number += 1;
    }
    setRows(originalRows);
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
  ) => {
    setRowsPerPage(+event?.target?.value!);
    setPage(0);
  };

  const requestSearch = (searchedVal: string) => {
    setSearch(searchedVal);
    setPage(0);
  };
  const handlePageChange = ({ selected }: any) => {
    setPage(selected);

  };
  const handleSelect = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSelect(value);
    setPage(0);
  };
  const handleIsActive = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSelectIsActive(value);
    setPage(0);
  };
  const handleCreatedAt = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSelectCreatedAt(value);
    setPage(0);
  };
  const handleToggle = async (id: string, projectType: string) => {
    navigate({
      pathname: `/project/detail/${id}`,
      search: `?projectType=${projectType}`

    });
  };

  const getProjectType = (idType: string) => {
    let projectTypeLabel = "";
    // projectType.find(item => {
    //   if (item.value == idType) {
    //     projectTypeLabel = item.label;
    //   }
    // })
    projectType.forEach(item => {
      if (item.value == idType) {
        projectTypeLabel = item.label;
      }
    });
    return projectTypeLabel;
  }

  return (
    <>
      <IBreadcrumsCustom profile="Quản lý hồ sơ" mainProfile="Danh sách hồ sơ" link="/manage-project" />
      <MainCard title="Quản lý hồ sơ">
        <Grid
          container
          spacing={gridSpacing}
          sx={{ flexWrap: "nowrap", justifyContent: "space-between" }}
        >
          <Grid item xs={12} lg={3}>
            <Grid item>
              <TextField
                placeholder="Tên dự án..."
                onChange={(e) => {
                  requestSearch(e.target.value);
                  handlePageChange({ selected: 0 });
                }}
                size="small"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch style={{
                        height: "18px",
                        width: "18px"
                      }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                defaultValue="0"
                name="projectType"
                id="projectType"
                value={select}
                onChange={handleSelect}
              >
                {projectType.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                defaultValue="0"
                name="isActive"
                id="isActive"
                value={selectIsActive}
                onChange={handleIsActive}
              >
                {isActive.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                defaultValue="0"
                name="createdAt"
                id="createdAt"
                value={selectCreatedAt}
                onChange={handleCreatedAt}
              >
                {createdAt.map((item, index) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>SỐ THỨ TỰ</TableCell>
                <TableCell align="left">TÊN</TableCell>
                <TableCell align="right">LOẠI DỰ ÁN</TableCell>
                <TableCell align="right">TÌNH TRẠNG</TableCell>
                <TableCell align="right">NGÀY GỬI ĐƠN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: KeyedObject) => (
                  <TableRow
                    onClick={() => handleToggle(row._id, row.projectType)}
                    sx={{ py: 3 }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{getProjectType(row.projectType)}</TableCell>
                    <TableCell align="right">{row.isActive}</TableCell>
                    <TableCell align="right">{convertDate(row.createdAt)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Hiển thị mỗi trang"}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />
      </MainCard>
    </>

  );
}
