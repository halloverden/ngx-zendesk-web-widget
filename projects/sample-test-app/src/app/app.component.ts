import { Component, OnInit } from '@angular/core';
import { NgxZendeskWebWidgetService } from '../../../ngx-zendesk-web-widget/src/lib/ngx-zendesk-web-widget.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sample-test-app';

  constructor(private ngxZendeskWebWidgetService: NgxZendeskWebWidgetService) {}

  ngOnInit(): void {
    this.ngxZendeskWebWidgetService.onWebWidgetEvent('close', () => {
      console.log('doot from ', this.title);
    });
  }
}
