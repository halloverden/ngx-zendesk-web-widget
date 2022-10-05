import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxZendeskWebWidgetModule } from '../../../ngx-zendesk-web-widget/src/lib/ngx-zendesk-web-widget.module';
import { ZendeskConfig } from '../config/zendesk.config';
import { NgxZendeskWebWidgetService } from '../../../ngx-zendesk-web-widget/src/lib/ngx-zendesk-web-widget.service';
import { ngxZendeskWebWidgetFactory } from '../../../ngx-zendesk-web-widget/src/lib/ngx-zendesk-web-widget.factory';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxZendeskWebWidgetModule.forRoot(ZendeskConfig)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ngxZendeskWebWidgetFactory,
      deps: [NgxZendeskWebWidgetService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
