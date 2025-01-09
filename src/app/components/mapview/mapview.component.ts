import { Component, Inject } from '@angular/core';
  import { FormBuilder } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


  export interface DialogData{

  } 
@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent {
    sourceurl!:any;
    headerTitle:string="Map View"
    constructor(private fb: FormBuilder,
      private snackBar: MatSnackBar,private sanitizer: DomSanitizer,) {
         
      }  

      ngOnInit(){
       // let url='https://analytics.zoho.in/open-view/211650000000662594';
       let url = "https://analytics.zoho.in/open-view/211650000007782129/fb621f50016b4f9917b40dd104f5253a";
        this.sourceurl=this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }

}
  

