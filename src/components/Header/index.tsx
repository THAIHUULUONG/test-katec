import { FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";
import { useLogout } from "../../hook/useLogout";
import { Div } from "../CssGlobel";
import Tooltip from "../Tooltip";

const Header = () => {
  const dataAuth = JSON.parse(localStorage.getItem('dataAuth') as string);
  const {handleLogout} = useLogout()

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
                    <Tooltip toolTipText='Đăng xuất'><CsFaSignOutAlt onClick={handleLogout}/></Tooltip>
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
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media only screen and (max-width: 480px){
  width: 117%;
}
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
const CsFaSignOutAlt = styled(FaSignOutAlt)`
  &:hover {
    transform: scale(1.3);
  }
  &:hover Span {
    visibility: visible;
  }
`;
