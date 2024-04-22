import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-calification-list',
  templateUrl: './calification-list.component.html',
  styleUrls: ['./calification-list.component.scss']
})
export class CalificationListComponent {

  listUsers: UserData[] = [];

  promoters: any;
  neutrals: any;
  detractors: any;


  displayedColumns: string[] = ['CC', 'Nombre', 'Email', 'Role', 'Calificacion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
     (res:any[]) => {
        this.listUsers = res.filter(user => user.role !== 2);
        this.dataSource = new MatTableDataSource(this.listUsers)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.promoters = this.listUsers.filter(user => user.calification.score === 9 || user.calification.score === 10);
        this.neutrals = this.listUsers.filter(user => user.calification.score === 7 || user.calification.score === 8);
        this.detractors = this.listUsers.filter(user => user.calification.score <= 6);
  
        const nps = this.calculateNPS(this.promoters.length, this.neutrals.length, this.detractors.length);
  
        console.log('Promotores:', this.promoters.length);
        console.log('Neutros:', this.neutrals.length);
        console.log('Detractores:', this.detractors.length);
        console.log('NPS:', nps);
      }
    )
  }

  calculateNPS(promoters: number, neutrals: number, detractors: number): number {
    const totalResponses = promoters + neutrals + detractors;
    if (totalResponses === 0) return 0;
    return ((promoters - detractors) / totalResponses) * 100;
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    } else {
      console.error('Paginator is still not defined after view init');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
