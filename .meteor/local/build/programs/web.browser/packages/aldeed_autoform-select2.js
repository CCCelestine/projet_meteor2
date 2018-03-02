//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Template = Package['templating-runtime'].Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var AutoForm = Package['aldeed:autoform'].AutoForm;
var HTML = Package.htmljs.HTML;
var Spacebars = Package.spacebars.Spacebars;

(function(){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/aldeed_autoform-select2/template.autoform-select2.js                   //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //

Template.__checkName("afSelect2");
Template["afSelect2"] = new Template("Template.afSelect2", (function() {
  var view = this;
  return HTML.SELECT(HTML.Attrs(function() {
    return Spacebars.attrMustache(view.lookup("atts"));
  }), "\n    ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "optgroup"));
    }, function() {
      return [ "\n        ", HTML.OPTGROUP({
        label: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "optgroup"));
        }
      }, "\n        ", Blaze.Each(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));
      }, function() {
        return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {
          return Spacebars.attrMustache(view.lookup("afSelectOptionAtts"));
        }), Blaze.View("lookup:..label", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));
        })), "\n        " ];
      }), "\n        "), "\n      " ];
    }, function() {
      return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {
        return Spacebars.attrMustache(view.lookup("afSelectOptionAtts"));
      }), Blaze.View("lookup:..label", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));
      })), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/aldeed_autoform-select2/autoform-select2.js                            //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
/* global AutoForm, _, $, Template */

AutoForm.addInputType('select2', {
  template: 'afSelect2',
  valueConverters: {
    stringArray: function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          return $.trim(item);
        });
      }
      return val;
    },
    number: AutoForm.Utility.stringToNumber,
    numberArray: function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToNumber(item);
        });
      }
      return val;
    },
    boolean: AutoForm.Utility.stringToBool,
    booleanArray: function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToBool(item);
        });
      }
      return val;
    },
    date: AutoForm.Utility.stringToDate,
    dateArray: function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToDate(item);
        });
      }
      return val;
    }
  },
  contextAdjust: function (context) {
    var itemAtts = _.omit(context.atts, 'firstOption');

    // NOTE: We don't add firstOption to select2 input because
    // it doesn't make sense with the way select2 works.

    // build items list
    context.items = [];

    // When single-select and placeholder is passed,
    // the first option should be an empty option.
    var multiple = itemAtts.multiple;
    var select2Options = itemAtts.select2Options || {};

    if (!multiple && select2Options.placeholder) {
      context.items.push('');
    }

    // Check if option is selected
    var isSelected = function(conVal, optVal) {
      return _.isArray(conVal) ? _.contains(conVal, optVal) : optVal === conVal;
    };

    // Add all defined options
    _.each(context.selectOptions, function(opt) {
      if (opt.optgroup) {
        var subItems = _.map(opt.options, function(subOpt) {
          return {
            name: context.name,
            label: subOpt.label,
            value: subOpt.value,
            // _id must be included because it is a special property that
            // #each uses to track unique list items when adding and removing them
            // See https://github.com/meteor/meteor/issues/2174
            _id: subOpt.value,
            selected: isSelected(context.value, subOpt.value),
            atts: itemAtts
          };
        });
        context.items.push({
          optgroup: opt.optgroup,
          items: subItems
        });
      } else {
        context.items.push({
          name: context.name,
          label: opt.label,
          value: opt.value,
          // _id must be included because it is a special property that
          // #each uses to track unique list items when adding and removing them
          // See https://github.com/meteor/meteor/issues/2174
          _id: opt.value,
          selected: isSelected(context.value, opt.value),
          atts: itemAtts
        });
      }
    });

    return context;
  }
});

Template.afSelect2.helpers({
  atts: function addFormControlAtts() {
    return _.omit(this.atts, 'select2Options');
  }
});

Template.afSelect2.events({
  'select2:select select': function (event, template) {
    // When select2 selection changes, we update the `selected` attr
    // on the real select element. This persists better when the DOM
    // changes, allowing us to retain selection properly by using this
    // in the template autorun.
    // Fixes #18
    var val = template.$('select').val();
    if (!_.isArray(val)) { val = [val]; }
    template.$('select option').each(function () {
      var $this = $(this);
      var selected = val.indexOf($this.attr('value')) !== -1;
      $this.prop('selected', selected).attr('selected', selected);
    });
  }
});

Template.afSelect2.onRendered(function () {
  var template = this;
  var $s = template.$('select');

  // instanciate select2
  $s.select2(template.data.atts.select2Options || {});

  template.autorun(function () {
    var data = Template.currentData();

    var values = [];
    _.each(data.items, function (item) {
      if (_.has(item, 'items')) {
        _.each(item.items, function (subItem) {
          if (subItem.selected) {
            values.push(subItem.value);
          }
        });
      } else {
        if (item.selected) {
          values.push(item.value);
        }
      }
    });

    var $selects;
    if (values.length === 0) {
      $selects = template.$('select option');
    } else {
      // Include any that were previously added as new tags
      $selects = template.$('select option[data-select2-tag]');
    }

    $selects.each(function () {
      var $this = $(this);
      if ($this.attr('selected')) {
        values.push($this.attr('value'));
      }
    });

    var currentValues = $s.val();
    if ((!currentValues && values.length > 0) ||
        (currentValues && currentValues.toString() !== values.toString())) {
      // select2 requires that we trigger change event
      // for it to realize it needs to update the select2 list.
      // We do it only if values have actually changed,
      // which should help prevent autosave infinite looping.
      $s.val(values).trigger('change');
    }
  });
});

Template.afSelect2.onDestroyed(function () {
  try {
    if (this.view && this.view._domrange && this.$('select').data('select2')) {
      this.$('select').select2('destroy');
    }
  } catch (error) {}
});

/*
 *  BOOTSTRAP THEME
 */

Template.afSelect2.copyAs('afSelect2_bootstrap3');

// The only difference is that we need to add "form-control" class
Template.afSelect2_bootstrap3.helpers({
  atts: function addFormControlAtts() {
    var atts = _.omit(this.atts, 'select2Options');
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, 'form-control');
    return atts;
  }
});

/////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("aldeed:autoform-select2");

})();
