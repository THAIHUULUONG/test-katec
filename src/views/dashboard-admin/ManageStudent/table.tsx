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
import ModalAddStudent from "./ModalAddStudent";
import { GridCloseIcon } from "@mui/x-data-grid";
import ModalAddUpdateStudent from "./ModalAddUpdateStudent";
import AlertItemDeleteStudent from "views/application/kanban/Board/AlertItemDeleteStudent";

let originalRows: any = [];

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable(props: {
  [x: string]: any;
  projectItem: any;
  dataClassRoom: any;
}) {
  const [formValues, setFormValues] = useState([] as any);
  const [formValuesClassRoom, setFormValuesClassRoom] = useState([] as any);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<any[]>(originalRows);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (props && props.projectItem) {
      setFormValues([...props.projectItem]);
    }
    if (props && props.dataClassRoom) {
      setFormValuesClassRoom([...props.dataClassRoom]);
    }
   
  }, [props]);

  let filteredRows: any = [];

  useEffect(() => {
    ;
    filteredRows = formValues.filter((row: any) => {
      return row.student_name.toLowerCase().includes(search.toLowerCase());
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
  const [openModalAddStudent, setopenModalAddStudent] = useState(false);
  const [openModalUpdateStudent, setopenModalUpdateStudent] = useState(false);
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
      <IBreadcrumsCustom profile="Danh sách học sinh" mainProfile="Danh sách học sinh" link="/manage-student" />
      <MainCardV2 title="Danh sách học sinh" handleOpen={() => setopenModalAddStudent(true)}>
        <Grid
          container
          spacing={gridSpacing}
          sx={{ flexWrap: "nowrap", justifyContent: "space-between" }}
        >
          <Grid item xs={12} lg={3}>
            <Grid item>
              <TextField
                placeholder="Tên học sinh..."
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
                <TableCell align="center">TÊN HỌC SINH</TableCell>
                <TableCell align="center">GIỚI TÍNH</TableCell>
                <TableCell align="center">TÊN LỚP</TableCell>
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
                    <TableCell align="center">{row.student_name}</TableCell>
                    <TableCell align="center">{row.gender_name}</TableCell>
                    <TableCell align="center">{row.class_name}</TableCell>
                    <TableCell align="center">
                      <CsIconEdit onClick={() => setopenModalUpdateStudent(true)}/>
                      <CsIconTrash onClick={() => setopenModalDelete(true)} />
                      <ModalAddUpdateStudent dataClassRoom={formValuesClassRoom} title={`Cập nhật học sinh ${row.student_name}`} open={openModalUpdateStudent} handleClose={() => setopenModalUpdateStudent(false)} handleAlert={(e) => setOpenAlert(e)} dataStudent={formValues[index]} id_student={row.id}/>
                    </TableCell>
                    <AlertItemDeleteStudent title={row.student_name} open={openModalDelete} handleAlert={(e) => setOpenAlert(e)} handleClose={() => setopenModalDelete(false)} id_student={row.id}/>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalAddStudent title={'Thêm học sinh'} open={openModalAddStudent} handleClose={() => setopenModalAddStudent(false)} handleAlert={(e) => setOpenAlert(e)} dataClassRoom={formValuesClassRoom}/>
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