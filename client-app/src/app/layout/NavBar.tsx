import react from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

interface Props {
    createForm: () => void;
}

export default function NavBar({createForm}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{
                        marginRight: '10px'
                    }}/>
                    Prince's Event App
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={(createForm)} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
};