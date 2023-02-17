import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { dataAuth, tokenAuth } from "./config";
import Dashboard from "./view/Dashboard";
import Home from "./view/Home/index";
import Login from "./view/Login";
import Position from "./view/Position";

export default function App() {
  return (
    <Div>
      {dataAuth?.access_token === tokenAuth ?
        <>
          <Header />
          <Test>
            <Menu >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/position" element={<Position />} />
              </Routes>
            </Menu>
          </Test>
        </>
        :
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      }
    </Div>
  );
}

const Div = styled.div`
 width: 100%;
 height: 100%;
`
const Test = styled.div`
  width: 100%;
  height: 100%;
  background: gray
  display: flex;
  flex-direction: row;

`