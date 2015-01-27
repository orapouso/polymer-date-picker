polymer-date-picker
===================

A Polymer interpretation of Dan Grossman's awesome [bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker)

### Screenshot with range
![alt-text](https://raw.githubusercontent.com/christopheclc/polymer-date-picker/master/docs/images/datepicker-with-range.png "Example of polymer-date-picker with range")

### Screenshot without range
![alt-text](https://raw.githubusercontent.com/christopheclc/polymer-date-picker/master/docs/images/datepicker-without-range.png "Example of polymer-date-picker without range")

### Installation
1. Add the library to your project using the [Bower](http://bower.io/) package manager:

    ```bower install polymer-date-picker --save```

2. Import Polymer's core polyfill library:

    ```html
    <script type="text/javascript" src="../platform/platform.js"></script>
    ```

3. Import the polymer-date-picker custom element:

    ```html
    <link rel="import" href="../polymer-date-picker/polymer-date-picker.html">
    ```

*Note*: The above paths assume you are utilizing the date picker in a sibling element.  You may need to update the path to be relative to bower_components.

## Usage
### Simple Date Picker
```html
<input id="trigger" value="{{selectedDate}}" 
  on-click="{{$.datePicker.toggle}}" 
  readonly class="date"/>
<polymer-date-picker 
  id="datePicker"
  selectedDate="{{selectedDate}}" 
  relatedTarget="{{$.trigger}}" 
  opened="false"/>
```

This example will create a basic date picker with the value of `selectedDate` bound to an input field.  The input field will toggle the date picker open and closed when clicked and will reflect the currently selected date in a readonly format.  The date picker will be positioned relative to the input field via the `relatedTarget` attribute.

### Range
```html
<input id="triggerRange" 
  value="{{startDate}} to {{endDate}}" 
  on-click="{{$.datePicker.toggle}}" readonly/>
<polymer-date-picker 
  id="datePicker" 
  range 
  startDate="{{startDate}}" 
  endDate="{{endDate}}" 
  relatedTarget="{{$.triggerRange}}" 
  opened="true"
  halign="right" />
```

This example will create a range date picker that is opened by default.  The `startDate` and `endDate` values are bound to an input field which will also toggle the date picker on click.  The date picker will be positioned relative to the bottom right of the input field based on the `relatedTarget` and `halign` attributes.

### showRanges attribute
```html
<input id="triggerRange" 
  value="{{startDate}} to {{endDate}}" 
  on-click="{{$.datePicker.toggle}}" readonly/>
<polymer-date-picker 
  id="datePicker" 
  range 
  showRanges
  relatedTarget="{{$.triggerRange}}" 
  halign="right" />
```

This example will create a list of pre configured ranges for user selection. There are 7 default ranges that can be changed later.

### Configuring Ranges
You can configure the ranges selection in three ways. All of them must be done with javascript using the date picker id value. This is really useful for i18n support so that everyone can edit a range label.

```javascript
ready: function () {
  //simple updates to default ranges
  delete this.$.datePicker.ranges.custom;

  //translating range label
  this.$.datePicker.ranges.today.label = 'Hoje';
  this.$.datePicker.ranges.fiveMonthsAgo = {
    label: '5 Months Ago',
    type: 'months',
    subtractStart: 5,
    subtractEnd: 5
  };

  //complete new ranges (must call updateRanges after)
  this.$.datePicker.ranges = {
    last4Days: {
      label: 'Last 4 Days',
      subtractStart: 4
    }
  };
  this.$.datePicker.updateRanges();

  //using array to preserve order (must call updateRanges after)
  this.$.datePicker.ranges = [{
    id: 'custom', //optional id property. mandatory for custom element
    label: 'This will always come first'
  }, {
    label: 'This will come second',
    subtractStart: 4
  }];
  this.$.datePicker.updateRanges();
}
```


### Theme
The date picker can be themed by importing or including a core-style element in your application with an id of "polymer-date-picker".  Your core-style element should include a style block with any applicable CSS you would like applied to the date picker.

### Options
* `range`: (boolean) Render a date picker with the option of choosing a range of dates.
* `showRanges`: (presence) Render a range list for user selection. Must be used with `range` above
* `startDate`: (string) The selected start date if the `range` option is enabled.
* `endDate`: (string) The selected end date if the `range` option is enabled.
* `selectedDate`: (string) The selected date if the `range` option is *not* enabled.
* `opened`: (boolean) Whether the date picker elements are currently showing.  Elements are by default rendered in an overlay that is controlled by this option.
* `halign`: (string|left,middle,right) The positioning of the date picker elements relative to your target element.  All vertical positioning will be at the bottom of the target.
* `relatedTarget`: (object) A Polymer selector identifying the element that will be used to control the date picker overlay.

### Methods
* `$.datePicker.open`: Set the date picker `opened` attribute to true.
* `$.datePicker.close`: Set the date picker `opened` attribute to false.
* `$.datePicker.toggle`: Toggle the date picker `opened` attribute.
* `$.datePicker.updateRanges`: Updates internal range array. Used when replacing entire range object

## Contributors
- Christophe Clapp
- Christopher Hartmann
- Rafael Raposo
