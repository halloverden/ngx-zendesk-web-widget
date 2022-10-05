import { Inject, Injectable } from '@angular/core';
import { NgxZendeskWebWidgetConfig } from './ngx-zendesk-web-widget.config';
import { WindowService } from './window.service';
import { firstValueFrom, of, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NgxZendeskWebWidgetZeInstanceInterface } from './ngx-zendesk-web-widget-ze-instance.interface';

@Injectable({
  providedIn: 'root'
})
export class NgxZendeskWebWidgetService {
  private _initialized = false;
  private _window!: Window;
  private _zE!: NgxZendeskWebWidgetZeInstanceInterface;

  constructor(
    private config: NgxZendeskWebWidgetConfig,
    private windowService: WindowService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this._verifyConfig();

    if (!this.config.lazyLoadZendeskScripts) {
      this.init().then(() => {
        // noop
      });
    }
  }

  public init(): Promise<boolean> {
    if (!this.windowService.get()) {
      // noop
      console.warn(
        'NgxZendeskWebWidgetService.init(): Tried initializing Zendesk Web Widget, but no browser window was found.'
      );
      return firstValueFrom(of(false));
    }

    const w = this.windowService.get();
    this._window = w!;
    let documentDomain = this._document.domain;
    const config = this.config;
    const injectionElement = this.getInjectionElement();
    const iFrameElement = this.buildIframeElement();
    const scriptElement = this.buildScriptElement();

    (w! as any).zEmbed ||
      (function (e?, t?) {
        let args: any[] = [];
        (w! as any).zEmbed = function () {
          args.push(arguments);
        };
        (w! as any).zE = (w! as any).zE || (w! as any).zEmbed;
        (w! as any).zESettings = config.zESettings;

        iFrameElement.addEventListener('load', (ev) => {
          const iframeElementFromEvent = ev.target;
          if (iframeElementFromEvent instanceof HTMLIFrameElement) {
            const iframeDocumentInstance =
              iframeElementFromEvent.contentDocument;
            const iframeWindowInstance = iframeElementFromEvent.contentWindow;

            let i = setInterval(() => {
              if (
                iframeWindowInstance?.document.body &&
                iframeDocumentInstance
              ) {
                clearInterval(i);

                iframeDocumentInstance.domain = documentDomain;
                (iframeDocumentInstance as any).t = new Date();
                (iframeDocumentInstance as any).zendeskHost = config.accountUrl;
                (iframeDocumentInstance as any).zEQueue = args;

                iframeDocumentInstance.body.appendChild(scriptElement);
              }
            });
          }
        });

        setTimeout(() => {
          injectionElement.appendChild(iFrameElement);
        });
      })();

    return this.finishLoading();
  }

  private getInjectionElement(): Element {
    let elements = this._document.getElementsByTagName(
      this.config.injectionTag
    );
    if (elements.length === 0) {
      throw new Error('No element found matching injectionTag from config');
    }

    return elements[0];
  }

  private finishLoading(): Promise<boolean> {
    const o = new Subject<boolean>();

    const timeout = setTimeout(() => {
      this._initialized = false;
      o.next(false);
      o.complete();
    }, this.config.timeout || 30000);

    (this._window as any).zE(() => {
      clearTimeout(timeout);

      this._zE = (this._window as any).zE;
      this._initialized = true;

      this.config.callback(this);

      o.next(true);
      o.complete();
    });

    return firstValueFrom(o);
  }

  private buildIframeElement(): HTMLIFrameElement {
    const iframe = this._document.createElement('iframe');
    iframe.src = 'javascript:false';
    iframe.title = 'Zendesk Web Widget';
    iframe.style.cssText = 'display: none';

    return iframe;
  }

  private buildScriptElement(): HTMLScriptElement {
    const script = this._document.createElement('script');

    script.type = 'text/javascript';
    script.id =
      'be-sure-not-to-set-the-id-to-ze-snippet-as-that-changes-the-behavior-of-the-snippet';
    script.src = 'https://static.zdassets.com/ekr/snippet.js';
    script.async = true;

    return script;
  }

  private _verifyConfig(): void {
    if (!this.config.accountUrl) {
      throw new Error(
        'NgxZendeskWebWidgetService: NgxZendeskWebWidgetConfig is missing accountUrl.'
      );
    }
  }

  get isInitialized(): boolean {
    return this._initialized;
  }

  get zE(): NgxZendeskWebWidgetZeInstanceInterface {
    return this._zE;
  }

  commandWebWidget(command: string, options?: any): void {
    this.zE('webWidget', command, options);
  }

  onWebWidgetEvent(eventName: string, handler: (event?: any) => void) {
    this.zE('webWidget:on', eventName, handler);
  }
}
