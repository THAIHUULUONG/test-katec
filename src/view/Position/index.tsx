import { Button, Grid, Modal } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import styled from "styled-components";
import { Div } from "../../components/CssGlobel";
import { ShowAllPosition } from "../../hook/showAllPosition";
import ModalCreate from "../Dashboard/components/ModalCreate";


const Position = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {dataAllPosition} = ShowAllPosition()
  console.log('viewRole', dataAllPosition);

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
        <TableInfo>ád</TableInfo>
        <TableInfo>ád</TableInfo>
        <TableInfo>ád</TableInfo>
      </Div>
      <Grid >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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

export default Position;

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
