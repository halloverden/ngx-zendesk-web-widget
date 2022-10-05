import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { NgxZendeskWebWidgetService } from './ngx-zendesk-web-widget.service';
import { NgxZendeskWebWidgetConfig } from './ngx-zendesk-web-widget.config';
import { WindowService } from './window.service';

@NgModule({})
export class NgxZendeskWebWidgetModule {
  static forRoot(
    zendeskConfig: Type<NgxZendeskWebWidgetConfig>
  ): ModuleWithProviders<NgxZendeskWebWidgetModule> {
    return {
      ngModule: NgxZendeskWebWidgetModule,
      providers: [
        { provide: NgxZendeskWebWidgetConfig, useClass: zendeskConfig },
        {
          provide: NgxZendeskWebWidgetService,
          useClass: NgxZendeskWebWidgetService
        },
        { provide: WindowService, useClass: WindowService }
      ]
    };
  }
}
