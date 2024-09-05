const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export interface CounterState {
    title: string,
    data: number
}

const initialState: CounterState = {
    title: 'YACR',
    data: 42
}

export function increment(amount = 1) {
    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1) {
    return {
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

interface CounterAction {
    type: string
    payload: number
}

export default function counterReducer(state = initialState, action: CounterAction) {
    switch (action.type) {
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            }
        default:
            return state;
    }
}