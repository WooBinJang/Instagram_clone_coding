const initialState = {
  isHeaderOpen: false
}; //초깃값898

/* 

function reducer(currentState,action){

}
*/

const layouts = (
  state = initialState,
  {
    // 첫번째 인자는 현재 state 값  두번째 인자로는 action이 와야한다
    type,
    payload
  }
) => {
  switch (type) {
    case '@layouts/UPDATE_HEADER_STATE':
      return {
        ...state, // 현재 state 값 복제
        isHeaderOpen: payload
      };
    default:
      return state;
  }
};
export default layouts;
