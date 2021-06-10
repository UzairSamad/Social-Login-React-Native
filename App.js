import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { Button, View, Text } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';




const App = () => {

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    alert(JSON.stringify(googleCredential))
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    alert(JSON.stringify(facebookCredential))
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  function GoogleSignIn() {
    return (
      
      <Button
        title="Google Sign-In"
       
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!')).catch(error=>console.log(error))}
      />
    );
  }

  function FacebookSignIn() {
    return (
      <Button
        title="Facebook Sign-In"
        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
      />
    );
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "810597468539-mfkk88gs1m040cm3dc4t4vsk841mopo8.apps.googleusercontent.com",
    });

  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Welcome to Social Login Application</Text>
      </View>
      <View style={{ flex: 0.8,  }}>
        {/* <Text style={{ fontSize: 18 }}>Welcome to Social Login Application</Text> */}
        {GoogleSignIn()}
        <View style={{marginTop:20}}>

        {FacebookSignIn()}
        </View>
      </View>
    </View>
  )
}

export default App