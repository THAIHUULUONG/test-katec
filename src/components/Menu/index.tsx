import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FaDashcube } from "react-icons/fa";
import styled from 'styled-components';
import { Text } from '../CssGlobel';

interface Props {
    children?: ReactNode
    // any props that come into the component
}
const Menu = ({ children }: Props) => {
    return (
        <Div>
            <Flex>
                <LeftMenu>
                    <ul className="nav nav-pills flex-column">
                        <li>
                            <Link to="/" className="nav-link"><FaDashcube/> Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link"> <FaDashcube/>Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link"> <FaDashcube/>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customers" className="nav-link"><FaDashcube/>Customers</Link>
                        </li>
                    </ul>
                    <Text frontSize={26} frontWeight={900}>UI</Text>
                    <ul className="nav nav-pills flex-column">
                        <li>
                            <Link to="/" className="nav-link"><FaDashcube/> Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link"> <FaDashcube/>Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link"> <FaDashcube/>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customers" className="nav-link"><FaDashcube/>Customers</Link>
                        </li>
                    </ul>
                </LeftMenu>
                <Children>
                    {children}
                </Children>
            </Flex>
        </Div>
    );
};

export default Menu;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`
const Flex = styled.div`
    display: flex;
    width: 100%;
    height: auto;
`
const LeftMenu = styled.div`
    width: 300px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

`
const Children = styled.div`
    width: 100%;
    height: 100%;
`
const Li = styled.div`
    background: gray
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #FAFA;
`