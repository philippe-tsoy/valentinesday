import { Component, Inject, inject, model } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true
})
export class DialogComponent {
    readonly dialogRef = inject(MatDialogRef<DialogComponent>);
    readonly data = inject<String>(MAT_DIALOG_DATA);

    constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any){

    }
    onClick(): void {
        this.dialogRef.close();
    }
}
