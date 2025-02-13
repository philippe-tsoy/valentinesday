import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone, OnDestroy, ViewContainerRef } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HangmanLetter } from '../../interfaces/hangman-letter.interface';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';



@Component({
    selector: 'app-hangman-game',
    imports: [NgFor, NgIf, MatInputModule, FormsModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, RouterModule],
    templateUrl: './hangman-game.component.html',
    styleUrl: './hangman-game.component.css',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Default
})
export class HangmanGameComponent implements OnDestroy{
    solvedSentence: string = "will you be my valentine?"
    solvedCharacterMap: Map<string, number[]> = new Map;
    hangmanSentence: (HangmanLetter|null)[] = [];
    errorCounter: number = 0;
    // input: string = '';
    successCounter: number = 0;
    form: FormGroup;
    isValid = true;
    currentHangmanImage: string = '';

    ngOnDestroy(): void {
        console.log('Component destroyed');
        this.viewContainerRef.clear();
    }

    readonly dialog = inject(MatDialog);

    constructor(private fb: FormBuilder, private router: Router, private ngZone: NgZone, private viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef){
        this.form = this.fb.group({
            input : new FormControl()
        })

        for (const [index, letter] of this.solvedSentence.split('').entries()){
            if (letter.match(/[a-z]/i)){
                this.hangmanSentence.push({letter, shown: false})
                this.successCounter++;
            }
            else{
                this.hangmanSentence.push(null)
            }
            if (this.solvedCharacterMap.has(letter))
                this.solvedCharacterMap.get(letter)!.push(index)
            else
                this.solvedCharacterMap.set(letter, [index])
        }

        // this.router.events.subscribe((event) => {
        //     if (event instanceof NavigationEnd) {
        //       this.viewContainerRef.clear(); // Force clear previous views
        //     }
        // });

        // this.router.events.subscribe((event) => {
        //     if (event instanceof NavigationEnd) {
        //         this.cdr.detectChanges();
        //     }
        // });

        this.setCurrentImage()
    }

    onEnter(){
        if (this.singleLetterValidator()){
            this.isValid =true
            const map = this.solvedCharacterMap.get(this.form.value.input)
            if (!map) {
                this.errorCounter++;
                if (this.errorCounter >= 9) {
                    const matDialogConfig: MatDialogConfig = {data: {title: "Oh no!", content: "You didn't find the message ):", action: "Try again!"}}
                    const dialogRef = this.dialog.open(DialogComponent, matDialogConfig);
                    dialogRef.afterClosed().subscribe(() => {
                        window.location.reload();
                    });
                }
                this.setCurrentImage();
            }
            else map.forEach((index: number) => {
                this.hangmanSentence[index]!.shown = true
                this.successCounter--
            })
            this.form.controls['input'].reset();
            if (this.successCounter == 0){
                this.openDialog();
            }
        }
        else if(this.isSolution()){
            this.isValid = true
            this.hangmanSentence.forEach((letter)=>{
                if (letter)
                    letter.shown = true
                })
            this.openDialog();
        }
        else{
            this.isValid = false
            //message Please enter only a single letter or the correct sentence

        }
    }

    openDialog(): void {
        const matDialogConfig: MatDialogConfig = {data: {title: "Hi Shruti!", content: "You found the hidden message!", action: "Oh my! What next?"}}
        const dialogRef = this.dialog.open(DialogComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.navigate();
        });

    }

    navigate(): void{
        this.router.navigate(['/valentine-page'])
    }

    singleLetterValidator() {
        const letterPattern = /^[A-Za-z]$/;
        return letterPattern.test(this.form.value.input) && this.form.value.input.length == 1;
    }

    isSolution(){
        return this.form.value.input?.toLowerCase().replace(/\W/g, '') === this.solvedSentence.replace(/\W/g, '')
    }

    private setCurrentImage(){
        this.currentHangmanImage = `assets/hangman${this.errorCounter}.jpg`
    }
}
