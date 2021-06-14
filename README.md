<p align="center" style="border: 1px solid red; border-radius: 10px">
  <img src="src/shared/assets/App-Icon-Round.png" width="100px" height="100px" alt="">
</p>

<h1 align="center">Meine Checkins</h1>

<p align="center">
  A product by <a href="https://railslove.com">Railslove</a>
</p>

<p align="center">
  <img src="https://railslove.semaphoreci.com/badges/wfd-masterapp/branches/master.svg?key=812e5e71-522b-48e9-9872-40a2c9f7f640" title="Build Status" />
</p>

- [Intro](#intro)
- [Why this App?](#why-this-app)
- [How does it work?](#how-does-it-work)
- [Contribute](#contribute)
- [Reporting Bugs and Feaures](#reporting-bugs-and-feaures)
- [License](#license)

# Documentation

## Intro

Meine Checkins is a Meta-App which allows you to perform a #covid19-checkin (e.g. in a restaurant) independent of the provider. It was developed, because there was a huge demand on the market for one particular app.

## Why this App?

In times of COVID we have to fill a lot of check-in forms at local businesses in Germany to leave a trace so is possible to prevent the spread. Because of this data filling there is also a concern about data privacy. This app solves both problems by making easier to fill those forms and keeping data safe on the user’s phone.

The way data is traced by local businesses is that they usually provide a QR code sticker at the table that customers can scan. That code redirects the user to a website were they are asked to fill this check-in information (name, address, phone number). 

## How does it work?

The functionality offered by this app is simple. The app will automatically fill these check-in forms for the user. 

First time the app will ask the user to fill its data letting the user know the data will stay private and stored on the phone. After this step the user can scan a QR code and have the check-in form automatically filled within the app. 

Navigation to the current check-in and a journal of check-ins the user filled in with the app.

All this information is stored on the phone.

## Contribute

## Stack

- React Native for rendering
- TypeScript for typing
- redux for state management
- react-i18next for internationalization

## Setup

Follow the environment setup for react native. Some basic knowledge of TypeScript and redux would be useful but you can also have a look at the codebase.

Once you have setup your environment

- install dependencies with `yarn install` and then `cd ios && pod install`
- run the development server with `yarn start`
- build the app with `yarn ios` or `yarn android`

## Deployment

For deployment we have Semaphore CI setup. Once a release is ready create a branch with that release name. Test it and once is ready tag it. After that go to Semaphore and start the builds for promoting the app to google play and TestFlight.

## Testing

For testing different providers you can add the provider check-in url to `src/testData.ts`. In development mode that URL will be listed under the Scan QR screen so you don’t need to scan the QR code (since that would be cumbersome with a device or impossible with the simulator). 

If you need to transform a QR code image to an url you can use a tool [like this one](https://qreader.online/).

## Reporting Bugs and Feaures

<a href="github.com/railslove/wfd-masterapp-backlog/issues" title="Open Issues"><img src="https://img.shields.io/github/issues/railslove/wfd-masterapp-backlog"></a> 

To report bugs and features refer to [our backlog](github.com/railslove/wfd-masterapp-backlog).

## Integration Guideline

### Prerequisite

* https://d-64.org/check-in-app/
* Whitepaper explaining security concept especially how data is stored

### The Flow

* Data stored in the app only
* Data copied into the the form of the checkin provider
* Reading data from the checkin-page (name of the place, confirmation information)
* Storing contact tracing entry on the phone 
* All data stored locally

### Changes to be done by the provider

* Check-in form inputs should use [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes for
  * `name` (or `given-name` and `family-name` separately)
  * `tel`
  * `street-address`
  * `postal-code`
  * `address-level2`

* For signaling check-in and check-out to the app
  * the `check-in` element should have a `data-wfd-action="check-in"`
  * the `check-out` element should have a `data-wfd-action="check-out"`

* Other data
  * the `location` name on an element (can be anything) with `data-wfd-location="<restaurant-name>"`

### HTML examples

Here is how the check-in form should look like. 

The order of the fields doesn't matter.

You can include the `location` on the `check-in` or in the `check-out` page.

```html
<!-- using name only for the full user name -->
<form data-wfd-location="Frische Küche Restaurant">
  <input autocomplete="name" type="text" />
  <input autocomplete="tel" type="text" />
  <input autocomplete="street-address" type="text" />
  <input autocomplete="postal-code" type="text" />
  <input autocomplete="address-level2" type="text" />
​
  <button data-wfd-action="check-in" type="submit">check-in</button>
</form>
​
<!-- using first and last name separately -->
<form data-wfd-location="Frische Küche Restaurant">
  <input autocomplete="given-name" type="text" />
  <input autocomplete="family-name" type="text" />
  <input autocomplete="tel" type="text" />
  <input autocomplete="street-address" type="text" />
  <input autocomplete="postal-code" type="text" />
  <input autocomplete="address-level2" type="text" />

  <button data-wfd-action="check-in" type="submit">check-in</button>
</form>
```

Example check-out page

```html
<form data-wfd-location="Café um die Ecke">
  <button data-wfd-action="check-out" type="submit">check-out</button>
</form>
```

Other data like the location can be added to any element. In these examples was added to the form for simplicity.

### Submitting the app 

* Edit the provider-admission.json and make a pull-request
* The provider-admission.json contains following information:
** name of the provider
** logo url
** checkin-page url
** link to the security paper or open source repository (file) explaining the security concept
* Pull-request will be reviewed by core commitors


To be done

# License

GNU AGPL (GNU Affero General Public License v3.0)
