import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList() {
    const [currentTarget, setCurrentTarget] = useState('');
    const {activityStore} = useStore();
    const { selectActivity, loading, activities, deleteActivity } = activityStore;

    function handleDelete(event: SyntheticEvent<HTMLButtonElement>) {
        let targetId: string = event.currentTarget.name;
        setCurrentTarget(targetId);
        deleteActivity(targetId);
    }
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=>selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Button onClick={handleDelete} name={activity.id} loading={loading && activity.id===currentTarget} floated='right' content='Delete' color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
});