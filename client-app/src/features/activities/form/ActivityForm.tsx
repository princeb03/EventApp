import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, closeForm, createActivity, updateActivity, loading} = activityStore;
    const initialState = activity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }
    const [formData, setFormData] = useState(initialState);

    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setFormData({...formData, [name]:value})
    }

    function handleSubmit() {
        formData.id? updateActivity(formData) : createActivity(formData);
    }

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
                <Button onClick={closeForm} floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
});