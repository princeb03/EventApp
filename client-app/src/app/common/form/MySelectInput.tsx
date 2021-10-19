import { useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";

interface Props {
    name: string;
    placeholder: string;
    options: any;
    label?: string;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    return (
        <FormField error={meta.touched && meta.error}>
            <Select 
                clearable
                options={props.options}
                value={field.value}
                onChange={(e,d)=> helpers.setValue(d.value)}
                onBlur={()=> helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {
                meta.touched && meta.error ? 
                (<Label basic color='red'>{meta.error}</Label>) : null
            }
        </FormField>
    );
}