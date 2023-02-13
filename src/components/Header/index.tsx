import React, {ReactNode} from 'react';
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
            a
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
    border-bottom: 1px solid #FAFAFA;
    padding: 10px;
`
const Logo = styled.img`
    width: auto;
    height: auto;
`
const Contact = styled.div`
    width: 300px;
    height: 100%;
    border: 1px solid #FAFA;
`