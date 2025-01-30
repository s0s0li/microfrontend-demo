// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { useState } from 'react';

import NxWelcome from './nx-welcome';
// import MessageListing from "shared-ui/MessageListing";
import { MessageListing } from "@microfrontend-demo/shared-ui";
// import MessageListing from 'host/message-listing';
import { chatMessages } from "./mockMessages";
export function App() {
  return (
    <div>
      {/* <NxWelcome title="chat" /> */}
      <MessageListing messages={chatMessages || []} ifEmail = {false} />
      <div className="flex-1 p-4">Chat Window</div>
      New
    </div>
  );
}

export default App;
