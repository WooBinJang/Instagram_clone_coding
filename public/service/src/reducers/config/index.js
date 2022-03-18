const initialState = {
  service: {
    // 닉네임 정보들이 들어갈 자리
    nicknames: []
  }
};
const config = (state = initialState, { type, payload }) => {
  switch (type) {
    case '@config/UPDATE_NICKNAMES':
      return {
        ...state,
        service: {
          nicknames: [...payload]
        }
      };
    default:
      return state;
  }
};
export default config;
