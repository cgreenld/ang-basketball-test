import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { initialize, LDClient, LDFlagSet } from 'launchdarkly-js-client-sdk';

// set up a user to pass 

@Injectable({
  providedIn: 'root'
})
export class DarklyService {
  ldClient: LDClient;
  flags: LDFlagSet;
  flagChange:Subject<Object> = new Subject<Object>();
  public sdkReady$: Subject<void> = new Subject<void>();

  constructor() {
    this.flags = {'beta_users': false};

    // edit here to add the key
    this.ldClient = initialize("61faede4102b18146a95fddc",
      { key: "connortest", 
        anonymous: false 
      }
    );
    // figure out how to re render components

    this.ldClient.on('change', (flags) => {
      if(flags['beta_users'] !== undefined) {
        this.flags['beta_users'] = flags['beta_users'];
      }
      this.flagChange.next(this.flags);
      console.log("Flags updated.")
   });

   this.ldClient.on('ready', () => {
    console.log("we should be done now")
    this.setFlags();
    this.sdkReady$.next();
    return this.ldClient;
     // render app
   })
  }

  changeUser(user: string) {
    console.log("updating user")
    if(user !== "Anonymous") {
      this.ldClient.identify({key: user, name: user, anonymous: false});
    }
    else {
      this.ldClient.identify({key: 'anon', anonymous: true});
    }
  }
  setFlags() {
    this.flags = this.ldClient.allFlags();
    console.log("Flags initialized.");
  }
}

