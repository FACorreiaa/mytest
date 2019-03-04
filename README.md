# Horeca claming service App FE
This app was implemented to allow user that have an establishment in german territory can claim his information
in the various entities available, like for example: google my business, facebook, etc..

## Build
- `npm run build` to build a development version of the app.
- `npm run prod` to build a production optimized version of the app.

### During Development
- Run `npm run start` for a developmenet server. Navigate to `http://localhost:5500/`. The app will automatically reload if you change any of the source files.
- Run `npm run extract` and `npm run extractChilds` to update resources to send in to transifex
- Run `tx push -s` to send the new resources to transifex.
- Run `tx pull -a` to receive new updates on the translation in transifex.

### Further help with Angular CLI
> This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).