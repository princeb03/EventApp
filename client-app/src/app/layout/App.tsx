import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import Activity from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities")
      .then(response => {
        console.log(response.data);
        setActivities(response.data);
      });
  }, []);

  function handleActivitySelect(id: string) {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function cancelActivitySelect() {
    setSelectedActivity(undefined);
  }

  function openForm(id?: string) {
    id ? handleActivitySelect(id) : cancelActivitySelect();
    setEditMode(true);
  }

  function closeForm() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    if (activity.id) {
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
    } else {
      setActivities([...activities, {...activity, id:uuid()}]);
    }
    setEditMode(false);
  }

  function handleDeleteActivity(id: string) {
    setActivities(activities.filter(x => x.id !== id));
  }

  return (
    <Fragment>
      <NavBar createForm={openForm}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleActivitySelect}
          cancelActivitySelect={cancelActivitySelect}
          editMode={editMode}
          openForm={openForm}
          closeForm={closeForm}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
     
    </Fragment>
  );
}

export default App;
