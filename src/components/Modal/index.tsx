import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Div, Text } from '../CssGlobel';
import styled from 'styled-components';
import { FaRegWindowClose } from 'react-icons/fa';

interface Props {
    isShowing?: boolean;
    hide?:() => void;
    children?: string | JSX.Element | JSX.Element[]
    title?: string | JSX.Element | JSX.Element[]
  }

const Modal = ({ isShowing, hide, children, title }:Props) => isShowing ? ReactDOM.createPortal(  
  <React.Fragment>
    <ModalOverlay />
    <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
      <CsModal>
        <Tittle>
          <Text frontSize={26} frontWeight={500}>{title}</Text>
          <CsFaRegWindowClose onClick={hide}/>
        </Tittle>
        <Body>
          {children}
        </Body>
      </CsModal>
    </ModalWrapper>
  </React.Fragment>, document.body
) : null;

export default Modal;

const ModalOverlay = styled(Div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .5;
  padding-top: 2rem;
`
const ModalWrapper = styled(Div)`
 position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`
const CsModal = styled(Div)`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-radius: 3px;
  width: 100%;
  height: auto;
  max-width: 500px;
  max-height: 90%;
  min-height: 40%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`
const Tittle = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
  padding: 5px;
`
const Body = styled.div`
  margin-top: 20px;
`
const CsFaRegWindowClose = styled(FaRegWindowClose)`
  position: absolute;
  right: 10px;
  font-size: 30px;
`