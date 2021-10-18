import axios from "axios";
import { Fragment, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import ValidationErrors from "./ValidationErrors";

export default function TestErrors() {
    const baseUrl = 'http://localhost:5000/api/';
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/not-a-guid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
    }

    return (
        <Fragment>
            <Header as='h1' content='Test Error' />
            <Segment>
                <Button.Group widths='7'>
                    <Button primary onClick={handleNotFound}>Not Found</Button>
                    <Button secondary onClick={handleBadRequest}>Bad Request</Button>
                    <Button primary onClick={handleServerError}>Server Error</Button>
                    <Button secondary onClick={handleUnauthorised}>Unauthorised</Button>
                    <Button primary onClick={handleBadGuid}>Bad Guid</Button>
                    <Button secondary onClick={handleValidationError}>Validation Error</Button>
                </Button.Group>
            </Segment>
            {errors && <ValidationErrors errors={errors} />}

        </Fragment>
    );
}