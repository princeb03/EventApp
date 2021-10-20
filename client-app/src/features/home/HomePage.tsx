import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const {userStore,modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Event App
                </Header>
                {
                    userStore.isLoggedIn ? 
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to this app' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Take me to the Activities!
                        </Button>
                    </Fragment> :
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to this app' />
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} inverted>
                            Register
                        </Button>
                    </Fragment>
                }
                
            </Container>
        </Segment>
    );
});