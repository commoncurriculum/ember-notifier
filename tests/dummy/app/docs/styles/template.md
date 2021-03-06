# Styles

This addon supports customizing the notification style through SASS or 
using `ember-notifier` as a block param to apply a framework's 
component class.

## SASS

To customize the notification, set the addon variables before 
importing `ember-notifier.scss`.

{{docs-snippet name='style-sass.scss' title='styles/app.scss' language='css'}}

This approach is powerful enough to build entire themes on top of it. 
The entire list of available variables can be found in 
[ember-notifier.scss](https://github.com/scottwernervt/ember-notifier/blob/master/app/styles/ember-notifier.scss). 

## Frameworks

Applying a framework's theme is accomplished by mapping the addon's 
global config options to the framework's notification classes and using 
`ember-notifier` as a block param.

### Bulma

{{#docs-demo as |demo|}}
  {{demo.snippet 'bulma-config-environment.js' label='environment.js'}}
  {{demo.snippet 'bulma-application.hbs' label='application.hbs'}}
{{/docs-demo}}

Documentation on [Bulma Notifications](https://bulma.io/documentation/elements/notification/).

### Spectre

{{#docs-demo as |demo|}}
  {{demo.snippet 'spectre-config-environment.js' label='environment.js'}}
  {{demo.snippet 'spectre-application.hbs' label='application.hbs'}}
{{/docs-demo}}

Documentation on [Spectre Toasts](https://picturepan2.github.io/spectre/components.html#toasts).

### Bootstrap

{{#docs-demo as |demo|}}
  {{demo.snippet 'bootstrap-config-environment.js' label='environment.js'}}
  {{demo.snippet 'bootstrap-application.hbs' label='application.hbs'}}
{{/docs-demo}}

Documentation on [Bootstrap Alerts](https://getbootstrap.com/docs/4.1/components/alerts/).

### Zurb Foundation 

{{#docs-demo as |demo|}}
  {{demo.snippet 'zurb-config-environment.js' label='environment.js'}}
  {{demo.snippet 'zurb-application.hbs' label='application.hbs'}}
{{/docs-demo}}

Documentation on [Zurb Foundation Callouts](https://foundation.zurb.com/sites/docs/callout.html).

### Other

Do not see your framework? Make a request [here](https://github.com/scottwernervt/ember-notifier/issues).
