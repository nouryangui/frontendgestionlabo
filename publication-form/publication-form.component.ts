import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {

  currentItemId: number;
  item: Publication;
  form: FormGroup;
  key: string;
  successMessage:string;
  constructor(private router: Router,private toastr: ToastrService,
    private publicationService:PublicationService,
    private dialogRef: MatDialogRef<PublicationFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) { }

    ngOnInit(): void {
      if (!!this.data) {
        this.currentItemId = this.data.publicationId;
  
      }
      if (!!this.currentItemId) {
        this.key = "Update Publication",
        this.successMessage="Publication updated successfully"
        this.publicationService.getPublicationById(this.currentItemId).then(item => {
          this.item = item;
          this.initForm(item);
        });
      } else {
        this.key = "Add Publication";
        this.successMessage="Publication added successfully"

        this.initForm(null);
      }
    }
    initForm(publication: Publication): void {
      this.form = new FormGroup({
        titre: new FormControl(!!publication ? publication.titre: null, [Validators.required ]),
        type: new FormControl(!!publication ? publication.type: null,[Validators.required ]),
        link: new FormControl(!!publication ? publication.link : null, []),
        date: new FormControl(!!publication ? publication.date : null, []),
        sourcePdf: new FormControl(!!publication ? publication.sourcePdf: null, []),
      
      });
    }
    
    onSubmit(): void {
      const objectToSubmit = { ...this.item, ...this.form.value };
      console.log(objectToSubmit);
      this.publicationService.savePublication(objectToSubmit).then(() => {
        this.initForm(null);
        this.dialogRef.close();
        this.toastr.success(this.successMessage);
        this.router.navigate(['./dashboard/publications'])
      }
      );


    }

}
