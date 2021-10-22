import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { ActivityFormValues } from '../../../app/models/activity';

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {loadActivity, createActivity, updateActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [formData, setFormData] = useState<ActivityFormValues>(new ActivityFormValues()); 

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required('The activity description is required.'),
        category: Yup.string().required('The activity category is required.'),
        date: Yup.string().required('The activity date is required.').nullable(),
        city: Yup.string().required('The activity city is required.'),
        venue: Yup.string().required('The activity venue is required.')
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setFormData(new ActivityFormValues(activity)));
    }, [id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if (activity.id) {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`)) 
        } else {
            let newActivity = {...activity, id: uuid()};
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading Activity' />
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={formData} onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea name='description'placeholder='Description' rows={3}/>
                        <MySelectInput options={categoryOptions} name='category' placeholder='Category'/>
                        <MyDateInput 
                            name='date' 
                            placeholderText='Date'
                            showTimeSelect
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput name='city' placeholder='City'/>
                        <MyTextInput name='venue' placeholder='Venue'/>
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Submit' />
                        <Button as={Link} to='/activities' floated='right' content='Cancel' />
                    </Form>
                )}
            </Formik>

            
        </Segment>
    )
});