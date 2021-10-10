import React from 'react';

import {GitcoinContext} from '../store';
import {Modal, Button, Input} from 'semantic-ui-react';
import {ACTIONS} from '../store/ACTIONS';
import {MakeList} from '../network/api';
import {Log} from '../util/logger';

const NewListModal = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [listName, setListName] = React.useState('');
    const [addListErr, setAddListErr] = React.useState<any>(null);
    const setVisChange = (vis: boolean = false) => {
        dispatch({type: ACTIONS.SET_NEW_LIST_MODAL_VISIBLITY, payload: vis});
    };

    const onMakeNewList = () => {
        if (listName.toString().trim().length > 0) {
            setAddListErr(null);
            MakeList(listName)
                .then((res) => {
                    setListName('');
                    setVisChange(false);
                })
                .catch((err) => {
                    setAddListErr(err);
                    Log('err', err);
                });
        }
    };
    return (
        <Modal
            onClose={() => setVisChange(false)}
            onOpen={() => setVisChange(true)}
            open={state.newListModalVisibility}
        >
            <Modal.Header>Select lists to add</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {addListErr ? (
                        <p className="error">{addListErr.toString()}</p>
                    ) : null}
                    <Input
                        label="New List Name"
                        style={{width: '100%'}}
                        placeholder="Enter list name"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setVisChange(false)}>
                    back
                </Button>
                <Button
                    content="Make List"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={onMakeNewList}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};

export default NewListModal;
