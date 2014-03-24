/**
 * Created by ben on 3/23/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'text!templates/infos/contacts.html'
], function ($, _, Backbone, Router, contactTemplate) {

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        render: function () {
            var data = {};
            var compiledTemplate = _.template(contactTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
        },
        events: {
            'click #email': 'sendEmail',
            'click [data-toggle=offcanvas]': 'toggleClass'
        },
        sendEmail: function(){
            var mail= "mailto:frenchtarot@gmail.com";
            window.location.href = mail;
        },
        toggleClass: function (e) {
            this.$('.row-offcanvas').toggleClass('active');
        }
    });

    return HomeView;
});