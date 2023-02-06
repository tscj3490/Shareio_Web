import { Outlet, Route } from 'react-router-dom'
import Navigation from './navigation'
import styled from "styled-components";

const MainLayoutRoute = () => {    
    return (
        <Wrapper>
            <div className='main-wrapper'>
                <Navigation />
                <Outlet />
            </div>
        </Wrapper>
    )
};
  
export default MainLayoutRoute;

const Wrapper = styled.div`
    .main-wrapper {
        background: #000000;
        border-radius: 40px;
        width: 100%;
    }
`;