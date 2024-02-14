import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

interface MedicalProfileData {
  label: string;
  key: string;
  protect: boolean;
}
@Component({
  selector: 'app-view-medical',
  templateUrl: './view-medical.component.html',
  styleUrls: ['./view-medical.component.scss'],
})
export class ViewMedicalComponent {
  public medicalData!: MedicalTeamModel;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  public columns: Boolean = true;
  public defaultTabIndex!: number;
  public appConstants = AppConstants;
  public protectedView: boolean = false;

  public displayedColumns: string[] = [
    'id',
    'User name',
    'Type',
    // 'Time Zone',
    'Branch',
    'Action',
  ];
  public medicalProfile: MedicalProfileData[] = [
    {
      label: 'Name',
      key: 'full_name',
      protect: true,
    },
    {
      label: 'Email',
      key: 'email',
      protect: true,
    },
    {
      label: 'Phone No',
      key: 'phone_no',
      protect: true,
    },
    {
      label: 'Describe',
      key: 'discibe',
      protect: false,
    },
    {
      label: 'Profession',
      key: 'profession_name',
      protect: false,
    },
    {
      label: 'Languages',
      key: 'language_names',
      protect: false,
    },
    {
      label: 'Ethnicity',
      key: 'ethnicity_name',
      protect: false,
    },
    {
      label: 'Service Area',
      key: 'service_area_names',
      protect: false,
    },
    {
      label: 'County',
      key: 'country_names',
      protect: false,
    },
  ];

  public medicalDocuments: any = [
    {
      label: 'Resume',
      key: 'resume',
    },
    {
      label: 'Licence',
      key: 'licence',
    },
  ];

  constructor(
    private responsiveObserver: ResponsiveService,
    private _apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private _authService: AuthService,
    public dialog: MatDialog
  ) {
    this.responsiveObserver.observeResolution().subscribe((columns) => {
      this.columns = columns;
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    console.log('first refreshed');
  }

  ngAfterViewInit() {}

  ngOnInit() {
    let medicalId = history.state.medicalId;
    if (medicalId) this.fetchMedicalTeamData(medicalId);
    if (!medicalId) this.router.navigate(['team-board']);

    let userData = this._authService.getUserData();
    if (userData) {
      this.protectedView = userData.subscription_status === '1';
    }
  }

  private fetchMedicalTeamData(pid: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('prof_id', pid);
    this._apiService.post(APIConstant.GET_MEDICALTEAM_BY_ID, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          console.log(res.message);
          this.medicalData = res.data;
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  public isPageRefresh(): boolean {
    return (
      window.performance &&
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD
    );
  }

  public getMapUrl(address: string | undefined) {
    const url = `https://www.google.com/maps/embed/v1/place?q=${address}&key=${this.apiKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public navigateBack() {
    this.router.navigate(['team-board']);
  }

  public getValue(data: MedicalProfileData): string {
    if (this.medicalData[data.key]) {
      if (data.protect) {
        return this.protectContent(this.medicalData[data.key]);
      }
      return this.medicalData[data.key];
    }
    return '';
  }
  private protectContent(content: string): string {
    let modifiedString = content.slice(0, 4);
    for (let i = 4; i < content.length; i++) {
      modifiedString += '*';
    }
    return modifiedString;
  }
  public getName(): string {
    return this.medicalData['full_name'];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      data: { name: 'Deepak', animal: 'Asd' },
      width: '600px', // Set width to 600 pixels
      height: '400px', // Set height to 400 pixels
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
