import { SET_SHOPS, REMOVE_SHOP, SHOP_ADDED, START_ADD_SHOP, SEARCH_SHOP, STOP_SEARCH_SHOP} from './actionType'
import { uiStopLoading, uiStartLoading, authGetToken, } from './index'

export const startAddShop = () => {
  return{
    type: START_ADD_SHOP
  }
}

export const addShop = (shopName, shopDescription, shopLocation) => {
    //console.log(shopName, shopDescription)
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
          const shopData = {
            name: shopName,
            description: shopDescription,
            location: shopLocation
          };
          return fetch(
            "https://list1-9090.firebaseio.com/shops.json?auth=" +
              authToken,
            {
              method: "POST",
              body: JSON.stringify(shopData)
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
          dispatch(getShops())
          dispatch(shopAdded())
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong, please try again!");
          dispatch(getShops())
          dispatch(uiStopLoading());
        });
    };
  };

export const shopAdded = () => {
  return{
    type: SHOP_ADDED
  }
}

export const getShops = () => {
    return (dispatch) =>{
    dispatch(authGetToken())
    .catch(() =>{
        alert('No valid token found')
    })
    .then(token =>{
        console.log(token)
        return fetch('https://list1-9090.firebaseio.com/shops.json?auth='+token)
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
        const shops = [] 
        for (let key in parsedRes){
            shops.push({
                ...parsedRes[key],
                key:key
            })
        }
        console.log('loding data')
        dispatch(setShops(shops))
    })
    .catch(err => {
        alert('Something went wrong, sorry :/')
        console.log(err)
    })
}
}

export const setShops = (shops) => {
    //console.log(shops)
    return{
        type: SET_SHOPS,
        shops: shops
    }
}

export const deleteShop = (key) => {
  console.log(key)
    return (dispatch) => {
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            dispatch(removeShop(key))
            //console.log('pass1')
            return fetch("https://list1-9090.firebaseio.com/shops/" + key + ".json?auth="+token, {
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

// export const startUpdateShop = () => {
//   return{
//     type: START_UPDATE_SHOP
//   }
// }

// export const stopUpdateShop = () => {
//   return{
//     type: STOP_UPDATE_SHOP
//   }
// }

export const updateShop = (key, shopName, shopDescription, shopLocation) => {
  //console.log(key)
    return (dispatch) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            //dispatch(removeShop(key))
            console.log('pass1')
            const shopData = {
              name: shopName,
              description: shopDescription,
              location: shopLocation
            };
            return fetch("https://list1-9090.firebaseio.com/shops/" + key + ".json?auth="+token, {
                method: "PATCH",
                body: JSON.stringify(shopData)
            })
        })
        .then(res => {
          if(res.ok){

            return res.json()
          }
          else{
            throw (new Error())
            //dispatch(stopUpdateShop());
          }
        })
        .then(parsedRes => {
            console.log("Done!");
            dispatch(uiStopLoading());
            dispatch(getShops());
            //dispatch(stopUpdateShop());
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
            dispatch(uiStopLoading());
            //dispatch(stopUpdateShop());
            
        })        
        
    };
};

export const removeShop = key => {
    return {
        type: REMOVE_SHOP,
        key: key
    };
};

export const searchShop = val => {
  return {
    type: SEARCH_SHOP,
    val: val
  }
}

export const stopSearchShop = () => {
  return {
    type: STOP_SEARCH_SHOP
  }
}