import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Tool } from '../../models/tool.model';
import { ToolService } from '../../services/tool.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.css']
})
export class ToolFormComponent implements OnInit {
  currentItemId: number;
  item: Tool;
  form: FormGroup;
  key: string;
  successMessage:string;
  constructor(private router: Router,private toastr: ToastrService,
    private toolService: ToolService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ToolFormComponent>) { }

  ngOnInit(): void {
    if (!!this.data) {
      this.currentItemId = this.data.toolId;

    }
    if (!!this.currentItemId) {
      this.key = "Update  tool"
      this.toolService.getToolById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
        this.successMessage="Tool updated successfully"
      });
    } else {
      this.key = "Add tool";
      this.successMessage="Tool added successfully"

      this.initForm(null);
    }
  }
  initForm(tool: Tool): void {
    this.form = new FormGroup({
      source: new FormControl(!!tool ? tool.source : null, []),
     date: new FormControl(!!tool ? tool.date : null, []),
     
    
    });
  }

  onSubmit(): void {
    const objectToSubmit = { ...this.item, ...this.form.value };
    console.log(objectToSubmit);
    this.toolService.saveTool(objectToSubmit).then(() => {
      this.initForm(null);
      this.dialogRef.close();
      this.toastr.success(this.successMessage);

      this.router.navigate(['./dashboard/tools'])
    }
    );
  }
}
