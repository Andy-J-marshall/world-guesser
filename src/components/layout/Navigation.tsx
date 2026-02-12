import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export type ViewType = 'country-guesser' | 'border-finder' | 'stats';

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
                <Navbar.Brand onClick={() => handleNavClick('country-guesser')}>Fun With Countries</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link
                            active={activeView === 'country-guesser'}
                            onClick={() => handleNavClick('country-guesser')}
                        >
                            Country Guesser
                        </Nav.Link>
                        <Nav.Link
                            active={activeView === 'border-finder'}
                            onClick={() => handleNavClick('border-finder')}
                        >
                            Border Finder
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
