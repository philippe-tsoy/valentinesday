import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-valentine-page',
  imports: [CommonModule, RouterModule, MatButton],
  templateUrl: './valentine-page.component.html',
  styleUrl: './valentine-page.component.css',
  standalone: true
})
export class ValentinePageComponent implements OnInit{
    @ViewChild('noButton', { static: false }) button!: ElementRef;
    @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;

    constructor(private router: Router) {}

    ngOnInit() {}

    onHover(): void {
        if (this.button && this.button.nativeElement) {
            const left = Math.floor(Math.random()*(window.innerWidth - this.button.nativeElement.offsetWidth))
            const top = Math.floor(Math.random()*(window.innerHeight - this.button.nativeElement.offsetHeight))
            this.button.nativeElement.style.left = `${left}px`;
            this.button.nativeElement.style.top = `${top}px`;
        }
    }

    yipee(){
        setTimeout(() => {
            const video = document.getElementById(
              "yipee"
            ) as HTMLVideoElement;
            video.hidden = false;
            video.play();
            video.onended = () => {
                this.router.navigateByUrl('/')
            };
          }, 0);
    }

}
