import { NavLink } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src="/assets/logo.png" alt="logo" style={{
                        marginRight: '10px'
                    }}/>
                    Prince's Event App
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name='Activities' />
                <Menu.Item as={NavLink} to="/errors" name='Errors' />
                <Menu.Item as={NavLink} to="/createActivity" >
                    <Button positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
};