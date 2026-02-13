import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export type ViewType = 'mystery-country' | 'find-neighbours' | 'stats';

interface NavigationProps {
    activeView: ViewType;
    onNavigate: (view: ViewType) => void;
}

function Navigation({ activeView, onNavigate }: NavigationProps) {
    const [expanded, setExpanded] = useState(false);

    const handleNavClick = (view: ViewType) => {
        setExpanded(false);
        onNavigate(view);
    };

    return (
        <Navbar
            bg='dark'
            variant='dark'
            expand='lg'
            className='mb-3'
            expanded={expanded}
            onToggle={(expanded) => setExpanded(expanded)}
        >
            <Container>
                <Navbar.Brand onClick={() => handleNavClick('mystery-country')}>Globe Guesser</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link
                            active={activeView === 'mystery-country'}
                            onClick={() => handleNavClick('mystery-country')}
                        >
                            Mystery Country
                        </Nav.Link>
                        <Nav.Link
                            active={activeView === 'find-neighbours'}
                            onClick={() => handleNavClick('find-neighbours')}
                        >
                            Find Neighbours
                        </Nav.Link>
                        <Nav.Link active={activeView === 'stats'} onClick={() => handleNavClick('stats')}>
                            Stats
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
