/*
* Modal Plugin
*
* @author Aliocha Mazurkiewicz <contact@renska.be>
* @version 0.1.0
* https://dev.ckeditor.com/ticket/10974 #inline modal waiting
*/
CKEDITOR.plugins.add('modal', {
    requires: 'widget',
    icons: 'modal',
    lang: [
        'en', 'fr'
    ],
    afterInit: function(editor) {
        CKEDITOR.addCss('.cke_editable .' + editor.config.modal_class + '{' + 'display:none' + '}');
    },
    init: function(editor) {

        CKEDITOR.dialog.add('modalDialog', this.path + 'dialogs/modal.js');
        editor.widgets.add('modal', {
            button: 'Create a simple box',
            dialog: 'modalDialog',
            template: '<div class="modalWrapper">' + '<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal">' + 'Launch demo modal' + '</button>' + '<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' + '<div class="modal-dialog" role="document">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '<h4 class="modal-title" id="myModalLabel">Modal title</h4>' + '</div>' + '<div class="modal-body">' + '...' + '</div>' + '<div class="modal-footer">' + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>',

            requiredContent: 'div(modalWrapper)',
            upcast: function(element) {
                return element.name == 'div' && element.hasClass('modalWrapper');
            },

            init: function() {

                var textBtn = this.element.getChild(0).getText();
                var contentModal = this.element.getChild(1).getChild(0).getChild(0).getChild(1).getHtml();
                var guid = this.element.getChild(1).getAttribute('id');
                var titleModal = this.element.getChild(1).getChild(0).getChild(0).getChild(0).getChild(1).getText();

                if (textBtn)
                    this.setData('textBtn', textBtn);

                if (contentModal)
                    this.setData('contentModal', contentModal);

                if (guid)
                   this.setData('guid', guid);

                if (titleModal)
                   this.setData('titleModal', titleModal);

                }
            ,

            data: function() {

                if (this.data.textBtn)
                    this.element.getChild(0).setText(this.data.textBtn);

                if (this.data.contentModal)
                    this.element.getChild(1).getChild(0).getChild(0).getChild(1).setHtml(this.data.contentModal);
                if (this.data.guid) {
                   this.element.getChild(0).setAttribute('data-target', '#'+this.data.guid);
                   this.element.getChild(1).setAttribute('id', this.data.guid);

                   this.element.getChild(1).setAttribute('aria-labelledby', this.data.guid+'Label');
                   this.element.getChild(1).getChild(0).getChild(0).getChild(0).getChild(1).setAttribute('id', this.data.guid+'Label');

                }
                if (typeof this.data.titleModal !== "undefined")
                    this.element.getChild(1).getChild(0).getChild(0).getChild(0).getChild(1).setText(this.data.titleModal);

            }

        });

    }
});

CKEDITOR.config.modal_tag = 'button';
CKEDITOR.config.modal_class = 'modal';
CKEDITOR.config.modal_html = true;
CKEDITOR.modal_toolbar = [
    {
        name: 'document',
        groups: [
            'mode', 'document', 'doctools'
        ],
        items: [
            'Source',
            '-',
            'Save',
            'NewPage',
            'Preview',
            'Print',
            '-',
            'Templates'
        ]
    }, {
        name: 'clipboard',
        groups: [
            'clipboard', 'undo'
        ],
        items: [
            'Cut',
            'Copy',
            'Paste',
            'PasteText',
            'PasteFromWord',
            '-',
            'Undo',
            'Redo'
        ]
    }, {
        name: 'editing',
        groups: [
            'find', 'selection', 'spellchecker'
        ],
        items: [
            'Find',
            'Replace',
            '-',
            'SelectAll',
            '-',
            'Scayt'
        ]
    }, {
        name: 'forms',
        items: [
            'Form',
            'Checkbox',
            'Radio',
            'TextField',
            'Textarea',
            'Select',
            'Button',
            'ImageButton',
            'HiddenField'
        ]
    },
    '/', {
        name: 'basicstyles',
        groups: [
            'basicstyles', 'cleanup'
        ],
        items: [
            'Bold',
            'Italic',
            'Underline',
            'Strike',
            'Subscript',
            'Superscript',
            '-',
            'RemoveFormat'
        ]
    }, {
        name: 'paragraph',
        groups: [
            'list', 'indent', 'blocks', 'align', 'bidi'
        ],
        items: [
            'NumberedList',
            'BulletedList',
            '-',
            'Outdent',
            'Indent',
            '-',
            'Blockquote',
            'CreateDiv',
            '-',
            'JustifyLeft',
            'JustifyCenter',
            'JustifyRight',
            'JustifyBlock',
            '-',
            'BidiLtr',
            'BidiRtl',
            'Language'
        ]
    }, {
        name: 'links',
        items: ['Link', 'Unlink', 'Anchor']
    }, {
        name: 'insert',
        items: [
            'Image',
            'Flash',
            'Table',
            'HorizontalRule',
            'Smiley',
            'SpecialChar',
            'PageBreak',
            'Iframe'
        ]
    },
    '/', {
        name: 'styles',
        items: ['Styles', 'Format', 'Font', 'FontSize']
    }, {
        name: 'colors',
        items: ['TextColor', 'BGColor']
    }, {
        name: 'tools',
        items: ['Maximize', 'ShowBlocks']
    }, {
        name: 'others',
        items: ['-']
    }, {
        name: 'about',
        items: ['About']
    }
];
CKEDITOR.config.modal_styleSet = 'default';
