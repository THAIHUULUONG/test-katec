import { FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";
import { Div } from "../CssGlobel";
import Tooltip from "../Tooltip";

const Header = () => {
  const dataAuth = JSON.parse(localStorage.getItem('dataAuth') as string);

    return (
        <CsDiv>
            <Logo src="https://katec.vn/images/logo/logo_katec.png" alt="Logo" />
            <Div width="auto" alignItems="space-around">
                <Div width="auto" alignItems="center" justifyContent="center" padding='0 10px'>
                    <Name>{dataAuth?.user_name}</Name>
                </Div>
                <Div width="auto" alignItems="center">
                    <Avata src="https://colorlib.com/polygon/elaadmin/images/admin.jpg" />
                </Div>
                <Div width="100px" alignItems="center" justifyContent="center">
                    <Tooltip toolTipText='Đăng xuất'><CsFaSignOutAlt /></Tooltip>
                </Div>
            </Div>
        </CsDiv>
    );
};

export default Header;

const CsDiv = styled(Div)`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  border-bottom: 1px solid #e2dada;
  padding: 10px;
`;
const Logo = styled.img`
  width: auto;
  height: auto;
`;
const Avata = styled.img`
  width: auto;
  height: auto;
  border-radius: 50px;
`;
const Name = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  visibility: hidden;
  width: 120px;
  backgroundcolor: #000;
  color: #fff;
  textalign: center;
  borderradius: 6px;
  padding: 5px 0;
  position: absolute;
  zindex: 1;
  bottom: 150%;
  left: 50%;
  marginleft: -60px;
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    marginleft: -5px;
    borderwidth: 5px;
    borderstyle: solid;
    bordercolor: black transparent transparent transparent;
  }
`;
const CsFaSignOutAlt = styled(FaSignOutAlt)`
  &:hover {
    transform: scale(1.3);
  }
  &:hover Span {
    visibility: visible;
  }
`;
