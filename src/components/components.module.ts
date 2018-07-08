import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { SendMessageBoxComponent } from './send-message-box/send-message-box.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { OnlineUsersComponent } from './online-users/online-users.component';
import { LastMessageListComponent } from './last-message-list/last-message-list.component';
@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    EditProfileComponent,
    ProfileViewComponent,
    ProfileSearchComponent,
    SendMessageBoxComponent,
    ChatMessageComponent,
    OnlineUsersComponent,
    LastMessageListComponent
  ],
  imports: [IonicModule],
  exports: [
    LoginFormComponent,
    RegisterFormComponent,
    EditProfileComponent,
    ProfileViewComponent,
    ProfileSearchComponent,
    SendMessageBoxComponent,
    ChatMessageComponent,
    OnlineUsersComponent,
    LastMessageListComponent
  ]
})
export class ComponentsModule {}
