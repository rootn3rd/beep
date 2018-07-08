import { PROFILE_LIST } from '../profiles/profiles';
import { Message } from '../../models/messages/message';

let userList = PROFILE_LIST;
const messageList: Message[] = [];
//  [
//     { user: userList[0], date: new Date() },
//     { user: userList[1], date: new Date() },
//     { user: userList[2], date: new Date() },
//     { user: userList[3], date: new Date() }
// ];

// userList.forEach(user => {
//   messageList.push({ user, date: new Date(), lastMessage: 'Hi there!' });
//   messageList.push({ user, date: new Date(), lastMessage: 'Hi there!' });
// });

export const MESSAGE_LIST = messageList;
