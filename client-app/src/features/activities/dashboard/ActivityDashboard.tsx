import react from 'react';
import { Grid } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivitySelect: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities,
    selectedActivity, selectActivity, cancelActivitySelect, editMode, openForm, closeForm, createOrEditActivity, deleteActivity}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivitySelect} openForm={openForm}/>}
                {editMode && <ActivityForm createOrEditActivity={createOrEditActivity} activity={selectedActivity} closeForm={closeForm} />}
            </Grid.Column>
            
        </Grid>
    );
}