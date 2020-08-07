# List1

list1 is a mobile application created to keep track of shopping lists and utility bills.
It includes following features in following modules.
- ##### User Module
- ##### Product Module
- ##### Shop Module
- ##### Utility Bills Module 
- ##### Shopping List Module

### App Installation 

- The following permissions are used in this mobile application 

```sh
<uses-permission  android:name="android.permission.INTERNET" />

<uses-permission  android:name="android.permission.ACCESS_COARSE_LOCATION" />

<uses-permission  android:name="android.permission.ACCESS_FINE_LOCATION" />

<uses-permission  android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<uses-permission  android:name="android.permission.READ_EXTERNAL_STORAGE" />

<uses-permission  android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION"/>

<uses-permission  android:name="android.permission.CAMERA"/>

<uses-feature  android:name="android.hardware.camera"  android:required="true"/>
```

Hence following system requirements has to be fullfilled for this mobile application to run. 
- Mobile platform: Android 
- Required API Level: 23 
- Internet facility 
- Mobile GPS

*With the above requirements fullfilled any user can install the app from using apk file.*

After succuessful installation user will be brought into Login page, in there he can switch to signup mood and create an account. When account is successfully created, user can use the **list1** mobile app. 

### App Development 

- Node, Android Emulator or an Android Phone is prerequist for this project. 
-   Setting up the enviroment to develop the app can be found in this link : https://reactnative.dev/docs/environment-setup
- First the project should be cloned or downloaded from the git hub. 
- Following API keys should be achieved from the Google API 
    - Geocoding API 
    - Maps SDK for Android 
    - Places API 
- After successfully replacing the API keys used with following commands you can set a working project. 
```sh
$npm install
$react-native link
$npx react-native run-android
```

If the setup process is successfully done, list1 will run on your android phone or android emulator.
