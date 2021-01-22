import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ToolService } from '../../services/tool.service';
import { Tool } from '../../models/tool.model';
import { ToolFormComponent } from '../tool-form/tool-form.component';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../@root/confirm-dialog/confirm-dialog.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.css']
})
export class ToolListComponent implements OnInit {

  constructor(private toolService: ToolService,
    private loginService:LoginService, private matDialog: MatDialog) { }
  displayedColumns: string[] = ['id', 'date', 'source', "actions"];
  public tools: Tool[];
  totalPages: number;
  currentPage: number;
  protected _onDestroy = new Subject<void>();
  ngOnInit(): void {

    this.currentPage = 0;
    this.fetchDataSourcePaginator();
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

  }

  fetchDataSourcePaginator(): void {
    this.toolService.getToolPaginator(this.currentPage).then(data => {
      this.totalPages = data['totalElements'];
      this.tools = data['content']

    });
  }
  nextPage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.fetchDataSourcePaginator();
  }
  onAdd()
  {     
    const dialogRef = this.matDialog.open(ToolFormComponent, {
      disableClose: false,
      width:'25%'

    });
    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(result => {
      this.fetchDataSourcePaginator();

    });
  }
  onEdit(toolId: number) {

    const dialogRef = this.matDialog.open(ToolFormComponent, {
      disableClose: false,
      width:'25%',

      data: { toolId: toolId }
    });
    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(result => this.fetchDataSourcePaginator()

    );

  }
  onRemoveAccount(id: any): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.toolService.removeToolById(id).then(() => this.fetchDataSourcePaginator());
      }
    });
  }
  isAuthenticated() {

    return this.loginService.isAuthenticated();
  }
}
