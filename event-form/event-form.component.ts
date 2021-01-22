import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event} from '../../models/event.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  currentItemId: number;
  item:Event;
  form: FormGroup;
  key: string;
  successMessage:string;
  constructor(private router: Router,private toastr: ToastrService,
    private eventService:EventService,
    private dialogRef: MatDialogRef<EventFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) { }

    ngOnInit(): void {
      if (!!this.data) {
        this.currentItemId = this.data.eventId;
  
      }
      if (!!this.currentItemId) {
        this.key = "Update Event",
        this.successMessage="Event updated successfully"
        this.eventService.getEventById(this.currentItemId).then(item => {
          this.item = item;
          this.initForm(item);
        });
      } else {
        this.key = "Add Event";
        this.successMessage="Event added successfully"

        this.initForm(null);
      }
    }
    initForm(event: Event): void {
      this.form = new FormGroup({
        title: new FormControl(!!event ? event.title : null, [Validators.required ]),
        date: new FormControl(!!event ? event.date: null,[Validators.required ]),
        location: new FormControl(!!event ? event.location : null, []),
      
      });
    }
    
    onSubmit(): void {
      const objectToSubmit = { ...this.item, ...this.form.value };
      console.log(objectToSubmit);
      this.eventService.saveEvent(objectToSubmit).then(() => {
        this.initForm(null);
        this.dialogRef.close();
        this.toastr.success(this.successMessage);
        this.router.navigate(['./dashboard/events'])
      }
      );


    }

}
