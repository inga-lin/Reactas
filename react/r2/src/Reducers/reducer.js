import {
    GET_DATA_FROM_SERVER,
    SORT_CLIENT_HEIGHT_ASC,
    SORT_CLIENT_HEIGHT_DESC,
    SORT_CLIENT_NAME_ASC,
    SORT_CLIENT_NAME_DESC,
  } from "../Constants";
  //102
  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case GET_DATA_FROM_SERVER:
        newState = action.payload;
        break;
      case SORT_CLIENT_NAME_ASC://cia sortinsim name
        newState = [...state].sort((a, b) => { //imam steita(newState) pasidarom jo kopija([...state]) sortinam
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1; //serveryje kur kurem name
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
        break;
      case SORT_CLIENT_NAME_DESC://cia sortinsim name
        newState = [...state].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
        break;
      case SORT_CLIENT_HEIGHT_ASC://cia sortinsim auksti
        newState = [...state].sort((a, b) => a.height - b.height);
        break;
      case SORT_CLIENT_HEIGHT_DESC://cia sortinsim auksti
        newState = [...state].sort((a, b) => b.height - a.height);
        break;
      default:
    }
  
    return newState; //paimam state sena ir po to ji paverciam i nauja newState
  }
  
  export default reducer;