import { Injectable } from "@angular/core";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { LoginComponent } from "./login.component";

@Injectable({
    providedIn: 'root',
})
export class LoginService{
    constructor(public dialog: MatDialog){}
    
    
}

