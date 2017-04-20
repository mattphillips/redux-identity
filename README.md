# Redux Identity

[![npm version](https://badge.fury.io/js/redux-identity.svg)](https://badge.fury.io/js/redux-identity)
[![Build Status](https://travis-ci.org/mattphillips/redux-identity.svg?branch=master)](https://travis-ci.org/mattphillips/redux-identity)
[![Coverage Status](https://coveralls.io/repos/github/mattphillips/redux-identity/badge.svg?branch=master)](https://coveralls.io/github/mattphillips/redux-identity?branch=master)
![size](https://img.shields.io/badge/size-695%20Bytes-brightgreen.svg)

Super tiny redux identity reducer for persisting a slice of state after updates.

## Installation

```
npm install --save redux-identity
```

```
yarn add redux-identity
```

## API

### IdentityReducer(initialState)
`IdentityReducer :: a -> a -> a`

 - **parameter**: initial state of reducer
 - **return**: a reducer which when invoked by redux will return the given slice of state or the initial reducer state if no slice exists

## Usage

### Reducer only initial state
No initial state is supplied to the `createStore` function
```js
import IdentityReducer from 'redux-identity';
import { combineReducers, createStore } from 'redux';

import apiReducer from '../some/local/path';
import counterReducer from '../some/other/local/path';

const reducers = combineReducers({
  CLIENT_ID: IdentityReducer('SOME UNIQUE ID'),
  api: apiReducer,
  counter: counterReducer
});

let store = createStore(reducers);

store.subscribe(() => console.log(store.getState());

// Dispatching any action will not update the value of state at the identity reducer slice
store.dispatch({ type: 'FETCH' });
// { CLIENT_ID: 'SOME UNIQUE ID', api: {...}, counter: 0 }

store.dispatch({ type: 'INCREMENT' });
// { CLIENT_ID: 'SOME UNIQUE ID', api: {...}, counter: 1 }

store.dispatch({ type: 'DECREMENT' });
// { CLIENT_ID: 'SOME UNIQUE ID', api: {...}, counter: 0 }
```

### Redux Store Initial State
Initial state of the identity reducer is overridden and then persisted by the corresponding slice of the state object provided to the `createStore` function
```js
import IdentityReducer from 'redux-identity';
import { combineReducers, createStore } from 'redux';

import apiReducer from '../some/local/path';
import counterReducer from '../some/other/local/path';

const reducers = combineReducers({
  CLIENT_ID: IdentityReducer('SOME UNIQUE ID'),
  api: apiReducer,
  counter: counterReducer
});

let store = createStore(reducers, { CLIENT_ID: '123456789' });

store.subscribe(() => console.log(store.getState());

// Dispatching any action will not update the value of state at the identity reducer slice
store.dispatch({ type: 'FETCH' });
// { CLIENT_ID: '123456789', api: {...}, counter: 0 }

store.dispatch({ type: 'INCREMENT' });
// { CLIENT_ID: '123456789', api: {...}, counter: 1 }

store.dispatch({ type: 'DECREMENT' });
// { CLIENT_ID: '123456789', api: {...}, counter: 0 }
```

## License
MIT
