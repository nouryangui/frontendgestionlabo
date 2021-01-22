import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberPublicationFormComponent } from '../member-publication-form/member-publication-form.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Publication } from '../../../models/publication.model';
import { MemberPublicationService } from '../../../services/member-publication.service';
import { PublicationService } from '../../../services/publication.service';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.css']
})
export class PubComponent implements OnInit {
  protected _onDestroy = new Subject<void>();
 publications: Publication[];
  user: User;
  displayedColumns = ['Member', 'Event Name'];
  username: string = "";
  currentEventId: number;
  currentMemberId: number;

  constructor( private memberPublicationService: MemberPublicationService, private publicationService:PublicationService, private loginService: LoginService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.isAuthenticated()

    this.fetchEvents()
    this.fetchMemberByName();

  }
  onAdd(id: number) {
   
    this.currentEventId = id;
    this.memberPublicationService.affectMemberToEvent(this.currentMemberId, this.currentEventId);
    this.toastr.success("subscription to event added successfully");

    //this.initForm(null);
    // this.dialogRef.close();



  }
  fetchEvents() {
    this.publicationService.getAllPublication().then(data => {
      this.publications = data
    })
  }
  fetchMemberByName() {
    this.loginService.getMemberByName(this.username).then(data => {
      console.log("data" + data.username);
      this.user = data;
this.currentMemberId=data.id;

      ;
    })
  }
  isAuthenticated() {
    this.username = this.loginService.getUserName();
  }
}
