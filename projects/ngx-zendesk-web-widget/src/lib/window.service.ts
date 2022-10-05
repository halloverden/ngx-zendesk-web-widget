import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor(@Inject(PLATFORM_ID) private platform: any) {}

  get(): Window | null {
    if (isPlatformBrowser(this.platform)) {
      return window;
    }
    return null;
  }
}
