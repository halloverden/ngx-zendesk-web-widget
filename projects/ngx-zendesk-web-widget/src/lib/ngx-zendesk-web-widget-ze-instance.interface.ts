export interface NgxZendeskWebWidgetZeInstanceInterface {
  (component: string | Function, command: string, options?: any): void;
  activate: (options?: { hideOnClose: boolean }) => void;
  activateIpm: Function;
  configureIPMWidget: Function;
  hide: () => void;
  hideIPMWidget: Function;
  identify: (identity: {
    name?: string;
    email?: string;
    organization?: string;
  }) => void;
  logout: Function;
  setHelpCenterSuggestions: (options?: {
    labels: string[];
    search: string;
    url: boolean;
  }) => void;
  setLocale: (locale: string) => void;
  show: () => void;
  showIPMArticle: Function;
  showIPMWidget: Function;
  version: string;
  widget: string;
}
