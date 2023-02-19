import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  InputAdornment
} from "@mui/material";
// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

// project imports
import { KeyedObject } from "types";
import { gridSpacing } from "store/constant";
import { IconSearch } from "@tabler/icons";
import MainCard from "ui-component/cards/MainCard";
import Moment from 'moment';
import IBreadcrumsCustom from "ui-component/breadcrums";

let originalRows: any = [];

// table data
function createData(
  _id: string,
  number: number,
  name: string,
  projectType: string,
  nft: string,
  nftIssueAt: Date
) {
  if (projectType == "1") {
    projectType = "Doanh Nghiệp";
  } else if (projectType == "2") {
    projectType = "Quỹ";
  } else if (projectType == "3") {
    projectType = "Cá nhân";
  }
  return { _id, number, name, projectType, nft, nftIssueAt };
}

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StampDashBoard(props: {
  [x: string]: any;
  projectItem: any;
}) {

  const [formValues, setFormValues] = useState([] as any);

  //const [index, setIndex] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<any[]>(originalRows);
  const [select] = useState("0");
  const [selectIsActive] = useState("0");
  const [selectAcceptDate] = useState("0");
  const [search, setSearch] = useState("");
  //const [projectDetails, setProjectDetails] = useState({});
  //const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    generateoriginalRows();
  }, [])

  useEffect(() => {
    if (props && props.projectItem) {
      setFormValues([...props.projectItem]);
    }
  }, [props]);

  useEffect(() => {
    generateoriginalRows();
  }, [formValues]);

  let filteredRows: any = [];

  useEffect(() => {
    filteredRows = originalRows.filter((row: any) => {
      return row.name.toLowerCase().includes(search.toLowerCase());
    });
    if (select !== "0") {
      let temp = "";
      if (select == "1") {
        temp = "Doanh Nghiệp";
      } else if (select == "2") {
        temp = "Quỹ";
      } else if (select == "3") {
        temp = "Cá nhân";
      }
      filteredRows = filteredRows.filter((row: any) => {
        return row.projectType.toLowerCase().includes(temp.toLowerCase());
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
    if (selectAcceptDate !== "0") {
      if (selectAcceptDate == "1") {
        var endDate = new Date();
        console.log(endDate);
        let yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        console.log(yesterday);
        filteredRows = filteredRows.filter((row: any) => {
          var date = new Date(row.acceptDate);
          return date >= yesterday && date <= endDate;
        });
      } else if (selectAcceptDate == "2") {
      } else if (selectAcceptDate == "3") {
      } else if (selectAcceptDate == "4") {
      }
    }
    setRows(filteredRows);
  }, [select, search, selectIsActive, selectAcceptDate]);

  const generateoriginalRows = () => {
    let number = 1;
    originalRows.length = 0;
    for (let i = 0; i < formValues.length; i++) {
      originalRows.push(
        createData(
          formValues[i]._id,
          number,
          formValues[i].name,
          formValues[i].projectType,
          formValues[i].nft,
          formValues[i].nftIssueAt
        )
      );
      number += 1;
    }
    //console.log("ar: " + originalRows._id)
    setRows(originalRows);

  };

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
  };

  const handlePageChange = ({ selected }: any) => {
    setPage(selected);
  };

  const handleToggle = async (id: string) => {
    navigate({
      pathname: `/admin/project-stamp/${id}`,
    });
  };

  const convertDate = (dateInput: Date) => {
    return Moment(new Date(dateInput)).format('DD-MM-YYYY');
  }
  const goToIssuePage = () => {
    navigate({
      pathname: `/admin/project-stamp/issue`,
    });
  };

  return (
    <>
      {/* <BannerAdmin></BannerAdmin> */}
      <IBreadcrumsCustom
        profile="Con dấu NFT"
        mainProfile="Danh sách con dấu NFT"
        link="/admin/project-stamp"
      />
      <MainCard >
        <Button variant="contained" onClick={goToIssuePage}>Tạo mới</Button>
        <Grid
          container
          spacing={gridSpacing}
          sx={{ mt: 2, flexWrap: "nowrap", justifyContent: "space-between" }}
        >
          <Grid item xs={12} lg={4}>
            <Grid item>
              <TextField
                placeholder="Search..."
                onChange={(e) => {
                  requestSearch(e.target.value);
                  handlePageChange({ selected: 0 });
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>

        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Đơn vị</TableCell>
                <TableCell align="left">Loại đơn vị</TableCell>
                <TableCell align="left">Loại con dấu NFT</TableCell>
                <TableCell align="left">Ngày phát hành</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: KeyedObject) => (
                  <TableRow
                    onClick={() => handleToggle(row._id)}
                    sx={{ py: 3 }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.nft}
                  >
                    {/* <Link style={{width: '100%'}} to={`project/detail/${row._id}?projectType=${row.projectType}`}> */}
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.projectType}</TableCell>
                    <TableCell align="left">Passport of Blockchain</TableCell>
                    <TableCell align="left">{convertDate(row.nftIssueAt)}</TableCell>
                    {/* </Link> */}
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
        />
      </MainCard>
    </>
  );
}

