import * as React from 'react';
import {Log} from '../util/logger';
import {ACTIONS} from './ACTIONS';
type Action = {type: string; payload?: any};
type Dispatch = (action: Action) => void;
type State = {
    profile: {name: string; user_id: string; address: string};
    token: string;
    selectedMovie: MovieDB | null;
    addToListModalVisibility: boolean;
    newListModalVisibility: boolean;
};
type GitcoinProviderProps = {children: React.ReactNode};
const initialState: State = {
    profile: {name: '', user_id: '', address: ''},
    token: '',
    selectedMovie: null,
    addToListModalVisibility: false,
    newListModalVisibility: false,
};

const GitcoinContext = React.createContext<{state: State; dispatch: Dispatch}>(
    initialState as any
);

const gitcoinReducer = (state: State, action: Action): State => {
    Log(action);

    switch (action.type) {
        case ACTIONS.SET_TOKEN: {
            return {
                ...state,
                token: action.payload,
            };
        }
        case ACTIONS.SET_PROFILE: {
            return {...state, profile: action.payload};
        }
        case ACTIONS.SET_SELECTED_MOVIE: {
            return {...state, selectedMovie: action.payload};
        }
        case ACTIONS.SET_ADD_TO_LIST_MODAL_VISIBLITY: {
            return {...state, addToListModalVisibility: !!action.payload};
        }
        case ACTIONS.SET_NEW_LIST_MODAL_VISIBLITY: {
            return {...state, newListModalVisibility: !!action.payload};
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const GitcoinProvider = ({children}: GitcoinProviderProps) => {
    const [state, dispatch] = React.useReducer(gitcoinReducer, initialState);

    return (
        <GitcoinContext.Provider value={{state, dispatch}}>
            {children}
        </GitcoinContext.Provider>
    );
};
export {GitcoinContext, GitcoinProvider};
