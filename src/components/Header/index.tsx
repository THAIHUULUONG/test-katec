import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children?: ReactNode
    // any props that come into the component
}
const Header = ({children}:Props) => {
    return (
        <Div>
           <Logo src='https://katec.vn/images/logo/logo_katec.png' alt='Logo'/>
           <Contact>
                {/* <FaSearch/> */}
                <Name>Username</Name>
                <Avata src='https://colorlib.com/polygon/elaadmin/images/admin.jpg'/>
           </Contact>
        </Div>
    );
};

export default Header;

const Div = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    border-bottom: 1px solid #e2dada;
    padding: 10px;
`
const Logo = styled.img`
    width: auto;
    height: auto;
`
const Avata = styled.img`
    width: auto;
    height: auto;
    border-radius: 50px;
`
const Name = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Contact = styled.div`
    width: 250px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`