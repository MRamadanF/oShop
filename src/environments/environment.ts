// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDfAzGBCU8rs81WTvi8GuYjPADD10EL_2w",
    authDomain: "oshop-f2cb1.firebaseapp.com",
    databaseURL: "https://oshop-f2cb1.firebaseio.com",
    projectId: "oshop-f2cb1",
    storageBucket: "oshop-f2cb1.appspot.com",
    messagingSenderId: "518325350964"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
