import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../../../models/member.model';
import { Publication } from '../../../models/publication.model';
import { PublicationService } from '../../../services/publication.service';
import { MemberService } from '../../../services/member.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-member-publication-form',
  templateUrl: './member-publication-form.component.html',
  styleUrls: ['./member-publication-form.component.css']
})
export class MemberPublicationFormComponent implements OnInit {
  members:Member[];
  publications:Publication[]
  selectedValue:string;
  form:FormGroup;
  member:Member;
  
  constructor(private memberService:MemberService,private publicationService:PublicationService,private dialogRef: MatDialogRef<MemberPublicationFormComponent>,    
    private router: Router,
    ) { }

  
  ngOnInit(): void {
    this.fetchMembers();
    this. fetchPublications()
    this.initForm(null,null);
  
  }
  fetchMembers(): void {
    this.memberService.getAllMembers().then(data => this.members = data);
  }
  fetchPublications(): void {
    this.publicationService.getAllPublication().then(data => this.publications = data);
  }
  initForm(member: Member,publication:Publication): void {
    this.form = new FormGroup({
      member: new FormControl( null, []),
      publication: new FormControl( null, []),
      
    });
  }
  onSubmit(): void {
    const objectToSubmit = this.form.value ;
    console.log("ccc")
    console.log(objectToSubmit);
    this.memberService.affectMemberToPublication( this.form.value.member,this.form.value.publication);
    this.initForm(null,null);
    this.dialogRef.close();
   

  }
 


}
