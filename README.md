# Litten

Litten mobile app repository using React Native

## Development Commands

```sh
# Install dependencies
yarn install

# Install the cocoapods dependencies
yarn pods

# Run the Android simulator
yarn android

# Run the iOS simulator
yarn ios

# Run the ES linter
yarn lint

# Run Prettier
yarn pretty

# Run the Flow type checker
yarn type-check

# Run the tests
yarn test

# Prepare the data dependencies
yarn prepare-data

# This will start the Firebase Emulator
yarn start:firebase

# This will seed the Firestore DB with some data
yarn firestore:seed
```

## Environment

Customize the environment variables, some functions might fail due to lack of
certain API keys.

```sh
cp .env.example .env

cp android/secure.properties.example android/secure.properties
```

The `GOOGLE_API_KEY` needs to be available for the location functions.

Detailed instructions on how to setup the environment are available
[here][env-setup].

## Backend

Currently, the project relies on a [Firebase][firebase] infrastructure. The app
will fail to build until a new project is [setup][setupfirebase] and the
`GoogleService-Info.plist` configutarion file is added to the `ios` directory,
as well as the `google-services.json` file to `android/app`.

Additionally, you should install, configure and integrate the
[Local Emulator Suite][emulator].

### Current API dependecies

- [Google Maps (Geocoding)][googleapikey]

## License

The project's source code is licensed as [AGPL-3.0][license], but the images and
the design are [not licensed][licenseimgs].

<!-- References -->

[env-setup]: https://reactnative.dev/docs/environment-setup
[firebase]: https://firebase.google.com
[setupfirebase]: https://firebase.google.com/docs/ios/setup
[emulator]: https://firebase.google.com/docs/emulator-suite/install_and_configure
[googleapikey]: https://developers.google.com/maps/documentation/geocoding/get-api-key
[license]: ./LICENSE
[licenseimgs]: ./lib/images/README.md
