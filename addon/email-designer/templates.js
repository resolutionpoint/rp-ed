import ContentBlockText from './content-block-text';
import ContentBlockImage from './content-block-image';
import Ember from 'ember';

const bodyTemplate = content => '' +
'<table class="ed-background" style="text-align:center; background-color:#d5e4ed;  border-collapse:collapse;" align="center" bgcolor="#d5e4ed" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tbody>' +
        '<tr>' +
            '<td align="center">' +
                '<br/>' +
                '<table class="ed-body" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-collapse: collapse; background-color:#ffffff; min-width: 600px;" width="600">' +
                    '<tbody>' +
                        '<tr>' +
                            '<td valign="top">' +
                                content +
                            '</td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>' +
                '<br/>' +
            '</td>' +
        '</tr>' +
    '</tbody>' +
'</table>';

const frameBody = content => '' +
'<table class="ed-frame-block" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;" width="100%">' +
    '<tbody>' +
        '<tr>' +
            content +
        '</tr>' +
    '</tbody>' +
'</table>';


const localTemplates = Ember.A([
  Ember.Object.extend({
    name: "Шаблон №1",
    body: Ember.computed(function(){
      const content = ContentBlockImage.htmlText +
       ContentBlockText.htmlText +
       ContentBlockText.htmlText;
      return bodyTemplate(content);
    })
  }).create(),
  Ember.Object.extend({
    name: "Шаблон №2",
    body: Ember.computed(function(){
      const content = ContentBlockText.htmlText +
        ContentBlockImage.htmlText +
        ContentBlockText.htmlText +
        ContentBlockText.htmlText;
      return bodyTemplate(content);
    })
  }).create(),
  Ember.Object.extend({
    name: "Шаблон №3",
    body: Ember.computed(function(){
      const content = '' +
        ContentBlockText.htmlText +
        frameBody(
          '<td width="50%" valign="top">' +
            ContentBlockImage.htmlText +
          '</td>' +
          '<td width="50%" valign="top">' +
            ContentBlockText.htmlText +
          '</td>'
        ) +
        frameBody(
          '<td width="25%" valign="top">' +
            ContentBlockImage.htmlText +
          '</td>' +
          '<td width="25%" valign="top">' +
            ContentBlockImage.htmlText +
          '</td>' +
          '<td width="25%" valign="top">' +
            ContentBlockImage.htmlText +
          '</td>' +
          '<td width="25%" valign="top">' +
            ContentBlockImage.htmlText +
          '</td>'
        ) +
        ContentBlockText.htmlText +
        ContentBlockText.htmlText;

      return bodyTemplate(content);
    })
  }).create()
]);

const emptyMessageTemplate = Ember.get(localTemplates, "firstObject.body");

const testTemplate = Ember.Object.create({
    name: "Шаблон для тестов",
    body: bodyTemplate(ContentBlockText.htmlText)
});

export default Ember.Object.create({
    localTemplates,
    emptyMessageTemplate,
    testTemplate
});
