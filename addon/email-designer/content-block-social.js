import Ember from 'ember';
import ContentBlockSocialVK from './content-block-social-vk';
import ContentBlockSocialOK from './content-block-social-ok';
import ContentBlockSocialFB from './content-block-social-fb';

export default Ember.Object.create({
    htmlText:
        '<table class="ed-content-block ed-content-block-social" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">' +
            '<tbody><tr><td align="center" style="padding-left:9px; padding-right:9px">' +
                '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">' +
                    '<tbody><tr><td align="center" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px">' +
                        '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse">' +
                            '<tbody><tr><td valign="top" style="">' +
                                ContentBlockSocialVK.htmlText +
                                ContentBlockSocialOK.htmlText +
                                ContentBlockSocialFB.htmlText +
                            '</td></tr></tbody>' +
                        '</table>' +
                    '</td></tr></tbody>' +
                '</table>' +
            '</td></tr></tbody>' +
        '</table>'
});
