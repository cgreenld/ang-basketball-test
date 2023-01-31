import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { initialize, LDClient, LDFlagSet } from 'launchdarkly-js-client-sdk';

// here is a model "darkly" service that you can use to connect and leverage LaunchDarkly Flags in an angular application
// for those looking to see where flags are applied, the players component toggles the "add player" button with a flag

@Injectable({
  providedIn: 'root'
})
export class DarklyService {
  ldClient: LDClient;
  public flagsReady$: Subject<void> = new Subject<void>(); // this will be used to understand flag state during initalization and indentify calls

  constructor() {
    // add the launchdarkly client side here in order to reference the specfic environemnt
    this.ldClient = initialize("",
      { key: "connortest", 
        anonymous: false 
      }
    );

    this.ldClient.on('change', () => {
      this.flagsReady$.next(); // here we want to update the object as well since we had a change to the flag values
      console.log("Flags updated.")
   });

   this.ldClient.on('ready', () => {
    console.log("SDK Initalized")
    this.flagsReady$.next(); // update the flag state since we now have a client ready to use
    return this.ldClient; // return that client
   })
  }

   getFlagBooleanValue(key:string, defaultValue: boolean) {
    if (defaultValue == null || defaultValue == undefined) {
      defaultValue = false
    }
    // insert possible logging if needed
    return this.ldClient.variation(key,defaultValue)
  }

  changeUser(user: string) {
    console.log("updating user") // this can be modified with a more complex object to pass or dedicated fields
    /*

    below could be an example of a user object, in early 2023 this will be updated to the idea of context, 
    but the idea remains of passing information that can then be used to target features

    
    user  = {
      key: ""
      email: ""
      custom: {
        division: ""
        age: ""
      }
    }

    */
    if(user !== "Anonymous") {
      this.ldClient.identify({key: user, name: user, anonymous: false});
    }
    else {
      this.ldClient.identify({key: 'anon', anonymous: true});
    }
  }
}

