import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PublicationFormComponent } from '../publication-form/publication-form.component';
import { Publication } from '../../models/publication.model';
import { ConfirmDialogComponent } from '../../@root/confirm-dialog/confirm-dialog.component';
import { PublicationService } from '../../services/publication.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'date', 'type', 'link', 'pdf', 'actions'];
  public publications:Publication[];
  totalPages: number;
  currentPage: number;
  protected _onDestroy = new Subject<void>();


  constructor(private publicationService: PublicationService,
    private dialog: MatDialog, private matDialog: MatDialog,private loginService:LoginService) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

  }
  ngOnInit(): void {
    this.currentPage = 0;
    this.fetchDataSourcePaginator();
  }
  fetchDataSourcePaginator(): void {
    this.publicationService.getPublicationsPaginator(this.currentPage).then(data => {
      this.totalPages = data['totalElements'];
      this.publications = data['content']

    });
  }
  nextPage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.fetchDataSourcePaginator();
  }
 /* public doFilter = (value: string) => {
    this.publications.filter = value.trim().toLocaleLowerCase();
  }*/
  onAdd() {

    const dialogRef = this.matDialog.open(PublicationFormComponent, {
      disableClose: false,
      width:'25%',
    });
    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(result => {

      this.fetchDataSourcePaginator();
    });
  }
  onEdit(publicationId: number) {

    const dialogRef = this.matDialog.open(PublicationFormComponent, {
      disableClose: false,
      width:'25%',

      data: { publicationId: publicationId}
    });
    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(result => this.fetchDataSourcePaginator()
    );

  }
  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.publicationService.removePublicationById(id).then(() => this.fetchDataSourcePaginator());
      }
    });
  }
  isAuthenticated()
  {
   
    return this.loginService.isAuthenticated();
  }
}
