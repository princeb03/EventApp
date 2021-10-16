import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {loadActivity, createActivity, updateActivity, loading, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }); 

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setFormData(activity!));
    }, [id, loadActivity]);

    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }

    function handleSubmit() {
        if (formData.id.length > 0) {
            updateActivity(formData).then(() => history.push(`/activities/${formData.id}`)) 
        } else {
            let activity = {...formData, id: uuid()};
            createActivity(activity).then(() => history.push(`/activities/${activity.id}`));
            
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading Activity' />
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='false'>
                <Form.Input name='title' value={formData.title} onChange={handleChange} placeholder='Title'></Form.Input>
                <Form.TextArea name='description' value={formData.description} onChange={handleChange} placeholder='Description'></Form.TextArea>
                <Form.Input name='category' value={formData.category} onChange={handleChange} placeholder='Category'></Form.Input>
                <Form.Input type='date' name='date' value={formData.date} onChange={handleChange} placeholder='Date'></Form.Input>
                <Form.Input name='city' value={formData.city} onChange={handleChange} placeholder='City'></Form.Input>
                <Form.Input name='venue' value={formData.venue} onChange={handleChange} placeholder='Venue'></Form.Input>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
});