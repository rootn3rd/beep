import { Profile } from '../../models/profile/profile';

const profilesList: Profile[] = [
  {
    firstName: 'Pankaj',
    lastName: 'Chaurasia',
    email: 'krishnahare14@gmail.com',
    avatar: 'assets/imgs/avatar.png',
    dateOfBirth: new Date()
  },
  {
    firstName: 'Manisha',
    lastName: 'Modi',
    email: 'manimodi@gmail.com',
    avatar: 'assets/imgs/avatar.png',
    dateOfBirth: new Date()
  },
  {
    firstName: 'Utsav',
    lastName: 'Gupta',
    email: 'utsavg@gmail.com',
    avatar: 'assets/imgs/avatar.png',
    dateOfBirth: new Date()
  },
  {
    firstName: 'Shweta',
    lastName: 'Khera',
    email: 'shwetak@gmail.com',
    avatar: 'assets/imgs/avatar.png',
    dateOfBirth: new Date()
  }
];

export const PROFILE_LIST = profilesList;
