import React from "react";

const GlobalContext = React.createContext({});

export const GlobalConsumer = GlobalContext.Consumer;
export const GlobalProvider = GlobalContext.Provider;

export default GlobalContext;
