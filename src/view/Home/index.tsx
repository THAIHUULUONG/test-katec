import { Button, Grid, Modal } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React from "react";
import styled from "styled-components";
import { Div, Text } from "../../components/CssGlobel";
import { ShowAllUser } from "../../hook/showAllUser";
import ModalCreate from "../Dashboard/components/ModalCreate";

const Home = () => {
  const {dataAllUser} = ShowAllUser()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Div
      height="100%"
      padding="30px"
      background="#F1F2F7"
      flexDirection="column"
    >
      <Div
        width="100%"
        padding="30px"
        justifyContent="flex-end"
      >
        <Button variant='outlined' onClick={handleOpen}>Thêm mới</Button>
      </Div>
      <Div
        width="100%"
        padding="30px"
        justifyContent="space-around"
      >
        <TableInfo>
          <PeopleAltIcon/>
          <Grid  height='100%' width='70%' alignItems='center' display='flex' justifyContent='center' flexDirection='column'>
            <Grid sx={{marginTop: '-20px', fontSize: '22px', fontWeight: 500}}> Tong so</Grid>
            <Grid sx={{marginTop: '10px', fontSize: '22px', fontWeight: 700}}> 10</Grid>
          </Grid>
        </TableInfo>
        <TableInfo>
          <PeopleAltIcon/>
          <Grid  height='100%' width='70%' alignItems='center' display='flex' justifyContent='center' flexDirection='column'>
            <Grid sx={{marginTop: '-20px', fontSize: '22px', fontWeight: 500}}> Tong so</Grid>
            <Grid sx={{marginTop: '10px', fontSize: '22px', fontWeight: 700}}> 10</Grid>
          </Grid>
        </TableInfo>
      </Div>
      <Grid >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="center">id_role</TableCell>
                <TableCell align="center">user_name</TableCell>
                <TableCell align="center">role_name</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataAllUser.map((items, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {items?.id}
                  </TableCell>
                  <TableCell align="center">{items?.id_role}</TableCell>
                  <TableCell align="center">{items?.user_name}</TableCell>
                  <TableCell align="center">{items?.role_name}</TableCell>
                  <TableCell align="center" sx={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
                    <CsAutoFixHighIcon color="info" onClick={handleOpen}/>
                    <CsDeleteForeverIcon color="warning" onClick={handleOpen}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}
        >
         <ModalCreate/>
        </Modal>
        </Grid>
      </Grid>
    </Div>
  );
};

export default Home;

const TableInfo = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
`;

const CsDeleteForeverIcon = styled(DeleteForeverIcon)`
  &:hover {
    transform: scale(1.5);
  }
`
const CsAutoFixHighIcon = styled(AutoFixHighIcon)`
  &:hover {
    transform: scale(1.5);
  }
`