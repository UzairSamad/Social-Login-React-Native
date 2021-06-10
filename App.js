import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { Button, View, Text } from 'react-native';



const App = () => {

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  function GoogleSignIn() {
    return (
      <Button
        title="Google Sign-In"
       
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      />
    );
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '810597468539-ffkl7sfn2spnevkq7isdndlpqn7kra5v.apps.googleusercontent.com',
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
      </View>
    </View>
  )
}

export default App