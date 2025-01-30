// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import { MessageListing } from "@microfrontend-demo/shared-ui";
import { emailMessages } from "./mockMessages";
export function App() {
  return (
    <div>
       <MessageListing messages={emailMessages || []} ifEmail = {true}/>
      <span>EMAIL APPLICATION</span>
    </div>
  );
}

export default App;
