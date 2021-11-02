import React from 'react';

import {GitcoinContext} from '../store';
import {
    Modal,
    Button,
    Checkbox,
    CheckboxProps,
    Label,
    Icon,
} from 'semantic-ui-react';
import {ACTIONS} from '../store/ACTIONS';
import {useGetUsersLists} from '../hook/List';
import {AddToList, RemoveFromList} from '../network/api';
import {Log} from '../util/logger';

const AddToListModal = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [trigger, setTrigger] = React.useState<boolean>(false);
    const [userLists, userListsLoading] = useGetUsersLists(
        trigger || state.newListModalVisibility
    );

    const setVisChange = (vis: boolean = false) => {
        dispatch({type: ACTIONS.SET_ADD_TO_LIST_MODAL_VISIBLITY, payload: vis});
    };

    const onListChange = (listItem: List) => {
        if (state.selectedMovie) {
            if (!checked(listItem)) {
                AddToList(listItem.name, state.selectedMovie)
                    .then((res) => {
                        setTrigger(!trigger);
                        Log('res', res);
                    })
                    .catch((err) => {
                        Log('err', err);
                    });
            } else {
                RemoveFromList(listItem.name, state.selectedMovie.id)
                    .then((res) => {
                        setTrigger(!trigger);
                        Log('res', res);
                    })
                    .catch((err) => {
                        Log('err', err);
                    });
            }
        }
    };

    const checked = (list: List): boolean => {
        return state.selectedMovie
            ? list.items.findIndex(
                  (item) =>
                      item.imdb_id.toString() ===
                      //@ts-ignore
                      state.selectedMovie.id.toString()
              ) > -1
            : false;
    };

    return (
        <Modal
            onClose={() => setVisChange(false)}
            onOpen={() => setVisChange(true)}
            open={state.addToListModalVisibility}
        >
            <Modal.Header>Select lists to add</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {!userListsLoading && userLists.length === 0 ? (
                        <p className="error">No results</p>
                    ) : null}
                    {userLists.map((userList, i) => (
                        <ListItem
                            key={i}
                            list={userList}
                            checked={checked(userList)}
                            onChange={onListChange}
                        />
                    ))}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setVisChange(false)}>
                    Nope
                </Button>
                <Button
                    color="pink"
                    onClick={() =>
                        dispatch({
                            type: ACTIONS.SET_NEW_LIST_MODAL_VISIBLITY,
                            payload: true,
                        })
                    }
                >
                    Make New List
                </Button>
                <Button
                    content="Done"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setVisChange(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};

export default AddToListModal;

const ListItem = ({
    list,
    checked,
    onChange,
}: {
    list: List;
    checked: boolean;
    onChange: (i: List) => void;
}) => {
    const onChanged = (_: any, data: CheckboxProps) => {
        onChange(list);
    };
    console.log('list', list);
    return (
        <div
            onClick={() => onChange(list)}
            style={{
                display: 'flex',
                borderBottom: '1px solid grey',
                padding: 16,
                cursor: 'pointer',
            }}
        >
            <Checkbox checked={checked} onChange={onChanged} />
            <Icon name={getIcon(list.icon)} style={{margin: '0 0.5rem'}} />
            <p style={{flex: 1, margin: 0}}>{list.name}</p>
            <Label color="blue">{`${list.items.length} items`}</Label>
        </div>
    );
};

const getIcon = (name: string = '') => {
    switch (name) {
        case 'watch':
            return 'stopwatch';
        case 'fav':
            return 'star';
        default:
            return 'folder';
    }
};
