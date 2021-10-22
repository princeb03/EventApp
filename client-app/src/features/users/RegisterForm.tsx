import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required()
    });
    return (
        <Formik 
            initialValues={{email:'', password:'', displayName:'', username:'', error: null}}
            onSubmit={(values, {setErrors})=> (
                userStore.register(values).catch(error => setErrors({error})))
            }
            validationSchema={validationSchema}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form style={{padding: '2em'}} className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to the App' color='teal' />
                    <MyTextInput name="email" placeholder="E-mail"/>
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <ErrorMessage name='error' render={() => 
                        (<ValidationErrors errors={errors.error}/>)}
                        />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive fluid content="Register" type="submit" />
                </Form>
            )}
        </Formik>
    );
});