import { NgxZendeskWebWidgetService } from './ngx-zendesk-web-widget.service';

export function ngxZendeskWebWidgetFactory(
  ngxZendeskWebWidgetService: NgxZendeskWebWidgetService
): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return ngxZendeskWebWidgetService.init();
  };
}
