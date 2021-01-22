import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ToolService } from '../../../services/tool.service';
import { EventService } from '../../../services/event.service';
import { PublicationService } from '../../../services/publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private memberService: MemberService,private toolService: ToolService,
    private eventService: EventService,private publicationService:PublicationService) {
  }
  countMember:Number;
  countTool:Number;
  countEvent:Number;
  countPublication:Number;


  ngOnInit() {
    
    this.getMemberCount();
    this. getToolCount();
    this. getEventCount();
    this.getPublicationCount();
  }

  getMemberCount() {
    this.memberService.getMemberCount().then(result => this.countMember = result);
  }
  getToolCount() {
    this.toolService.getToolCount().then(result => this.countTool = result);
  }
  getEventCount() {
    this.eventService.getEventCount().then(result => this.countEvent = result);
  }
  getPublicationCount() {
    this.publicationService.getPublicationCount().then(result => this.countPublication = result);
  }
}
