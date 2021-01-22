import { Component, OnInit, Inject } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { Member } from '../../models/member.model';
import { MemberService } from '../../services/member.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tool } from '../../models/tool.model';
import { Event } from '../../models/event.model';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  publications: Publication[];
  events:Event[];
  tools:Tool[];
  member: Member;
  currentItemId: number;
  constructor(private memberService: MemberService, private dialogRef: MatDialogRef<MemberDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit(): void {
    const activeTabs = document.getElementsByClassName('default-active');
    for (let i = 0; i < activeTabs.length; i++) {
      (<HTMLElement>activeTabs[i]).click();
    }
    if (!!this.data) {
      this.currentItemId = this.data.memberId;

    }
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.member = item;
      });
    }
    this.showMemberDetail();

  }

  showMemberDetail() {
    this.memberService.getPublicationMember(this.currentItemId).then(data => this.publications = data)
    this.memberService.getEventMember(this.currentItemId).then(data => this.events = data);
    this.memberService.getToolMember(this.currentItemId).then(data=>this.tools=data);


  }

  tabClick(evt, id) {
    const tabcontents = document.querySelectorAll('.h-tab .tab-content');
    for (let i = 0; i < tabcontents.length; i++) {
      (<HTMLElement>tabcontents[i]).style.display = 'none';
    }
    const tablinks = document.querySelectorAll('.h-tab .tab-link');
    for (let i = 0; i < tablinks.length; i++) {
      const tablink = <HTMLElement>tablinks[i];
      tablink.className = tablink.className.replace(' active', '');
    }
    document.getElementById(id).style.display = 'block';
    evt.currentTarget.className += ' active';
  }
  vTabClick(evt, id) {
    const tabcontents = document.querySelectorAll('.v-tab .tab-content');
    for (let i = 0; i < tabcontents.length; i++) {
      (<HTMLElement>tabcontents[i]).style.display = 'none';
    }
    const tablinks = document.querySelectorAll('.v-tab .tab-link');
    for (let i = 0; i < tablinks.length; i++) {
      const tablink = <HTMLElement>tablinks[i];
      tablink.className = tablink.className.replace(' active', '');
    }
    document.getElementById(id).style.display = 'block';
    evt.currentTarget.className += ' active';
  }
}