const UPDATE_PROMPT = 'UPDATE_PROMPT';
const SUBMIT_PROMPT = 'SUBMIT_PROMPT';
const UPDATE_ENGINE = 'UPDATE_ENGINE';
const UPDATE_TEMPERATURE = 'UPDATE_TEMPERATURE';
const CLEAR_RESPONSE = 'CLEAR_RESPONSE';

const initial_state = {
  prompt: null,
  engine: 'text-curie-001',
  response: null,
  temperature: 0.5,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case UPDATE_PROMPT:
      return {
        ...state,
        prompt: action.payload
      }
    case UPDATE_ENGINE:
      return {
        ...state,
        engine: action.payload
      }
    case UPDATE_TEMPERATURE:
      return {
        ...state,
        temperature: action.payload
      }
    case SUBMIT_PROMPT:
      return {
        ...state,
        response: action.payload
      }
    case CLEAR_RESPONSE:
      return {
        ...state,
        response: null
      }
    default:
      return state;
  }
}

export default reducer;