# master-checking-app

[![Build Status](https://railslove.semaphoreci.com/badges/wfd-masterapp/branches/master.svg?key=812e5e71-522b-48e9-9872-40a2c9f7f640)](https://railslove.semaphoreci.com/projects/wfd-masterapp)

- [Design](https://www.figma.com/file/V3BpuWfcKknRHQIXqc7P9i)
- [Planning](https://github.com/railslove/wfd-masterapp/projects)

# documentation

# Integration Guideline

## Prerequisite

* https://d-64.org/check-in-app/
* Whitepaper explaining security concept especially how data is stored

## The Flow

* Data stored in the app only
* Data copied into the the form of the checkin provider
* Reading data from the checkin-page (name of the place, confirmation information)
* Storing contact tracing entry on the phone 
* All data stored locally

## Changes needs to be done by the provider

* Check-in form inputs should use [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes for
  * `name` (or `given-name` and `family-name` separately)
  * `tel`
  * `street-address`
  * `postal-code`
  * `address-level2`

* For signaling check-in and check-out to the app
  * the `check-in` button should have a `data-wfd-action="check-in"`
  * the `check-out` button should have a `data-wfd-action="check-out"`

## Check-in form examples

Here is how the check-in form should look like. 

The order of the fields doesn't matter

```html
<!-- using name only for the full user name -->
<form>
  <input autocomplete="name" type="text" />
  <input autocomplete="tel" type="text" />
  <input autocomplete="street-address" type="text" />
  <input autocomplete="postal-code" type="text" />
  <input autocomplete="address-level2" type="text" />
​
  <button data-wfd-action="check-in" type="submit">check-in</button>
</form>
​
<!-- using first and last name separately only for the full user name -->
<form>
  <input autocomplete="given-name" type="text" />
  <input autocomplete="family-name" type="text" />
  <input autocomplete="tel" type="text" />
  <input autocomplete="street-address" type="text" />
  <input autocomplete="postal-code" type="text" />
  <input autocomplete="address-level2" type="text" />
​
  <button data-wfd-action="check-in" type="submit">check-in</button>
</form>
```

The checkout form only needs to have

```html
<form>
  <button data-wfd-action="check-out" type="submit">check-out</button>
</form>
```

# Submitting the app 

* Edit the provider-admission.json and make a pull-request
* The provider-admission.json contains following information:
** name of the provider
** logo url
** checkin-page url
** link to the security paper or open source repository (file) explaining the security concept
* Pull-request will be reviewed by core commitors


To be done
