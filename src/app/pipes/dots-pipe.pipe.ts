import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotsPipe',
  pure: false // Mark the pipe as impure to allow dynamic updates
})
export class DotsPipe implements PipeTransform {
  private currentStep = 0; // Tracks the current number of dots (0, 1, 2, 3)
  private intervalId: any;
  private valueWithDots = ''; // Cached value to avoid unnecessary computations

  transform(value: string): string {
    // If the interval hasn't been started, initialize it
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.currentStep = (this.currentStep % 3) + 1; // Cycle through 1, 2, 3
        this.valueWithDots = `${value}${'.'.repeat(this.currentStep)}`;
      }, 500); // Adjust interval as needed
    }

    return this.valueWithDots || value; // Return the cached value with dots
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Cleanup when the pipe is destroyed
    }
  }
}