import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, mergeMap, tap, first, catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { ChannelMessage } from '../../models/channel/channel-message';
import { Message } from '../../models/messages/message';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ChatService {
  constructor(
    private authService: AuthService,
    private database: AngularFireDatabase
  ) {}

  addChannel(channelName: string) {
    this.database.list('/channel-names/').push({ name: channelName });
  }

  getChannels() {
    return this.database
      .list('channel-names')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            return {
              key$: c.payload.key,
              ...c.payload.val()
            };
          });
        })
      );
  }

  getChannelChats(channelKey: string) {
    return this.database
      .list(`/channels/${channelKey}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            return {
              key: c.payload.key,
              ...c.payload.val()
            };
          });
        })
      );
  }

  async sendChannelChatMessage(
    channelKey: string,
    channelMessage: ChannelMessage
  ) {
    await this.database.list(`/channels/${channelKey}`).push(channelMessage);
  }

  async sendChat(message: Message) {
    await this.database.list(`/messages`).push(message);
  }

  getChats(userToId: string) {
    return this.authService.getAuthenticatedUser().pipe(
      map(auth => auth.uid),
      mergeMap(uid =>
        this.database
          .list(`/user-messages/${uid}/${userToId}`)
          .snapshotChanges()
          .pipe(map(changes => changes.map(c => c.payload.key)))
      ),
      tap(m => console.log('Messages =>', m)),
      mergeMap(chats => {
        return forkJoin(
          chats.map(c =>
            this.database
              .object(`messages/${c}`)
              .valueChanges()
              .pipe(first())
          )
        );
      }),
      tap(c => console.log('chats =>', c))
    );
  }

  getLastMessages() {
    return this.authService.getAuthenticatedUser().pipe(
      map(auth => auth.uid),
      mergeMap(authId =>
        this.database
          .list(`last-messages/${authId}`)
          .snapshotChanges()
          .pipe(
            map(changes =>
              changes.map(c => {
                return {
                  key: c.payload.key,
                  ...c.payload.val()
                };
              })
            )
          )
      ),
      tap(c => console.log('Last messages =>', c)),
      mergeMap(chats => {
        return forkJoin(
          chats.map(c =>
            this.database
              .object(`messages/${c.key}`)
              .valueChanges()
              .pipe(first())
          )
        );
      }),
      tap(c => console.log('last chats =>', c)),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }
}
