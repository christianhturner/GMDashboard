# State Manager

A lightweight state management solution built on top of EventBus for TypeScript applications.

## Features

- Global state management with TypeScript support
- Simple API for state updates and subscriptions
- Namespace-based state isolation
- Built on top of existing EventBus implementation

## Usage

### 1. Creating a State

First, define your state interface and create a state instance:

```typescript
interface UserState {
    name: string;
    email: string;
    isLoggedIn: boolean;
}

export const userState = createState<UserState>({
    namespace: 'user',
    initialState: {
        name: '',
        email: '',
        isLoggedIn: false
    }
});
```

## API Reference

createState<T>(config: StateConfig<T>)
Creates a new state instance with the specified configuration.
Parameters:
config.namespace: Unique identifier for the state
config.initialState: Initial state value

Returns a StateDefinition object with:

config: The original configuration
actions: State management methods

setState(newState): Update state partially or fully
getState(): Get current state
subscribe(callback): Subscribe to state changes

## Best Practices

Create separate files for each state definition
Use meaningful namespaces to avoid conflicts
Always cleanup subscriptions when components are destroyed
Use TypeScript interfaces to define state shape

```
