import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Text, View } from 'react-native';
import {
  getDJISDKEventEmitter,
  sendTestEvent,
} from 'react-native-dji-mobile-sdk';

export default function App() {
  useEffect(() => {
    const eventEmitter = getDJISDKEventEmitter();
    const subscribe = eventEmitter.addListener('*', (event: any) => {
      console.log(event);
      Toast.show({
        text1: 'Event ALL received',
      });
    });
    const subscribe2 = eventEmitter.addListener(
      'PRODUCT_CONNECTED',
      (event: any) => {
        console.log(event);
        Toast.show({
          text1: 'Event received',
        });
      }
    );

    return () => {
      subscribe.remove();
      subscribe2.remove();
    };
  }, []);

  return (
    <View>
      <Text>Result</Text>
      <Button onPress={sendTestEvent} title="Click to send" />
      <Toast />
    </View>
  );
}
