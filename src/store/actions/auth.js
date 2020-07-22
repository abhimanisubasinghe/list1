import {TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionType';
import {uiStartLoading, uiStopLoading, addUser} from './index';
import AsyncStorage from '@react-native-community/async-storage';
import { getLoggedUser } from './users';

const API = 'AIzaSyDOkMm4RadBTwj265BCOVVTVvkgIqUdUtY';

export const tryAuth = (authData, nav, authMode) => {
  return (dispatch) => {
    dispatch(uiStartLoading());
    let url = null;
    let data = null;
    const signUpdata = authData;
    //console.log(authData.email);
    //console.log(authData.password);
    if (authMode === 'login') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        API;
      data = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      };
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API;
      data = {
        email: authData.email,
        password: authData.password,
        displayName: authData.userName,
        contactNumber: authData.contactNumber,
        returnSecureToken: true,
      };
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        displayName: authData.userName,
        //contactNumber: authData.contactNumber,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        dispatch(uiStopLoading());
        console.log(err);
        alert('Authentication failed! Please try again ');
      })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(async(prasedRes) => {
        dispatch(uiStopLoading());
        //console.log(prasedRes.idToken)
        console.log('P!', prasedRes);
        if (!prasedRes.idToken) {
          alert('Authentication failed! Please try again ');
        } else {
          console.log('P!', prasedRes);
          console.log('P!', prasedRes.displayName);
          dispatch(
            authStoreToken(
              prasedRes.idToken,
              prasedRes.expiresIn,
              prasedRes.refreshToken,
              prasedRes.email,
              prasedRes.displayName,
              prasedRes.localId
            ),
          );
          if(authMode !== 'login'){
            console.log('from auth', signUpdata)
            dispatch(addUser(signUpdata))  
          }
          else{
            await dispatch(getLoggedUser(prasedRes.email))
          }
          await nav.navigation.push('Drawer',{
            email: prasedRes.email,
            name:prasedRes.displayName,
            Id:prasedRes.localId
          });
        }
      });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken, email, name, Id) => {

  

  return async(dispatch) => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expiryDate));
    console.log('async email', email)
    if(email=== undefined){
      email = await AsyncStorage.getItem('list1:auth:email');
      name = await AsyncStorage.getItem('list1:auth:name');
      Id = await AsyncStorage.getItem('list1:auth:Id');
    }
    //console.log(now, new Date(expiryDate))
    console.log('initialized mail', email)
    AsyncStorage.setItem('list1:auth:token', token);
    AsyncStorage.setItem('list1:auth:expiryDate', expiryDate.toString());
    AsyncStorage.setItem('list1:auth:refreshToken', refreshToken);
    AsyncStorage.setItem('list1:auth:email', email)
    AsyncStorage.setItem('list1:auth:name', name)
    AsyncStorage.setItem('list1:auth:Id', Id)
    // console.log('name',(AsyncStorage.getItem('list1:auth:name')).toString())
    // return((AsyncStorage.getItem('list1:auth:name')))
    // .then(name){
    //   console.log(name)
    // }
  };
};

export const authSetToken = (token, expiryDate,email, name, Id ) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate,
    email: email,
    name: name,
    Id: Id
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        //reject();
        let fetchedToken;
        AsyncStorage.getItem('list1:auth:token')
          .catch((err) => reject())
          .then((tokenFromStorage) => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem('list1:auth:expiryDate');
          })
          .then((expiryDate) => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch((err) => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch((err) => {
        return AsyncStorage.getItem('list1:auth:refreshToken')
          .then((refreshToken) => {
            return fetch(
              'https://securetoken.googleapis.com/v1/token?key=' + API,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=refresh_token&refresh_token=' + refreshToken,
              },
            );
          })
          .then((res) => res.json())
          .then((parsedRes) => {
            if (parsedRes.id_token) {
              console.log('Refresh Token worked!');
              //console.log('prfrom refresh',parsedRes)
              //console.log('ein',parsedRes.refresh_token)
              //console.log('ein',parsedRes.expires_in)
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expiresIn,
                  parsedRes.refresh_token,
                ),
              );
              return parsedRes.id_token;
            } else {
              dispatch(authClearStorage());
            }
          });
      })
      .then((token) => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = (nav) => {
  return (dispatch) => {
    dispatch(authGetToken())
      .then(async(token) => {
        const email = await AsyncStorage.getItem('list1:auth:email');
        const name = await AsyncStorage.getItem('list1:auth:name');
        const Id = await AsyncStorage.getItem('list1:auth:Id');
        //console.log(email)
        await dispatch(getLoggedUser(email))
        await nav.navigation.push('Drawer',{
          email: email,
          name: name,
          Id: Id
        });
      })
      .catch((err) => console.log('Failed to fetch token'));
  };
};

export const authClearStorage = () => {
  return (dispatch) => {
    AsyncStorage.removeItem('list1:auth:expiryDate');
    AsyncStorage.removeItem('list1:auth:token');
    AsyncStorage.removeItem('list1:auth:email');
    AsyncStorage.removeItem('list1:auth:name');
    AsyncStorage.removeItem('list1:auth:Id');
    return AsyncStorage.removeItem('list1:auth:refreshToken');
  };
};

export const authLogout = (nav) => {
  return (dispatch) => {
    dispatch(authClearStorage()).then(() => {
      nav.navigation.push('Login');
    });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN,
  };
};
