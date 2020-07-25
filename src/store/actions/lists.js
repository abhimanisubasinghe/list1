import { SET_LISTS, REMOVE_LIST, LIST_ADDED, START_ADD_LIST, START_UPDATE_LIST, STOP_UPDATE_LIST, SEARCH_LIST, STOP_SEARCH_LIST} from './actionType'
import { uiStopLoading, uiStartLoading, authGetToken, } from './index'


export const startAddList = () => {
  return{
    type: START_ADD_LIST
  }
}

export const addList = (listName, products,shops, dueDate, userEmail) => {
  console.log('shops to be added ',shops)
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        //console.log('token',token)
        authToken = token;
        const listData = {
          name: listName,
          products: products,
          shops: shops,
          dueDate: dueDate,
          owner: userEmail,
          sharedUsers: [userEmail],
          done: false
        };
        return fetch(
          "https://list1-9090.firebaseio.com/lists.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify(listData)
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res =>
        {
          if(res.ok){
            return res.json()
          }
          else{
            throw (new Error())
          }
        })
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        dispatch(getUserLists(userEmail))
        dispatch(listAdded())
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(getUserLists(userEmail))
        dispatch(uiStopLoading());
      });
  };
};


export const listAdded = () => {
  return{
    type: LIST_ADDED
  }
}

export const getUserLists = (email) => {
  console.log('in user get lists',email)
  return (dispatch) =>{
  dispatch(authGetToken())
  .catch(() =>{
      alert('No valid token found')
  })
  .then(token =>{
      //console.log(token)
      return fetch(`https://list1-9090.firebaseio.com/lists.json?auth=`+token)
  })
  .then(res =>  {
    if(res.ok){
      return res.json()
    }
    else{
      throw (new Error())
    }
  })
  .then(parsedRes => {
      let lists = [] 
      for (let key in parsedRes){
          lists.push({
              ...parsedRes[key],
              key:key
          })
      }
      console.log(lists)
      lists = lists.filter(item => item.sharedUsers.find(shareEmail => {
        //console.log(id, userId, id.includes(userId))
        return shareEmail.includes(email)
      }));
      console.log('loding data', lists)
      dispatch(setLists(lists))
  })
  .catch(err => {
      alert('Something went wrong, sorry :/')
      console.log(err)
  })
}
}


export const setLists = (lists) => {
    //console.log(lists)
    return{
        type: SET_LISTS,
        lists: lists
    }
}

export const deleteList = (key) => {
  console.log(key)
    return (dispatch) => {
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            dispatch(removeList(key))
            console.log('pass1')
            return fetch("https://list1-9090.firebaseio.com/lists/" + key + ".json?auth="+token, {
                method: "DELETE"
            })
        })
        .then(res => {
          if(res.ok){

            return res.json()
          }
          else{
            throw (new Error())
          }
        })
        .then(parsedRes => {
            console.log("Done!");
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })        
        
    };
};

export const startUpdateList = () => {
  return{
    type: START_UPDATE_LIST
  }
}

export const stopUpdateList = () => {
  return{
    type: STOP_UPDATE_LIST
  }
}

export const updateList = (key,listName, products, shops, owner, sharedUsers, done) => {
  console.log(owner)
    return (dispatch) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            //dispatch(removeList(key))
            console.log('pass1')
            const listData = {
              name: listName,
              products: products,
              shops: shops,
              dueDate: dueDate,
              owner: owner,
              sharedUsers: sharedUsers,
              done: done
            };
            return fetch("https://list1-9090.firebaseio.com/lists/" + key + ".json?auth="+token, {
                method: "PATCH",
                body: JSON.stringify(listData)
            })
        })
        .then(res => {
          if(res.ok){

            return res.json()
          }
          else{
            throw (new Error())
            //dispatch(stopUpdateList());
          }
        })
        .then(parsedRes => {
            console.log("Done!");
            dispatch(uiStopLoading());
            dispatch(getUserLists(owner));
            dispatch(stopUpdateList());
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
            dispatch(uiStopLoading());
            dispatch(getUserLists(owner));
            dispatch(stopUpdateList());
            
        })        
        
    };
};

export const removeList = key => {
    return {
        type: REMOVE_LIST,
        key: key
    };
};

export const searchList = val => {
  return {
    type: SEARCH_LIST,
    val: val
  }
}

export const stopSearchList = () => {
  return {
    type: STOP_SEARCH_LIST
  }
}