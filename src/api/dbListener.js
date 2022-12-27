import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
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

/* 
function Screen() {
  async function onCreateTriggerNotification() {
    const date = new Date(Date.now());
    date.setHours(11);
    date.setMinutes(10);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
    
} */
const startListeningDb = async (user_id, isSubscribed) => {
  console.log("listening started");

  if (!isSubscribed) {
    const listen = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "lists",
          filter: `user_id=eq.${user_id}`,
        },
        (payload) => {}
      )
      .subscribe();
  } else {
    const removeListen = supabase.removeAllChannels();
    console.log("listening stopped");
  }
};

module.exports = { startListeningDb };
