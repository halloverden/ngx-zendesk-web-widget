import { NgxZendeskWebWidgetConfig } from '../../../ngx-zendesk-web-widget/src/lib/ngx-zendesk-web-widget.config';
import { NgxZendeskWebWidgetService } from '../../../ngx-zendesk-web-widget/src/lib/ngx-zendesk-web-widget.service';

export class ZendeskConfig extends NgxZendeskWebWidgetConfig {
  override accountUrl = 'fagforbundet.zendesk.com';
  override callback(
    ngxZendeskWebWidgetService: NgxZendeskWebWidgetService
  ): any {
    ngxZendeskWebWidgetService.zE.setLocale('no');
    ngxZendeskWebWidgetService.commandWebWidget('helpCenter:setSuggestions', {
      search: 'halp'
    });
  }
  override lazyLoadZendeskScripts = true;
  override timeout = 30000;
  override injectionTag = 'head';

  override zESettings = {
    webWidget: {
      helpCenter: {
        messageButton: { '*': 'Hit me baby one more time!' },
        title: { '*': 'Got Help?' }
      }
    }
  };
}
