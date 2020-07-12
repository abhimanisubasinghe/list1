import RNFetchBlob from 'rn-fetch-blob'
import { SET_PRODUCTS, REMOVE_PRODUCT, PRODUCT_ADDED, START_ADD_PRODUCT} from './actionType'
import { uiStopLoading, uiStartLoading, authGetToken, } from './index'

export const startAddProduct = () => {
  return{
    type: START_ADD_PRODUCT
  }
}

export const addProduct = (productName, productDescription, image) => {
    return dispatch => {
      let authToken;
      dispatch(uiStartLoading());
      dispatch(authGetToken())
        .catch(() => {
          alert("No valid token found!");
        })
        .then(token => {
          authToken = token;
          return fetch(
            "https://us-central1-ciao-181108.cloudfunctions.net/storeImage",
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
          const productData = {
            name: productName,
            location: productDescription,
            image: parsedRes.imageUrl,
            imagePath: parsedRes.imagePath
          };
          return fetch(
            "https://ciao-181108.firebaseio.com/products.json?auth=" +
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
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong, please try again!");
          dispatch(uiStopLoading());
        });
    };
  };

export const productAdded = () => {
  return{
    type: PRODUCT_ADDED
  }
}

export const getProducts = () => {
    return (dispatch) =>{
    //dispatch(uiStartLoading())
    // const token = getState().auth.token
    // //console.log(token)
    // if(!token){
    //     alert('Token validating failed')
    //     return
    // }

    dispatch(authGetToken())
    .catch(() =>{
        alert('No valid token found')
    })
    .then(token =>{
        console.log(token)
        return fetch('https://ciao-181108.firebaseio.com/products.json?auth='+token)
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
        const products = [] 
        for (let key in parsedRes){
            products.push({
                ...parsedRes[key],
                image:{
                    uri: parsedRes[key].image
                } ,
                key:key
            })
        }
        console.log('loding data')
        dispatch(setProducts(products))
    })
    .catch(err => {
        alert('Something went wrong, sorry :/')
        console.log(err)
    })
}
}

export const setProducts = (products) => {
    //console.log(products)
    return{
        type: SET_PRODUCTS,
        products: products
    }
}
export const deleteProduct = (key) => {
    return (dispatch) => {
        dispatch(authGetToken())
        .catch(() =>{
            alert('No valid token found')
        })
        .then( token => {
            dispatch(removeProduct(key))
            return fetch("https://ciao-181108.firebaseio.com/products/" + key + ".json?auth="+token, {
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

export const removeProduct = key => {
    return {
        type: REMOVE_PRODUCT,
        key: key
    };
};
