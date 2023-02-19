import * as React from "react";
import { useEffect, useState } from "react";
import { 
  Grid,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem, 
  FormControl,
  InputAdornment,
  IconButton,
  Tooltip,
  Toolbar,
  TableSortLabel,
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
import { EnhancedTableHeadProps, EnhancedTableToolbarProps, KeyedObject } from "types";
import { gridSpacing } from "store/constant";
import { IconSearch } from "@tabler/icons";
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import {useNavigate} from 'react-router-dom';
import MainCard from "ui-component/cards/MainCard";
import Moment from 'moment';
import IBreadcrumsCustom from "ui-component/breadcrums";
//import _ from "lodash";
// table columns
interface ColumnProps {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "inherit" | "center" | "justify" | undefined;
  format?: (value: Date | number) => string | boolean;
}
const projectType = [
  {
    value: "0",
    label: "Loại dự án",
  },
  {
    value: "1",
    label: "Doanh nghiệp",
  },
  {
    value: "2",
    label: "Quỹ đầu tư",
  },
  {
    value: "3",
    label: "Cá nhân",
  },
];
const applicationType = [
  {
    value: "0",
    label: "Loại đơn",
  },
  {
    value: "1",
    label: "Xác thực dự án",
  },
  {
    value: "2",
    label: "Chỉnh sửa thông tin",
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
let _id="";
const columns: ColumnProps[] = [
  { id: "number", label: "SỐ THỨ TỰ"},
  { id: "name", label: "TÊN",align: "left",},
  {
    id: "projectType",
    label: "LOẠI DỰ ÁN",
    align: "right",
    // minWidth:200
  },
  {
    id: "applicationType",
    label: "LOẠI ĐƠN",
    align: "right",
  },
  {
    id: "createdAt",
    label: "NGÀY GỬI ĐƠN",
    align: "right",
  }
];
let originalRows: any = [];
function createData(
  _id:string,
  number: number,
  name: string,
  projectType: string,
  applicationType: string,
  createdAt: Date
) {
  if (projectType == "1") {
    projectType = "Doanh nghiệp";
  } else if (projectType == "2") {
    projectType = "Quỹ đầu tư";
  } else if (projectType == "3") {
    projectType = "Cá nhân";
  } 

  if (applicationType == "1") {
    applicationType = "Xác thực dự án";
  } else if (applicationType == "2") {
    applicationType = "Chỉnh sửa thông tin";
  }
  return {_id,number,name,projectType, applicationType, createdAt};
}
interface CustomerListEnhancedTableHeadProps extends EnhancedTableHeadProps {
  selected: string[];
}
const EnhancedTableToolbar = ({ numSelected }: EnhancedTableToolbarProps) => (
  <Toolbar
      sx={{
          p: 0,
          pl: 1,
          pr: 1,
          ...(numSelected > 0 && {
              color: (theme) => theme.palette.secondary.main
          })
      }}
  >
      {numSelected > 0 ? (
          <Typography color="inherit" variant="h4">
              {numSelected} Selected
          </Typography>
      ) : (
          <Typography variant="h6" id="tableTitle">
              Nutrition
          </Typography>
      )}
      <Box sx={{ flexGrow: 1 }} />
      {numSelected > 0 && (
          <Tooltip title="Delete">
              <IconButton size="large">
                  <DeleteIcon fontSize="small" />
              </IconButton>
          </Tooltip>
      )}
  </Toolbar>
);
// ==============================|| TABLE - STICKY HEADER ||============================== //
function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  selected
}: CustomerListEnhancedTableHeadProps) {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
      onRequestSort(event, property);
  };
  return (
      <TableHead>
          <TableRow>              
              {numSelected > 0 && (
                  <TableCell padding="none" colSpan={6}>
                      <EnhancedTableToolbar numSelected={selected.length} />
                  </TableCell>
              )}
              {numSelected <= 0 &&
                  columns.map((headCell) => (
                      <TableCell
                          key={headCell.id}
                          align={headCell.align}
                      >
                          <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : 'asc'}
                              onClick={createSortHandler(headCell.id)}
                          >
                              {headCell.label}
                              {orderBy === headCell.id ? (
                                  <Box component="span" sx={visuallyHidden}>
                                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                  </Box>
                              ) : null}
                          </TableSortLabel>
                      </TableCell>
                  ))}
              {/* {numSelected <= 0 && (
                  <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                      THAO TÁC
                  </TableCell>
              )} */}
          </TableRow>
      </TableHead>
  );
}// ########
export default function ProjectWait(props: {
  [x: string]: any;
  projectItem: any;
  setProjectItem:React.Dispatch<React.SetStateAction<{}>>
}) {
  const [formValues, setFormValues] = useState([] as any);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<any[]>(originalRows);
  const [select, setSelect] = useState("0");
  const [selectapplicationType, setSelectapplicationType] = useState("0");
  const [selectcreatedAt, setSelectcreatedAt] = useState("0");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = React.useState<string[]>([]);
  useEffect(() => {
    if(props && props.projectItem){
      setFormValues([...props.projectItem]);
    }
  }, [props]);

  useEffect(()=> {
    getOriginalRows();
  },[formValues])
  let filteredRows: any = [];
  useEffect(() => {
    filteredRows = originalRows.filter((row: any) => {
      return row.name?.toLowerCase().includes(search.toLowerCase());
    });
    if (select !== "0") {
      let temp = "";
      if (select == "1") {
        temp = "Doanh nghiệp";
      } else if (select == "2") {
        temp = "Quỹ đầu tư";
      } else if (select == "3") {
        temp = "Cá nhân";
      } 
      filteredRows = filteredRows.filter((row: any) => {
        return row.projectType?.toLowerCase().includes(temp.toLowerCase());
      });
    }
    if (selectapplicationType !== "0") {
      let temp = "";
      if (selectapplicationType == "1") {
        temp = "Xác thực dự án";
      } else if (selectapplicationType == "2") {
        temp = "Chỉnh sửa thông tin";
      }
      
      filteredRows = filteredRows.filter((row: any) => {
        return row.applicationType?.toLowerCase().includes(temp.toLowerCase());
      });
    }
  if (selectcreatedAt !== "0") {
      if (selectcreatedAt == "1") {
        let endDate = new Date();
        filteredRows = filteredRows.filter((row: any) => {
          let date = new Date(row.createdAt);
          return date.getDate() == endDate.getDate();
        });
      } else if (selectcreatedAt == "2") {
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
  }, [select, search, selectapplicationType, selectcreatedAt,_id]);
function getOriginalRows(){
  let number = 1;
  originalRows.length = 0;
  for (let i = 0; i < formValues.length; i++) {
    originalRows.push(
      createData(
        formValues[i]._id,
        number,
        formValues[i].name,
        formValues[i].projectType,
        formValues[i].applicationType,
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
  };
  const handlePageChange = ({ selected }: any) => {
    setPage(selected);
  };
  const handleSelect = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSelect(value);
  };
  const handleapplicationType = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSelectapplicationType(value);
  };
  const handlecreatedAt = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSelectcreatedAt(value);
  };
// --------trieu------
const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.name);
      setSelected(newSelectedId);
      return;
  }
  setSelected([]);
};
const isSelected = (name: string) => selected.indexOf(name) !== -1;

