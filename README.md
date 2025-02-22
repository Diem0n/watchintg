# Connect Expo Managed App with HealthConnect

1. First install the following packages:

    ```cmd
    npm install expo-health-connect
    ```

    ```cmd
    npm install expo-build-properties --save-dev
    ```

    ```cmd
    npx expo install expo-dev-client
    ```

2. create a file named `androidManifestPlugin.js` in the root for your project directory and add the following snippet in it:

    ```javascript
    const { withAndroidManifest } = require('@expo/config-plugins');

    module.exports = function androidManifestPlugin(config) {
    return withAndroidManifest(config, async (config) => {
        let androidManifest = config.modResults.manifest;

        androidManifest.application[0].activity[0]['intent-filter'].push({
        action: [
            {
            $: {
                'android:name': 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE',
            },
            },
        ],
        });

        return config;
    });
    };
    ```

3. add the permissions to your `app.json` like the following (these should be the permissions u need for accessing the type of metrics you need ) this example app uses all the available metrics you can extract from health connect refer to `app.json` for complete list or you can visit this link for complete documentation  [React Native Health Connect](https://matinzd.github.io/react-native-health-connect/docs/get-started/):

    ```json
    "permissions": [
        "android.permission.health.READ_ACTIVE_CALORIES_BURNED",
        "android.permission.health.WRITE_ACTIVE_CALORIES_BURNED",
        "android.permission.health.READ_BASAL_BODY_TEMPERATURE",
        "android.permission.health.WRITE_BASAL_BODY_TEMPERATURE",
        "android.permission.health.READ_BASAL_METABOLIC_RATE",
        "android.permission.health.WRITE_BASAL_METABOLIC_RATE",
        "android.permission.health.READ_BLOOD_GLUCOSE",
        "android.permission.health.WRITE_BLOOD_GLUCOSE",
        "android.permission.health.READ_BLOOD_PRESSURE",
        "android.permission.health.WRITE_BLOOD_PRESSURE",
    ]
    ```
    
    also make sure your `plugins` in `app.json` have these:

    ```json
        "plugins": [
      "./androidManifestPlugin.js",
      "expo-health-connect",
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 35,
            "targetSdkVersion": 35,
            "minSdkVersion": 26
          }
        }
      ]
    ],
    ```
    *if you get any errors related to sdk version modify the above three values in android build properties*
4. Copy paste the `useHealthData.ts` hook from the hooks folder of this project to your project 
   and modify according to your needs and specified permissions from the  `app.json`.

5. copy paste the prebuild script command from package.json to your scripts tag:

    ```json
    {
    "prebuild" : "npx expo prebuild --platform android --clean",
    }
    ```

6. Run the prebuild command:

    ```cmd
    npm run prebuild 
    ```

7. connect your device to via usb or wireless pairing to adb(this requires android studio to be installed)

    ```cmd
    adb pair ip:port
    ```

    this will prompt for paring code enter that and you are good to go 


8. run the following command:
    ```cmd
   npm run android 
   ```
   *it will take somtime first time subsequent builds will be faster you only need to run the prebuild command first time around after that just run this command*

`Note:`
Sometimes there is an error about sdk not found when `ANDROID_HOME` is not set properly to solve this create a `local.properties` file in the `android` folder at the root level and add the following line:

```properties 
sdk.dir = C:\\Users\\YOUR_USER_NAME\\AppData\\Local\\Android\\Sdk
```

### NOTE:

- To test the integration you can refer to the code in index.tsx and components and display values in your UI 

- In order to add data to health connect navigate to this directory `helperPackages` in the root directory of this repo and install the `HealthConnectToolbox-1_12.apk` on your target device and once installed click on request all permissions grant those and proceed to add data to health connect this is an independent process for testing the integration

- Keep in Mind you will no longer be able to run this app in expo go but if you dont visit this page in app you can continue using expo go you can also switch to expo go by shaking your device and switching from dev menu