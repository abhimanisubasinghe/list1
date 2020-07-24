import { SET_PRODUCTS, REMOVE_PRODUCT, PRODUCT_ADDED, START_ADD_PRODUCT, START_UPDATE_PRODUCT, STOP_UPDATE_PRODUCT, SEARCH_PRODUCT, STOP_SEARCH_PRODUCT, SELECT_PRODUCTS, CLEAR_SELECT_PRODUCTS} from './actionType'
import { uiStopLoading, uiStartLoading, authGetToken, } from './index'


export const startAddProduct = () => {
  return{
    type: START_ADD_PRODUCT
  }
}

export const addProduct = (productName, productDescription, image, userEmail) => {
    //console.log(productName, productDescription)
    return (dispatch, getState) => {
      let authToken;
      //let userId;
      dispatch(uiStartLoading());
      //userId = getState().auth.Id;
      dispatch(authGetToken())
        .catch(() => {
          alert("No valid token found!");
        })
        .then(token => {
          //console.log('token',token)
          authToken = token;
          
          return fetch(
            "https://us-central1-list1-9090.cloudfunctions.net/storeImage",
            {
              method: "POST",
              body: JSON.stringify({
                image: image.base64
              }),
              headers: {
                Authorization: "Bearer " + authToken
              }
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
          //console.log(userId)
          const productData = {
            name: productName,
            description: productDescription,
            image: parsedRes.imageUrl,
            imagePath: parsedRes.imagePath,
            owner: userEmail,
            sharedUsers: [userEmail]
          };
          return fetch(
            "https://list1-9090.firebaseio.com/products.json?auth=" +
              authToken,
            {
              method: "POST",
              body: JSON.stringify(productData)
            }
          );
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
          console.log(parsedRes);
          dispatch(uiStopLoading());
          dispatch(productAdded())
          dispatch(getUserProducts(userEmail))
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong, please try again!");
          dispatch(uiStopLoading());
          dispatch(getUserProducts(userEmail))
        });
    };
  };

export const productAdded = () => {
  return{
    type: PRODUCT_ADDED
  }
}

export const getUserProducts = (email) => {
  console.log('in user get products',email)
  return (dispatch) =>{
  dispatch(authGetToken())
  .catch(() =>{
      alert('No valid token found')
  })
  .then(token =>{
      //console.log(token)
      return fetch(`https://list1-9090.firebaseio.com/products.json?auth=`+token)
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
      let products = [] 
      for (let key in parsedRes){
          products.push({
              ...parsedRes[key],
              image:{
                  uri: parsedRes[key].image
              } ,
              key:key
          })
      }
      products = products.filter(item => item.sharedUsers.find(shareEmail => {
        //console.log(id, userId, id.includes(userId))
        return shareEmail.includes(email)
      }));
      console.log('loding data')
      dispatch(setProducts(products))
  })
  .catch(err => {
      alert('Something went wrong, sorry :/')
      console.log(err)
  })
}
}

// export const getProducts = () => {
//     return (dispatch) =>{
//     dispatch(authGetToken())
//     .catch(() =>{
//         alert('No valid token found')
//     })
//     .then(token =>{
//         console.log(token)
//         return fetch('https://list1-9090.firebaseio.com/products.json?auth='+token)
//     })
//     .then(res =>  {
//       if(res.ok){
//         return res.json()
//       }
//       else{
//         throw (new Error())
//       }
//     })
//     .then(parsedRes => {
//         const products = [] 
//         for (let key in parsedRes){
//             products.push({
//                 ...parsedRes[key],
//                 image:{
//                     uri: parsedRes[key].image
//                 } ,
//                 key:key
//             })
//         }
//         console.log('loding data')
//         dispatch(setProducts(products))
//     })
//     .catch(err => {
//         alert('Something went wrong, sorry :/')
//         console.log(err)
//     })
// }
// }

export const setProducts = (products) => {
    //console.log(products)
    return{
        type: SET_PRODUCTS,
        products: products
    }
}

export const deleteProduct = (key) => {
  console.log(key)
    return (dispatch) => {
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            dispatch(removeProduct(key))
            console.log('pass1')
            return fetch("https://list1-9090.firebaseio.com/products/" + key + ".json?auth="+token, {
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

export const startUpdateProduct = () => {
  return{
    type: START_UPDATE_PRODUCT
  }
}

export const stopUpdateProduct = () => {
  return{
    type: STOP_UPDATE_PRODUCT
  }
}

export const updateProduct = (key, productName, productDescription, owner, sharedUsers) => {
  console.log(owner)
    return (dispatch) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            //dispatch(removeProduct(key))
            console.log('pass1')
            const productData = {
              name: productName,
              description: productDescription,
              owner: owner,
              sharedUsers: sharedUsers
            };
            return fetch("https://list1-9090.firebaseio.com/products/" + key + ".json?auth="+token, {
                method: "PATCH",
                body: JSON.stringify(productData)
            })
        })
        .then(res => {
          if(res.ok){

            return res.json()
          }
          else{
            throw (new Error())
            //dispatch(stopUpdateProduct());
          }
        })
        .then(parsedRes => {
            console.log("Done!");
            dispatch(uiStopLoading());
            dispatch(getUserProducts(owner));
            dispatch(stopUpdateProduct());
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
            dispatch(uiStopLoading());
            dispatch(getUserProducts(owner));
            dispatch(stopUpdateProduct());
            
        })        
        
    };
};

export const removeProduct = key => {
    return {
        type: REMOVE_PRODUCT,
        key: key
    };
};

export const searchProduct = val => {
  return {
    type: SEARCH_PRODUCT,
    val: val
  }
}

export const stopSearchProduct = () => {
  return {
    type: STOP_SEARCH_PRODUCT
  }
}

export const selectProducts = product => {
  return{
    type: SELECT_PRODUCTS,
    product: product
  }
}

export const clearSelectedProducts = () => {
  return {
    type: CLEAR_SELECT_PRODUCTS
  }
}