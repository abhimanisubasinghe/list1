import { SET_BILLS, REMOVE_BILL, BILL_ADDED, START_ADD_BILL, START_UPDATE_BILL, STOP_UPDATE_BILL, SEARCH_BILL, STOP_SEARCH_BILL, INITIAL_BILLS} from './actionType'
import { uiStopLoading, uiStartLoading, authGetToken, } from './index'


export const startAddBill = () => {
  return{
    type: START_ADD_BILL
  }
}

export const addBill = (billName, amount, dueDate, userEmail) => {
  //console.log(billName, billDescription)
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
        const billData = {
          name: billName,
          amount: amount,
          dueDate: dueDate,
          owner: userEmail,
          sharedUsers: [userEmail],
          paid: false
        };
        return fetch(
          "https://list1-9090.firebaseio.com/bills.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify(billData)
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
        dispatch(getUserBills(userEmail))
        dispatch(billAdded())
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(getUserBills(userEmail))
        dispatch(uiStopLoading());
      });
  };
};


export const billAdded = () => {
  return{
    type: BILL_ADDED
  }
}

export const getUserBills = (email) => {
  console.log('in user get bills',email)
  return (dispatch) =>{
  dispatch(authGetToken())
  .catch(() =>{
      alert('No valid token found')
  })
  .then(token =>{
      //console.log(token)
      return fetch(`https://list1-9090.firebaseio.com/bills.json?auth=`+token)
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
      let bills = [] 
      for (let key in parsedRes){
          bills.push({
              ...parsedRes[key],
              key:key
          })
      }
      console.log(bills)
      bills = bills.filter(item => item.sharedUsers.find(shareEmail => {
        //console.log(id, userId, id.includes(userId))
        return shareEmail.includes(email)
      }));
      console.log('loding data', bills)
      dispatch(setBills(bills))
  })
  .catch(err => {
      alert('Something went wrong, sorry :/')
      console.log(err)
  })
}
}


export const setBills = (bills) => {
    //console.log(bills)
    return{
        type: SET_BILLS,
        bills: bills
    }
}

export const deleteBill = (key) => {
  console.log(key)
    return (dispatch) => {
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            dispatch(removeBill(key))
            console.log('pass1')
            return fetch("https://list1-9090.firebaseio.com/bills/" + key + ".json?auth="+token, {
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

export const startUpdateBill = () => {
  return{
    type: START_UPDATE_BILL
  }
}

export const stopUpdateBill = () => {
  return{
    type: STOP_UPDATE_BILL
  }
}

export const updateBill = (key,billName, amount, dueDate, owner, sharedUsers, paid) => {
  console.log(owner)
    return (dispatch) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            //dispatch(removeBill(key))
            console.log('pass1')
            const billData = {
              name: billName,
              amount: amount,
              dueDate: dueDate,
              owner: owner,
              sharedUsers: sharedUsers,
              paid: paid
            };
            return fetch("https://list1-9090.firebaseio.com/bills/" + key + ".json?auth="+token, {
                method: "PATCH",
                body: JSON.stringify(billData)
            })
        })
        .then(res => {
          if(res.ok){

            return res.json()
          }
          else{
            throw (new Error())
            //dispatch(stopUpdateBill());
          }
        })
        .then(parsedRes => {
            console.log("Done!");
            dispatch(uiStopLoading());
            dispatch(getUserBills(owner));
            dispatch(stopUpdateBill());
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
            dispatch(uiStopLoading());
            dispatch(getUserBills(owner));
            dispatch(stopUpdateBill());
            
        })        
        
    };
};

export const removeBill = key => {
    return {
        type: REMOVE_BILL,
        key: key
    };
};

export const searchBill = val => {
  return {
    type: SEARCH_BILL,
    val: val
  }
}

export const stopSearchBill = () => {
  return {
    type: STOP_SEARCH_BILL
  }
}

export const setInitialStateBills = () => {
  return {
    type: INITIAL_BILLS
  }
}