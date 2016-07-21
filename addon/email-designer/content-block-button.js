import Ember from 'ember';

export default Ember.Object.create({
    htmlText:
        '<table class="ed-content-block ed-content-block-button" cellpadding="0" cellspacing="0" border="0" align="center" style="width: 100%;">' +
            '<tbody>' +
                '<tr>' +
                    '<td align="center">' +
                        // '<!--[if mso]>' +
                        //  '<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:62px;v-text-anchor:middle;width:335px; display: block;" arcsize="4.838709677419355%" stroke="f" fillcolor="rgb(47, 170, 222)">' +
                        //  '<w:anchorlock></w:anchorlock>' +
                        //  '<center>' +
                        // '<![endif]-->' +
                        '<a class="ed-button-link" href="#" target="_blank" style="background-color:#2faade;border-radius:3px;color:#000;display:inline-block;text-align:center;text-decoration:none;width:60%;-webkit-text-size-adjust:none; box-sizing: border-box">' +
                            '<div class="ed-button-text" style="font-size:26px;">' +
                                '<p style="display: block; font-family: Arial, Helvetica, sans-serif; color: #000;  font-size: 16px; text-decoration: none;"></p>' +
                            '</div>' +
                        '</a>' +
                        // '<!--[if mso]>' +
                        //  '</center>' +
                        //  '</v:roundrect>' +
                        // '<![endif]-->' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>'
});
