# Overview

We need to effectively replace any React HTML component with a version that is routed through our
Styled-Component so that it can pick up our theme. In order to do this, you can look to our button
example. Any component that we attempt to override from React, we will largely just change the name
by capitalizing the first letter, and keep the name otherwise the same. These styled components, are
intended to only change and modify the css style properties, and should otherwise extend the original
react functionality. Let's look at the button example.

```
import styled from "styled-components";


const StyledButton = styled.button`
    color: ${props => props.theme.colors.main}
`;
```

Similar to how we are altering the name from the original component by only capitalizing the first
letter, the styled component is similarly prefixed with Styled, and the name is otherwise kept the
same.

Once we have the styled variant we will create the exported variable that will be our new component
as well as an interface that extends the base components type. Let's go ahead and create the interface and type. The interface name will be the same as the component, but we will append it's name with props.
Thereby, `Button` will have an interface called `ButtonProps`. Here is what it will all look like.

```
import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";


const StyledButton = styled.button`
    color: ${props => props.theme.colors.main}
`;

interface ButtonProps extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
    return <StyledButton {...props}> {children}</StyledButton>
    
}
```

There are a few important things you'll need to put this all together. The main thing to determine
is the interface that we will choose to extend from React. In the case of Button, and most other
components, this will always be made up of two interfaces, where the first expects another interface
to be casted since it's implemented to support generics. In the case of button, this can be seen
with `ButtonHTMLAttributes<HTMLButtonElement>`, whereby `ButtonHTMLAttributes<T>` expects another
interface to be passed to satisfy the generic `T`.

The styled component will expect this as well, and if you provided `HTMLButtonELement` directly, you
would not be able to spread the props as can be seen above. All of the types that you'll be working
with can be found on the [DefinitelyTyped - React Github](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts). If you are working on a component, and you are
unsure as to which interface needs to be extended, you can figure this out by using the LSP hover
on the component you are looking to extend. In our case we extended button, and when we use the hover
command, this is the type information provided:

```
(property) JSX.IntrinsicElements.button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
```

When I first did the hover, I was unsure which type we needed to pass, and I first assumed that it was
the HTMLButtonElement. This was very close, but the styledButton expected the interface expecting the
generic casting of HTMLButtonElement, and thereby the type we wanted to extend was the full
React.`DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`. As previously stated, for all components you will work
to extend through styled components, you can find all of these types on the github link referenced above.

Technically You could extend only the `ButtonHTMLAttributes<HTMLButtonElement>`, but the `DetailedHTMLProps` is more comprehensive. So we will prefer this. To provide an overview of the different
Reference as follows:

- ButtonHTMLAttributes<HTMLButtonElement> is more concise and directly represents the props/attributes available for a button element.
React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> is more comprehensive as it includes both:

- The button attributes (from ButtonHTMLAttributes)
The ref property and other detailed React-specific props that might be associated with the HTML element

In practice, for most use cases, you won't notice a difference between the two approaches. DetailedHTMLProps is essentially a more complete type that includes additional React-specific properties, but the basic ButtonHTMLAttributes covers most common use cases.
