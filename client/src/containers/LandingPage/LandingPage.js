import React from 'react';
import Container from '@material-ui/core/Container';

// components
import { Homepage } from '../../components/Homepage/Homepage';
import { LandingNavbar } from '../../components/Navbar/Navbar';
import './LandingPage.module.scss';

const LandingPage = ({history}) => {
    return (
        <React.Fragment>
           <LandingNavbar history={history} />
            <Container>
                <Homepage/>
            </Container>
        </React.Fragment>
    )
}

export default LandingPage;