import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Segment, Comment, Form, Button } from "semantic-ui-react";

export default observer(function ActivityDetailedChat() {
    return (
        <Fragment>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='a'>User 1</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 12:00PM</div>
                            </Comment.Metadata>
                            <Comment.Text>This is a comment</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Form reply>
                        <Form.TextArea />
                        <Button
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                        />
                    </Form>
                </Comment.Group>
            </Segment>
        </Fragment>
    );
});