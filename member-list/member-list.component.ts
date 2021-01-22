import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MemberDetailComponent } from '../member-detail/member-detail.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../@root/confirm-dialog/confirm-dialog.component';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  public members: Member[];
  displayedColumns: string[] = ['id', 'Cin', "Name", 'Date Of Birth', 'Email', 'CV'];
  totalPages: number;
  currentPage: number;
  protected _onDestroy = new Subject<void>();


  constructor(private memberService: MemberService, private matDialog: MatDialog,private loginService:LoginService) { }

  ngOnInit(): void {
    this.currentPage = 0;
    this.fetchDataSourcePaginator();

  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

  }
  fetchDataSourcePaginator(): void {
    this.memberService.getMembersPaginator(this.currentPage).then(data => {
      this.totalPages = data['totalElements'];
      this.members = data['content']

    });
  }
  onAdd() {

    const dialogRef = this.matDialog.open(MemberFormComponent, {
      disableClose: false,
      width:'70%',
    });
    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(result => {

      this.fetchDataSourcePaginator();
    });
  }
  onEdit(memberId: number) {

    const dialogRef = this.matDialog.open(MemberFormComponent, {
     
      disableClose: false,
      width:'70%',

      data: { memberId: memberId }
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
        this.memberService.removeMemberById(id).then(() => this.fetchDataSourcePaginator());
      }
    });
  }
  onDetail(idMember: number): void {
    const dialogRef = this.matDialog.open(MemberDetailComponent, {
      disableClose: false,
      width: '30%',
      data: { memberId: idMember }
    });
    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(result => this.fetchDataSourcePaginator()
    );

  }
  nextPage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.fetchDataSourcePaginator();
  }
  isAuthenticated()
  {
   
    return this.loginService.isAuthenticated();
  }
  isAdmin()
  {
    return this.loginService.isAdmin();
  }
}
