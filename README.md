<p align="center"><a href="https://comhype.herokuapp.com" target="_blank"><img src="https://dantindurand.fr/img/comhype.png" width="400"></a></p>

<p align="center">
<a href="#"><img src="https://img.shields.io/badge/Contributors-1-green?style=plastic&logo=github" alt="Contributors"></a>
<a href="#"><img src="https://img.shields.io/badge/Version-0.1.2-green?style=plastic" alt="Version"></a>
<a href="#"><img src="https://img.shields.io/badge/Branches-1-white?style=plastic" alt="Branches"></a>
</p>

## 💡 About Comhype

Comhype is a crowdfunding mobile application allowing project leaders to get a first feedback on their project.

## ⚙️ Installation

1. clone the repository `git clone git@github.com:com-hype/app.git`
2. cd into the directory `cd app`
3. create a `.env` file
4. install dependencies `yarn`
5. run `yarn start`
6. follow the instructions

   **For iOS Simulator:**

   - `cd ios`
   - `pod install`
   - `cd ..`
   - `yarn ios:dev`

   **For Android:**

   - `yarn android:dev`

## 📥 Build

For Android:

Run `yarn android:release`.
The app will be available in the `android/app/release/app-universal-release.apk` file

<!-- For iOS:

Run `yarn ios:dev`. The app will be available in the `ios/app-universal-release/app-universal-release.ipa` file -->

## 📐 Structure

Thes project use atomic design to structure the code.

```
└── src
    ├── assets
    ├── components
    │   ├── atoms/
    │   ├── molecules/
    │   ├── organisms/
    │   └── templates/
    │
    ├── core <-- includes store and app.js
    ├── features
    │   ├── account/
    │   ├── authentication/ <-- user.redux.js
    │   └── .../
    │
    ├── helpers
    ├── navigations
    ├── theme
    └── utils
```

## Dependencies

- React Native 0.68.0
- Redux
- Redix Persist
- React Navigation
- Axios
- Lottie
- PusherJS
- Stripe

## 📝 Crédits

Developed by [@dantin-durand](https://github.com/dantin-durand)
