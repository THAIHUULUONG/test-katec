import React from 'react';
import { FaDashcube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
    children?: string | JSX.Element | JSX.Element[] | undefined
}
const Menu: React.FC<Props> = ({children }) => {
    return (
        <Div>
            <Flex>
                <LeftMenu>
                    <ul className="nav nav-pills flex-column">
                        <li>
                            <Link to="/" className="nav-link"><FaDashcube/> Quản lý người dùng</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/position" className="nav-link"> <FaDashcube/>Quản lý Chức vụ</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home" className="nav-link"> <FaDashcube/>Quản lý nhóm lớp học</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customers" className="nav-link"> <FaDashcube/>Quản lý lớp học</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customers" className="nav-link"><FaDashcube/>Quản lý học sinh</Link>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
const Children = styled.div`
    width: 100%;
    min-height: 90vh;
`