const handleRequestSort = (event: React.SyntheticEvent<Element, Event>, property: string) => {
};
const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
const navigate = useNavigate();
const handleViewDetail =(id:string,projectType:string)=>{ 
  navigate({
    pathname: `/application/detail`,
    search: `?_id=${id}&projectType=${projectType}`
  });
}
const ConvertProjectTypeToNumber = (pj:any)=>{
  if (pj == "Doanh nghiệp") {
    pj = "1";
  } else if (pj == "Quỹ đầu tư") {
    pj = "2";
  } else if (pj == "Cá nhân") {
    pj = "3";
  }
   return pj; 
}
  return (
    <>
       <IBreadcrumsCustom profile="Hồ sơ chờ duyệt" mainProfile="Danh sách hồ sơ" link="/manage-application"/>
       <MainCard  title="Danh sách hồ sơ"   
       >        
      <Grid
        container
        spacing={gridSpacing}
        sx={{flexWrap: "nowrap", justifyContent: "space-between" }}
      >
        <Grid item xs={12} sm={3}>
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
                    <IconSearch style={{ height: "18px",
                    width:"18px"}} />
                  </InputAdornment>
                ),
              }} 
              fullWidth
              variant="outlined"
            />
         </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              defaultValue="0"
              name="projectType"
              id="projectType"
              value={select}
              onChange={handleSelect}
              
            >
              {projectType.map((item, index) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              defaultValue="0"
              name="applicationType"
              id="applicationType"
              value={selectapplicationType}
              onChange={handleapplicationType}
            >
              {applicationType.map((item, index) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              defaultValue="0"
              name="createdAt"
              id="createdAt"
              value={selectcreatedAt}
              onChange={handlecreatedAt}
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
      <TableContainer sx={{ maxHeight: 440,pt:2.5}}>
        <Table stickyHeader aria-label="sticky table">
        <EnhancedTableHead
                        numSelected={selected.length}                        
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        selected={selected}
                    />
          <TableBody>
                            {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row:KeyedObject, index) => {                            
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row._id);
                                return (
                                    <TableRow
                                       sx={{ py: 3 }}
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row._id}
                                        selected={isItemSelected}
                                        onClick={()=>handleViewDetail(row._id,ConvertProjectTypeToNumber(row.projectType))}
                                    >                                      
                                   {columns.map((column) => {
                                    const value = row[column.id];                                                                      
                                     return (<TableCell key={column.id} align={column.align}>
                                        {column.id==="createdAt"
                                          ? convertDate(value)
                                          : value}
                                      </TableCell>
                                 )    
                                   })
                                  }     
                                    {/* <TableCell align="center" sx={{ pr: 3 }}>
                                       <IconButton color="secondary" size="large" onClick={()=>handleViewDetail(row._id,ConvertProjectTypeToNumber(row.projectType))}>
                                           <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                       </IconButton>
                                   </TableCell> */}
                                    </TableRow>
                            )}
                      )}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
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
