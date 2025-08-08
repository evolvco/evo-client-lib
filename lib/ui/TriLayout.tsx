import { useDisclosure, } from '@mantine/hooks';
import {
    AppShell,
    Burger,
    Flex,
} from '@mantine/core';
import logo from '../assets/logo.png'
import { Toaster } from './Toaster';
import { useNavigate } from 'react-router-dom';

interface ITriLayoutProps {
    children: React.ReactNode;
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
}

export function TriLayout({ children, leftPanel, rightPanel }: ITriLayoutProps) {

    const [onav, { toggle: tnav }] = useDisclosure();
    const [oaside, { toggle: taside }] = useDisclosure();
    const navigate = useNavigate()

    return (<AppShell
        header={{ height: 60 }}
        navbar={{
            width: 250,
            breakpoint: 'sm',
            collapsed: { mobile: !onav, desktop: !onav },
        }}
        aside={{
            width: 250,
            breakpoint: 'sm',
            collapsed: { mobile: !oaside, desktop: !oaside },
        }}
        padding="md"
    >
        <AppShell.Header
            p="md"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <Burger
                opened={onav}
                onClick={tnav}
                size="sm"
            />
            <img onClick={()=>navigate('/')} src={logo} />
            <Burger
                opened={oaside}
                onClick={taside}
                size="sm"
            />
        </AppShell.Header>
        <AppShell.Navbar >
            {leftPanel}
        </AppShell.Navbar>
        <AppShell.Aside p="md">
            {rightPanel}
        </AppShell.Aside>
        <AppShell.Main>
            <Toaster />
                {children}
        </AppShell.Main>
    </AppShell>)
}









