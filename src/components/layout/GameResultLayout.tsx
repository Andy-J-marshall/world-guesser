import { ReactNode } from 'react';

interface GameResultLayoutProps {
    id: string;
    heroContent: ReactNode;
    actions: ReactNode;
    children?: ReactNode;
}

function GameResultLayout({ id, heroContent, actions, children }: GameResultLayoutProps) {
    return (
        <div className='fade-in'>
            <div id={id} className='game-container success-page-container'>
                <div className='success-stat-hero'>{heroContent}</div>
                <div className='btn-container'>{actions}</div>
                {children}
            </div>
        </div>
    );
}

export default GameResultLayout;
