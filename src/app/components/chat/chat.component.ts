import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ChatService } from 'src/app/services/chat.service';
import { SignalRService } from 'src/app/services/signaIR.Service';
import { AvatarUtility } from 'src/app/common/utility/avatar.utility';
import { MessageResponse } from 'src/models/message/message-response';
import { MessageRequest } from 'src/models/message/message-request';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  message = new MessageRequest();
  messages: MessageResponse[] = [];

  currentUserId: number;
  isAdmin: boolean;

  pageIndex = -1;
  pageSize = 10;

  @ViewChild('messagesBlock') messagesBlock: ElementRef;

  constructor(public signalRService: SignalRService, public chatService: ChatService, public accountService: AccountService){
      this.signalRService.addListener('ReceiveMessage', (message: MessageResponse) => {
        message.avatarUrl = AvatarUtility.buildAvatarUrl(message.avatarUrl);
        console.log(message);
        this.messages.unshift(message);
        this.scrollToBottom();
      });
      
      this.signalRService.addListener('MessageDeleted', (id:string) => {
        const index = this.messages.findIndex(m => m.id == id);
        if (index !== -1) {
            this.messages.splice(index, 1);
        }
    });
  }
  
  ngOnInit(): void {
    this.currentUserId = this.accountService.getCurrentUserId();
    this.isAdmin = this.accountService.isAdmin();
    this.loadMessages(); 
    setTimeout(() =>{
      this.scrollToBottom();   
    },500) 
  }

  onScrollUp(){
    this.loadMessages();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesBlock.nativeElement.scrollTop = this.messagesBlock.nativeElement.scrollHeight;
    }, 100);
  }
  
  loadMessages(): void {
    this.pageIndex++;
    this.chatService.getChatMessages(this.pageIndex, this.pageSize)
      .subscribe(newMessages => {
        newMessages.map(x => x.avatarUrl = AvatarUtility.buildAvatarUrl(x.avatarUrl));
        this.messages = [...this.messages, ...newMessages];      
      });
  }

  sendMessage(): void {
    if (this.message.text && this.message.text.trim().length > 0) {
      this.chatService.sendMessage(this.message);
      this.message.text = '';
    }    
  }

  deleteMessage(id: string){
    this.chatService.deleteMessage(id);
  }

  getMessageClass(messageAuthorId: number): any {
    return messageAuthorId == this.currentUserId ? 'self' : 'other';
  }

  blockUser(messageAuthorId){
    this.accountService.blockUser(messageAuthorId).subscribe();
  }
}
