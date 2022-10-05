import { NgxZendeskWebWidgetZeSettingsInterface } from './ngx-zendesk-web-widget-ze-settings.interface';
import { NgxZendeskWebWidgetService } from './ngx-zendesk-web-widget.service';

export abstract class NgxZendeskWebWidgetConfig {
  abstract accountUrl: string;
  abstract callback(
    ngxZendeskWebWidgetService: NgxZendeskWebWidgetService
  ): any;
  abstract injectionTag: keyof HTMLElementTagNameMap | string;
  abstract lazyLoadZendeskScripts: boolean;
  abstract timeout: number;
  abstract zESettings?: NgxZendeskWebWidgetZeSettingsInterface;
}
