fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
### app_icon
```
fastlane app_icon
```
Create App Icon from ./src/shared/assets/App-Icon.png
### make_badge
```
fastlane make_badge
```
Make new versioned icon badges.
### bump_badge
```
fastlane bump_badge
```
Bump and badge iOS and Android.

----

## Android
### android deploy
```
fastlane android deploy
```
Deploy Android

Build with code signing and upload to Google Play Internal
### android bump_badge_deploy_staging
```
fastlane android bump_badge_deploy_staging
```
Bump, badge, deploy staging Android.
### android bump_badge_deploy_prod
```
fastlane android bump_badge_deploy_prod
```
Bump, badge, deploy production Android.

----

## iOS
### ios deploy
```
fastlane ios deploy
```
Deploy iOS

Build with code signing and upload to testflight
### ios bump_badge_deploy_staging
```
fastlane ios bump_badge_deploy_staging
```
Bump, badge, sign, build, deploy staging iOS.
### ios bump_badge_deploy_prod
```
fastlane ios bump_badge_deploy_prod
```
Bump, badge, sign, build, deploy production iOS.

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
