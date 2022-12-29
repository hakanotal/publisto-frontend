import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import componentDidMount from "react";
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar,Text } from 'react-native-paper';

import getUserInfo from "../functions/getUserInfo";

import { useEffect } from "react";

const SUPABASE_URL = "https://wfktbycfxvvjruxuqwey.supabase.co/";
const SUPABASE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indma3RieWNmeHZ2anJ1eHVxd2V5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2ODUxMjE3MCwiZXhwIjoxOTg0MDg4MTcwfQ.3V5pKqPt5dRO8vk7jMePTPCiinWdWDoO1qVqvaUQ0Oc";
const supabase = createClient(SUPABASE_URL, SUPABASE_TOKEN, {
  db: {
    schema: "public",
  },
  auth: {
    storage: AsyncStorage,
  },
});

visible = false;
const startListeningDb = async (user_id, isSubscribed) => {

  if (!isSubscribed) {
  } else {
    const removeListen = supabase.removeAllChannels();
    console.log("listening stopped");
  }

};


function Notification({auth}) {

  const [visible, setVisible] = React.useState(false);
  const [changedList,setChangedList] = React.useState(null);


  useEffect(() => {
    (async function () {
      const userInfo = await getUserInfo();
      user_id = userInfo.id;
      console.log("Listening started");
      const listen =  supabase
          .channel("db-changes")
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "lists",
              filter: `user_id=eq.${user_id}`,
            },
            (payload) => {setVisible(true); console.log(visible) ; setChangedList(payload.new.name); console.log(changedList); console.log("payload", payload)}
          )
          .subscribe();
    })();
  },[auth]);
  return (
    <View>
      <View style={styles.container} >
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Got it',
          onPress: () => {
            setVisible(false)
          },
        }}>
        <Text style= {{color:"white"}}> There have been some changes on {changedList} </Text>
      </Snackbar>
    </View>

    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

module.exports = { startListeningDb , Notification};

