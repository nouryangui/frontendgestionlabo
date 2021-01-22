import { Component, OnInit,Inject } from '@angular/core';
import { MemberEventService } from '../../../services/MemberEvent.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MemberEvent } from '../../../models/memberevent.model';
import { Member } from '../../../models/member.model';
import { Event } from '../../../models/event.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-event-form',
  templateUrl: './member-event-form.component.html',
  styleUrls: ['./member-event-form.component.css']
})
export class MemberEventFormComponent implements OnInit {
  form: FormGroup;
  members: Member[];
  events: Event[];
  key:string;
  currentEventId:number;
  currentMemberId:number;

  constructor(private memberEventService: MemberEventService,private dialogRef: MatDialogRef<MemberEventFormComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,   ) { }

  ngOnInit(): void {
    if (!!this.data) {
      this.currentEventId = this.data.eventId;
      this.currentMemberId=this.data.memberId;
      console.log(this.currentMemberId);

    }
    //this.initForm(null);

  }
  /*initForm(memberEvent: MemberEvent): void {
    this.getMemberEvent();
    this.key="Add New  Subscription"
    this.form = new FormGroup({
    //  member: new FormControl(null),
   //  event: new FormControl(null, []),

    });
  }*/

  getMemberEvent() {
    this.memberEventService.getAllMembers().then(data => this.members = data);
    this.memberEventService.getAllEvents().then(data => this.events = data);
  }
  onSubmit(): void {
    const objectToSubmit = this.form.value ;
    console.log(objectToSubmit);
    this.memberEventService.affectMemberToEvent( this.currentMemberId,this.currentEventId);
    //this.initForm(null);
    this.dialogRef.close();
   

  }
 
}
