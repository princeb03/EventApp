import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import Activity from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        
        setActivities(response.map(activity => {
          return {...activity, date:activity.date.split('T')[0]};
        }));
        setLoading(false);
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

  async function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      await agent.Activities.update(activity);
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
    } else {
      activity.id = uuid();
      await agent.Activities.create(activity);
      setActivities([...activities, activity]);
    }
    setSelectedActivity(activity);
    setSubmitting(false);
    setEditMode(false);
  }

  async function handleDeleteActivity(id: string) {
    setSubmitting(true);
    await agent.Activities.delete(id);
    setActivities(activities.filter(x => x.id !== id));
    setSubmitting(false);
  }

  if (loading) return <LoadingComponent />
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
          submitting={submitting}
        />
      </Container>
     
    </Fragment>
  );
}

export default App;
