import { Component } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ChatMessage } from '../../models/chat-message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-chat',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink],
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.css'
})
export class NewChatComponent {
  vetName: string = '';
  name : string ='';
  messageInput: string = '';
  userId: string = '';
  messageList: any[] = [];
  currentTime: string = '';
 
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    console.log(this.messageList);
  }
 
  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.chatService.joinRoom('petzy');
    this.lisenerMessage();
   
    this.route.queryParams.subscribe((params) => {
      this.vetName = params['name'];
      console.log(this.vetName);
 
      console.log('vet Working');
    });
 
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
      console.log(this.name);
 
      console.log('pet working');
    });
  }
  getCurrentTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId,
      currenthour: this.getCurrentTime(),
    } as unknown as ChatMessage;
    this.chatService.sendMessage('petzy', chatMessage);
    this.messageInput = '';
  }
 
  lisenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver',
      }));
    });
  }
 
  updatedDate: any;
  updateDate() {
    var today = new Date();
    this.http
      .put(`http://localhost:8002/updateEndChatSessionTime`, today.getTime)
      .subscribe((response: any) => {
        this.updatedDate = response;
        console.log(this.updatedDate);
      });
  }
}
