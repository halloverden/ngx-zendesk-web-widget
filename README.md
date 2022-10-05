# NgxZendeskWebWidget

Angular wrapper for the Zendesk Web Widget v1 (classic).
Inspired by [AlisonVilela/ngx-zendesk-webwidget](https://github.com/AlisonVilela/ngx-zendesk-webwidget), a library that seems to not be maintained anymore.

## Install

```bash
npm install ngx-zendesk-web-widget --save
```

## Usage

### Config and Init

To configure the library, you should extend the provided config class `NgxZendeskWebWidgetConfig`, and then import the library module's `forRoot` method, passing your config, like so:

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxZendeskWebWidgetModule.forRoot(ZendeskConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

#### Synchronous Init

The package comes with a factory function that you can use if you want to initialize the Web Widget when your own application initializes. To do so, add the following provider to your `AppModule`.

```typescript
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
```

#### Asynchronous Init

If you want to lazy load the Web Widget, for example when waiting for cookie consent, you can create your own service and inject the `NgxZendeskWebWidgetService` to it. Then, when you're ready, simply run the `init` method of the `NgxZendeskWebWidgetService`.

```typescript
@Injectable({
  providedIn: 'root'
})
export class MySuperService {
  constructor(private ngxZendeskWebWidgetService: NgxZendeskWebWidgetService) {}

  methodThatRunsWhenReady() {
    this.ngxZendeskWebWidgetService.init();
  }
}
```

## API

### Config

#### accountUrl: string

The url for your Zendesk account. Usually `<your-sub-domain>.zendesk.com`.

#### callback(ngxZendeskWebWidgetService: NgxZendeskWebWidgetService): any

This callback method runs after init.

#### injectionTag: keyof HTMLElementTagNameMap | string

The name of the tag that you want to inject the iframe element into (the one that loads the initial JavaScript snippet from Zendesk).

#### lazyLoadZendeskScripts: boolean

Whether to lazy load the widget.

#### timeout: number

How long (in milliseconds) to wait for external scripts to load.

#### zESettings?: NgxZendeskWebWidgetZeSettingsInterface

An object representing the settings that can be used to configure to the widget itself.

### Factory

Use this when you want to [initialize the widget synchronously](#synchronous-init).

### Service

The `NgxZendeskWebWidgetService` has a couple of utility methods worth knowing about.

### init()

Used to initialize the Web Widget. Returns `Promise<boolean>`. Resolves to `true` when initialization has completed.

### isInitialized()

Indicates whether the widget is initialized.

### zE()

Returns the zE instance.

### commandWebWidget(command: string, options?: any)

Helper method for running commands.

### onWebWidgetEvent(eventName: string, handler: (event?: any) => void)

Helper method for subscribing to events.

### Interfaces

There are two interfaces in the package. They represent the zE instance and the settings that can be set in the config class. Please refer to the [Web Widget API Reference](https://developer.zendesk.com/api-reference/widget/introduction/) for more information. Also, should you find any errors, please [open an issue](https://github.com/halloverden/ngx-zendesk-web-widget/issues/new).

## Issues

Report issues [here](https://github.com/halloverden/ngx-zendesk-web-widget/issues)

## License

MIT © [Hallo Verden](https://github.com/halloverden)

## Changelog

Changelog can be found [here](CHANGELOG.md)

# Contribute

PRs are welcome.

## Development server

You can run this project locally, but it also comes with a Docker image to avoid any 'works on my machine' situations.

### Using Docker

Navigate to the docker folder, and copy the `.env.example` file to `.env`. Tweak any of the variables to your needs (see the `docker-compose.yaml` file for how they're used). Run `docker-compose build`, then `docker-compose up -d`. Enter the container with `docker-compose exec angular /bin/bash`. You're now at the root of the project inside the container. Follow the [Running locally](#running-locally) section from here, but use the port you set in the `.env` file.

### Running locally

Run `ng serve` to serve the `sample-test-app` project. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Config

Update the `zendesk.config.ts` file in the `sample-test-app` project with settings relevant to you.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
