import { Profile } from '../profile/profile';

// export interface Message {
//   user: Profile;
//   date: Date;
//   lastMessage: string;
// }

export interface Message {
  userFromId: string;

  userFromProfile: {
    firstName: string;
    lastName: string;
  };

  userToId: string;

  userToProfile: {
    firstName: string;
    lastName: string;
  };

  content: string;
}
