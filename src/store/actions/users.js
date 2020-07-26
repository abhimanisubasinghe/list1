import { SET_USERS, REMOVE_USER, USER_ADDED, START_ADD_USER, SEARCH_USER, STOP_SEARCH_USER, LOGIN_USER, LOGOUT_USER, SELECT_USERS, CLEAR_SELECT_USERS} from './actionType'
import { uiStopLoading, uiStartLoading, authGetToken, } from './index'

export const startAddUser = () => {
  return{
    type: START_ADD_USER
  }
}

export const addUser = (userData) => {
    //console.log(userName, userDescription)
    console.log('in user', userData)
    return dispatch => {
      let authToken;
     // dispatch(uiStartLoading());
      dispatch(authGetToken())
        .catch(() => {
          alert("No valid token found!");
        })
        .then(token => {
          console.log('token',token)
          authToken = token;
          console.log('userdata ',userData)
          let data = {
            name: userData.userName,
            email: userData.email,
            contactNumber: userData.contactNumber,
            //authId: userData.Id,
            active: true
          };
          return fetch(
            "https://list1-9090.firebaseio.com/users.json?auth=" +
              authToken,
            {
              method: "POST",
              body: JSON.stringify(data)
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
         // dispatch(uiStopLoading());
          dispatch(userAdded())
          dispatch(getLoggedUser(userData.email))
          dispatch(userLogIn(userData))
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong, please try again!");
          //dispatch(uiStopLoading());
        });
    };
  };

export const userAdded = () => {
  return{
    type: USER_ADDED
  }
}

export const userLogIn = (userData) => {
  console.log('in user login', userData[0].name)
  return{
    type: LOGIN_USER,
    userName: userData[0].name,
    email: userData[0].email,
    contactNumber: userData[0].contactNumber
  }
}

export const userLogOut = () => {
  return{
    type: LOGOUT_USER
  }
}

export const getLoggedUser = (email) => {
  return (dispatch) =>{
  dispatch(authGetToken())
  .catch(() =>{
      alert('No valid token found')
  })
  .then(token =>{
      console.log(token)
      return fetch('https://list1-9090.firebaseio.com/users.json?auth='+token)
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
      const users = [] 
      for (let key in parsedRes){
          users.push({
              ...parsedRes[key],
              key:key
          })
      }
      user = users.filter(record => record.email.match(email))
      console.log('loding data')
      console.log('logged in user', user)
      dispatch(userLogIn(user))
      //dispatch(setUsers(users))
  })
  .catch(err => {
      alert('Something went wrong, sorry :/')
      console.log(err)
  })
}
}

export const getUsers = () => {
    console.log('loading users')
    return (dispatch) =>{
    dispatch(authGetToken())
    .catch(() =>{
        alert('No valid token found')
    })
    .then(token =>{
        console.log(token)
        return fetch('https://list1-9090.firebaseio.com/users.json?auth='+token)
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
        const users = [] 
        for (let key in parsedRes){
            users.push({
                ...parsedRes[key],
                key:key
            })
        }
        console.log('loding data')
        dispatch(setUsers(users))
    })
    .catch(err => {
        alert('Something went wrong, sorry :/')
        console.log(err)
    })
}
}

export const setUsers = (users) => {
    console.log('registered users',users)
    return{
        type: SET_USERS,
        users: users
    }
}

export const deleteUser = (key) => {
  console.log(key)
    return (dispatch) => {
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            dispatch(removeUser(key))
            //console.log('pass1')
            return fetch("https://list1-9090.firebaseio.com/users/" + key + ".json?auth="+token, {
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

// export const startUpdateUser = () => {
//   return{
//     type: START_UPDATE_USER
//   }
// }

// export const stopUpdateUser = () => {
//   return{
//     type: STOP_UPDATE_USER
//   }
// }

export const updateUser = (key, userName, userDescription, userLocation) => {
  //console.log(key)
    return (dispatch) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            //dispatch(removeUser(key))
            console.log('pass1')
            const userData = {
              name: userName,
              description: userDescription,
              location: userLocation
            };
            return fetch("https://list1-9090.firebaseio.com/users/" + key + ".json?auth="+token, {
                method: "PATCH",
                body: JSON.stringify(userData)
            })
        })
        .then(res => {
          if(res.ok){

            return res.json()
          }
          else{
            throw (new Error())
            //dispatch(stopUpdateUser());
          }
        })
        .then(parsedRes => {
            console.log("Done!");
            dispatch(uiStopLoading());
            dispatch(getUsers());
            //dispatch(stopUpdateUser());
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
            dispatch(uiStopLoading());
            //dispatch(stopUpdateUser());
            
        })        
        
    };
};

export const removeUser = key => {
    return {
        type: REMOVE_USER,
        key: key
    };
};

export const searchUser = val => {
  return {
    type: SEARCH_USER,
    val: val
  }
}

export const stopSearchUser = () => {
  return {
    type: STOP_SEARCH_USER
  }
}

export const selectUsers = user => {
  console.log('in action', user)
  return{
    type: SELECT_USERS,
    user: user
  }
}

export const clearSelectedUsers = () => {
  return {
    type: CLEAR_SELECT_USERS
  }
}