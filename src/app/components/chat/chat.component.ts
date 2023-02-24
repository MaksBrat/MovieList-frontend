import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { SignalConstants } from 'os';
import { ImageService } from 'src/app/services/ImageService';
import { SignalRService } from 'src/app/services/SignalRService';
import { MessageRequestModel } from 'src/models/DTO/RequestModels/MessageRequestModel';
import { MessageResponseModel } from 'src/models/DTO/ResponseModels/MessageResponseModel';
import { ChatService } from './chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit  {
  message = new MessageRequestModel();
  messages: MessageResponseModel[] = [];

  currentUserId = localStorage.getItem("userId");

  pageIndex = 0;
  pageSize = 10;

  @ViewChild('messagesBlock') messagesBlock: ElementRef;

  constructor(public signalRService: SignalRService, public chatService: ChatService, 
    public imageService: ImageService){
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
  }

  ngAfterViewInit() { 
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
    this.messagesBlock.nativeElement.addEventListener('scroll', this.onMessagesBlockScroll.bind(this));
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesBlock.nativeElement.scrollTop = this.messagesBlock.nativeElement.scrollHeight;
    }, 100);
  }
  
  onMessagesBlockScroll() {
    const chatBlockEl = this.messagesBlock.nativeElement;
    if (chatBlockEl.scrollTop === 0) {
      this.loadMoreMessages();
    }
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

  loadMessages(): void {
    this.chatService.getChatMessages(this.pageIndex, this.pageSize)
        .subscribe(messages => {
            this.messages = messages;
        });
  }

  loadMoreMessages(): void {
    this.pageIndex++;
    let prevHeight = this.messagesBlock.nativeElement.scrollHeight;
    console.log(prevHeight)
    this.chatService.getChatMessages(this.pageIndex, this.pageSize)
      .subscribe(newMessages => {
        this.messages = [...this.messages, ...newMessages];      
      });
      setTimeout(() => {
        let currentHeight = this.messagesBlock.nativeElement.scrollHeight;
        this.messagesBlock.nativeElement.scrollTop = currentHeight - prevHeight;
      }, 50);
  }
}
