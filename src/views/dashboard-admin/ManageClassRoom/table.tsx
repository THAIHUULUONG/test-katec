import {
  Alert,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons";
import * as React from "react";
import { useEffect, useState } from "react";
import { gridSpacing } from "store/constant";
import styled from "styled-components";
import { KeyedObject } from "types";
import IBreadcrumsCustom from "ui-component/breadcrums";
import MainCardV2 from "ui-component/cards/MainCardV2";
import AlertItemDelete from "views/application/kanban/Board/AlertItemDelete";
import ModalAddClassRoom from "./ModalAddClassRoom";
import { GridCloseIcon } from "@mui/x-data-grid";
import ModalAddUpdateClassRoom from "./ModalAddUpdateClassRoom";

let originalRows: any = [];

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable(props: {
  [x: string]: any;
  projectItem: any;
}) {
  const [formValues, setFormValues] = useState([] as any);
  const [formValuesRole, setFormValuesRole] = useState([] as any);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<any[]>(originalRows);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (props && props.projectItem) {
      setFormValues([...props.projectItem]);
    }
   
  }, [props]);

  let filteredRows: any = [];

  useEffect(() => {
    ;
    filteredRows = formValues.filter((row: any) => {
      return row.user_name.toLowerCase().includes(search.toLowerCase());
    });
    setRows(filteredRows);
  }, [search, formValues]);


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
  const [openModalDelete, setopenModalDelete] = useState(false);
  const [openModalAddClassRoom, setopenModalAddClassRoom] = useState(false);
  const [openModalUpdateClassRoom, setopenModalUpdateClassRoom] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setOpenAlert(false)
    }, 2000)
    return () => {
      clearTimeout(timeId)
    }
  }, [formValues]);

  

  return (
    <>
      <IBreadcrumsCustom profile="Danh sách người dùng" mainProfile="Danh sách người dùng" link="/manage-user" />
      <MainCardV2 title="Danh sách người dùng" handleOpen={() => setopenModalAddClassRoom(true)}>
        <Grid
          container
          spacing={gridSpacing}
          sx={{ flexWrap: "nowrap", justifyContent: "space-between" }}
        >
          <Grid item xs={12} lg={3}>
            <Grid item>
              <TextField
                placeholder="Tên người dùng..."
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
        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>SỐ THỨ TỰ</TableCell>
                <TableCell align="center">TÊN LỚP</TableCell>
                <TableCell align="center">TÊN NHÓM</TableCell>
                <TableCell align="center">TÊN NGƯỜI DÙNG</TableCell>
                <TableCell align="center">CHỈNH SỬA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: KeyedObject, index: number) => (
                  <TableRow
                    sx={{ py: 3 }}  
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.class_name}</TableCell>
                    <TableCell align="center">{row.group_name}</TableCell>
                    <TableCell align="center">{row.user_name}</TableCell>
                    <TableCell align="center">
                      <CsIconEdit onClick={() => setopenModalUpdateClassRoom(true)}/>
                      <CsIconTrash onClick={() => setopenModalDelete(true)} />
                      <ModalAddUpdateClassRoom title={`Cập nhật người dùng ${row.user_name}`} open={openModalUpdateClassRoom} handleClose={() => setopenModalUpdateClassRoom(false)} handleAlert={(e) => setOpenAlert(e)} dataClassRoom={formValues[index]} id_user={row.id}/>
                    </TableCell>
                    <AlertItemDelete title={row.user_name} open={openModalDelete} handleAlert={(e) => setOpenAlert(e)} handleClose={() => setopenModalDelete(false)} id_user={row.id}/>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalAddClassRoom title={'Thêm người dùng'} open={openModalAddClassRoom} handleClose={() => setopenModalAddClassRoom(false)} handleAlert={(e) => setOpenAlert(e)} dataRole={formValuesRole}/>
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
      </MainCardV2>
      <Collapse in={openAlert} sx={{position: 'absolute', top: '50px', right:'20px', zIndex: 10000}}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpenAlert(false)}
              >
                <GridCloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Close me!
          </Alert>
        </Collapse>
    </>
  );
}

const CsIconEdit = styled(IconEdit)`
   &:hover {
    transform: scale(1.5);
  }
  color: #2196F3;
`
const CsIconTrash = styled(IconTrash)`
   &:hover {
    transform: scale(1.5);
  }
  color: #fac003;
`