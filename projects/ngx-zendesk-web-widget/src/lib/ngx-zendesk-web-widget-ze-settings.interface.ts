export interface NgxZendeskWebWidgetZeSettingsInterface {
  [key: string]: any;

  analytics?: boolean;
  cookies?: boolean;
  errorReporting?: boolean;
  webWidget?: {
    answerBot?: {
      avatar?: {
        url?: string;
        name?: { [key: string]: string };
      };
      contactOnlyAfterQuery?: boolean;
      search?: {
        labels: string[];
      };
      suppress?: boolean;
      title?: { [key: string]: string };
    };
    authenticate?: {
      chat?: {
        jwtFn?: (callback: Function) => void;
      };
      jwtFn?: (callback: Function) => void;
    };
    chat?: {
      concierge?: {
        avatarPath?: string;
        name?: string;
        title?: { [key: string]: string };
      };
      connectOnPageLoad?: boolean;
      departments?: {
        enabled?: string[];
        select?: string;
      };
      hideWhenOffline?: boolean;
      menuOptions?: {
        emailTranscript?: boolean;
      };
      notifications?: {
        mobile?: {
          disable?: boolean;
        };
      };
      offlineForm?: {
        greeting?: { [key: string]: string };
      };
      prechatForm?: {
        departmentLabel?: { [key: string]: string };
        greeting?: { [key: string]: string };
      };
      profileCard?: {
        avatar?: boolean;
        rating?: boolean;
        title?: boolean;
      };
      suppress?: boolean;
      title?: { [key: string]: string };
    };
    color?: {
      articleLinks?: string;
      button?: string;
      launcher?: string;
      launcherText?: string;
      header?: string;
      resultLists?: string;
      theme?: string;
    };
    contactForm?: {
      attachments?: boolean;
      fields?: {
        id: string | number;
        prefill: { [key: string]: string };
      }[];
      selectTicketForm?: { [key: string]: string };
      subject?: boolean;
      suppress?: boolean;
      ticketForms?: {
        id: number;
        fields?: {
          id: string | number;
          hideHint?: boolean;
          hint?: { [key: string]: string };
          prefill?: { [key: string]: string };
        }[];
        subject?: boolean;
        title?: boolean;
      }[];
      title?: { [key: string]: string };
    };
    contactOptions?: {
      enabled?: boolean;
      chatLabelOnline?: { [key: string]: string };
      chatLabelOffline?: { [key: string]: string };
      contactButton?: { [key: string]: string };
    };
    helpCenter?: {
      chatButton?: { [key: string]: string };
      filter?: {
        category?: string;
        label_names?: string;
        section?: string;
      };
      messageButton?: { [key: string]: string };
      originalArticleButton?: boolean;
      searchPlaceholder?: { [key: string]: string };
      suppress?: boolean;
      title?: { [key: string]: string };
    };
    launcher?: {
      badge?: {
        image: string;
        label?: { [key: string]: string };
        layout:
          | 'image_left'
          | 'image_right'
          | 'image_only'
          | 'text_only'
          | string;
      };
      chatLabel?: { [key: string]: string };
      label: { [key: string]: string };
      mobile?: {
        labelVisible?: boolean;
      };
      talkLabel?: { [key: string]: string };
    };
    navigation?: {
      popoutButton?: {
        enabled?: boolean;
      };
    };
    offset?: {
      horizontal?: string;
      vertical?: string;
      mobile: {
        horizontal?: string;
        vertical?: string;
      };
    };
    position?: {
      horizontal?: 'left' | string;
      vertical?: 'top' | string;
    };
    talk?: {
      nickname?: string;
      suppress?: boolean;
      title?: { [key: string]: string };
    };
    zIndex?: number;
  };
}
