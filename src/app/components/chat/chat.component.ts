import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { SignalRService } from 'src/app/services/signaIR.Service';
import { AvatarUtility } from 'src/app/utility/avatar.utility';
import { MessageRequestModel } from 'src/models/DTO/RequestModels/MessageRequestModel';
import { MessageResponseModel } from 'src/models/DTO/ResponseModels/MessageResponseModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  message = new MessageRequestModel();
  messages: MessageResponseModel[] = [];

  currentUserId = localStorage.getItem("userId");

  pageIndex = -1;
  pageSize = 10;

  @ViewChild('messagesBlock') messagesBlock: ElementRef;

  constructor(public signalRService: SignalRService, public chatService: ChatService){
      this.signalRService.hubConnection.on('ReceiveMessage', (message: MessageResponseModel) => {
        this.messages.unshift(message);
        this.scrollToBottom();
      });
      
      this.signalRService.hubConnection.on('MessageDeleted', (id:string) => {
        const index = this.messages.findIndex(m => m.id == id);
        if (index !== -1) {
            this.messages.splice(index, 1);
        }
    });
  }
  
  ngOnInit(): void {
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
}
