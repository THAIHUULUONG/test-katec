import { FaLock, FaRegEye, FaRegEyeSlash, FaUserAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { Button, Div, FrameInput, Input, Text } from '../../components/CssGlobel';
import { useState } from 'react';


const Login = () => {

  const [typeInput, setTypeInput] = useState('password')

  return (
    <Div width='100vw' height='100vh' background='#fff' justifyContent='center' alignItems='center'>
      <FrameLogin>
        <Text frontSize={23} frontWeight={600}>Đăng nhập</Text>
        <FrameInput width='400px' height='50px' margin='130px 0px 0px 0px' alignItems='center' justifyContent='center'>
          <FaUserAlt/>
          <Input pattern="[A-Za-z]{3}" placeholder='Tài khoản'/>
        </FrameInput>
        <FrameInput width='400px' height='50px' margin='30px 0px 0px 0px' alignItems='center' justifyContent='center'>
          <FaLock/>
          <Input type={typeInput} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder='Mật khẩu'/>
          {typeInput === 'password' ?
          <FaRegEyeSlash onClick={()=> setTypeInput('text')}/>
          :
          <FaRegEye onClick={()=> setTypeInput('password')}/>
          }
        </FrameInput>
        <Button>Push</Button>
      </FrameLogin>
    </Div>
  );
};

export default Login;

const FrameLogin = styled(Div)`
  width: 500px;
  height: 500px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  display: flex;
  align-items: center;
  flex-direction: column;
`
