import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  private track: HTMLElement | null = null;
  selectedLink: string = '';

  ngOnInit(): void {
    this.track = document.getElementById('image-track');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.handleOnDown(event);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.handleOnDown(event.touches[0]);
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.handleOnUp();
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    this.handleOnUp();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.handleOnMove(event);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    this.handleOnMove(event.touches[0]);
  }

  handleOnDown(event: MouseEvent | Touch): void {
    if (this.track) {
      this.track.dataset['mouseDownAt'] = event.clientX.toString();
    }
  }

  handleOnUp(): void {
    if (this.track) {
      this.track.dataset['mouseDownAt'] = "0";
      this.track.dataset['prevPercentage'] = this.track.dataset['percentage'] || "0";
    }
  }

  handleOnMove(event: MouseEvent | Touch): void {
    if (!this.track || this.track.dataset['mouseDownAt'] === "0") return;

    const mouseDelta = parseFloat(this.track.dataset['mouseDownAt'] || "0") - event.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(this.track.dataset['prevPercentage'] || "0") + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    this.track.dataset['percentage'] = nextPercentage.toString();

    this.track.animate({
      transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    Array.from(this.track.getElementsByClassName('image') as HTMLCollectionOf<HTMLElement>).forEach(image => {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    });
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }
}
