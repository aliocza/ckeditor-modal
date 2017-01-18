/*
* Modal Plugin
*
* @author Aliocha Mazurkiewicz <contact@renska.be>
* @version 0.1.0
*/
CKEDITOR.dialog.add('modalDialog', function(editor) {

    return {
        title: editor.lang.modal.title,
        minWidth: 600,
        minHeight: 150,

        contents: [
            {
                //crée une tab avec des élèments
                id: 'tab-basic',
                label: editor.lang.modal.tab,
                elements: [
                    {
                        type: 'text',
                        id: 'title-button',
                        label: editor.lang.modal.txtTitle,
                        validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.modal.txtErrorEmpty),
                        setup: function(element) {
                            this.setValue(element.data.textBtn);
                        },
                        commit: function(element) {
                            if (typeof element !== "undefined")
                                element.setData('textBtn', this.getValue());
                            }

                    },
                    {
                        type: 'text',
                        id: 'title-modal',
                        label: 'title modal',
                        setup: function(element) {
                            this.setValue(element.data.titleModal);
                        },
                        commit: function(element) {
                            if (typeof element !== "undefined")
                                element.setData('titleModal', this.getValue());
                            }

                    },
                    {
                        type: 'textarea',
                        id: 'modal',
                        label: editor.lang.modal.txtArea,
                        validate: function() {
                            if (editor.config.modal_html === true)
                                CKEDITOR.instances[this._.inputId].updateElement();

                            if (this.getValue().length < 1) {
                                alert(editor.lang.modal.txtErrorEmpty);
                                return false;
                            };
                        },
                        //setup permet d'injecter une valeur par exemple au clique droit et edit

                        setup: function(element) {
                            this.setValue(element.data.contentModal);
                        },

                        commit: function(element) {

                            if (editor.config.modal_html === true)
                                CKEDITOR.instances[this._.inputId].updateElement();
                            if (typeof element !== "undefined")
                                element.setData('contentModal', this.getValue());

                            }
                        ,

                        onShow: function() {
                            if (editor.config.modal_html === true)
                                CKEDITOR.replace(this._.inputId, {
                                    toolbar: editor.config.modal_toolbar,
                                    stylesSet: editor.config.modal_styleSet,
                                    baseFloatZIndex: 10010
                                });
                            }
                        ,
                        onHide: function() {
                            if (editor.config.modal_html === true)
                                CKEDITOR.instances[this._.inputId].destroy();
                            }

                    }
                ]
            },
            {
                //crée une tab avec des élèments
                id: 'tab-avanced',
                label: 'avanced',
                elements: [
                    {
                        type: 'text',
                        id: 'id-modal',
                        label: 'id',
                        validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.modal.txtErrorEmpty),
                        setup: function(element) {
                            if(element.data.guid !== 'modal'){
                            this.setValue(element.data.guid);
                          }else{
                            this.setValue(guid());
                          }
                        },
                        commit: function(element) {
                            if (typeof element !== "undefined")
                                element.setData('guid', this.getValue());
                            }

                    },
                    {
                        type: 'checkbox',
                        id: 'show-header',
                        label: 'Display header with dimissis',
                        'default': 'checked',
                        onClick: function() {
                            // this = CKEDITOR.ui.dialog.checkbox
                            alert( 'Checked: ' + this.getValue() );
                        }
                    },
                    {
                        type: 'checkbox',
                        id: 'show-header',
                        label: 'Display footer with dimissis',
                        'default': 'checked',
                        onClick: function() {
                            // this = CKEDITOR.ui.dialog.checkbox
                            alert( 'Checked: ' + this.getValue() );
                        }
                    },
                    {
                        type: 'select',
                        id: 'size-modal',
                        label: 'Select size modal',
                        items: [ [ 'small' ], [ 'default' ], [ 'large' ] ],
                        'default': 'default',
                        onChange: function( api ) {
                            // this = CKEDITOR.ui.dialog.select
                            alert( 'Current value: ' + this.getValue() );
                        }
                    }
                ]
            }
        ],

        onShow: function() {

        },
        onOk: function() {

            var dialog = this;
            var modal = this.element;

            this.commitContent(modal);

            if (this.insertMode)
                editor.insertElement(modal);

            }

    };
    function guid() {
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x'
                    ? r
                    : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return id;
    }
});
