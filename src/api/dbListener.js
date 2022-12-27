// import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-url-polyfill/auto'
// import {createClient} from '@supabase/supabase-js';

// const SUPABASE_URL = '';
// const SUPABASE_TOKEN = '';

// const startListeningDb = (user_id) => {
//     console.log("listening started")
//     const supabase = createClient(
//         SUPABASE_URL,
//         SUPABASE_TOKEN,
//         {
//             db: {
//                 schema: 'public',
//             },
//             auth: {
//                 storage: AsyncStorage,
//             },
//         }
//     );

//     const listen = supabase
//         .channel('db-changes')
//         .on(
//             'postgres_changes',
//             {
//                 event: 'UPDATE',
//                 schema: 'public',
//                 table: 'lists',
//                 filter: `user_id=eq.${user_id}`,
//             },
//             (payload) => {
//                 console.log('List change received!\n', payload);
//             }
//         )
//         .subscribe();

// }

// module.exports = {startListeningDb};
