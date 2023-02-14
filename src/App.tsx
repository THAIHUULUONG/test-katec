import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Dashboard from "./view/Dashboard";
import Home from "./view/Home/index";
import Login from "./view/Login";


export default function App() {
  return (
    <Div>
      {/* <Header /> */}
      {/* <Test>
        <Menu >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Home />} />
          <Route path="/products" element={<Login />} />
        </Routes>
        </Menu>
      </Test> */}
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
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