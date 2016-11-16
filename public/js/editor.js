require.config({
    packages: [
        {
            name: 'codemirror',
            location: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.5.0',
            main: 'codemirror.min'
        }],
    // for some reason, the mardown mode in codemirror is looking for the
    // master codemirror file in the wrong place. This map fixes it.
    map: {
        'codemirror': {
            'codemirror/lib/codemirror': 'codemirror'
        }
    },
    paths: {
        showdown: 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.2.2/showdown.min',
        dropzone: 'https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min'
    },
    shim: {
        'dropzone': {
            exports: 'Dropzone'
        }
    }
});
require([
    "codemirror",
    "showdown",
    "dropzone",
    "codemirror/mode/markdown/markdown.min"
], function (CodeMirror, showdown, Dropzone) {
    'use strict';

    var textarea = document.querySelector('#entry-markdown'),
        preview = document.querySelector('.rendered-markdown'),
        converter = new showdown.Converter(),
        editor = CodeMirror.fromTextArea(textarea, {
            mode: 'markdown',
            tabMode: 'indent',
            lineWrapping: true
        });


    function updateImagePlaceholders() {
        var imgPlaceholders = (Array.prototype.slice.call(document.querySelectorAll('.rendered-markdown p'))).filter(function (p) {
            return (/^(?:\{<(.*?)>\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?$/gim).test(p.innerText);
        });
        Dropzone.autoDiscover = false;

        imgPlaceholders.forEach(
            function (element, index) {
                element.setAttribute("class", "dropzone");

                var dropzone = new Dropzone(element, {
        						url: "/upload/media",
                    paramName: 'file',
                    acceptedFiles: 'image/*',
                    headers: {
                      'x-csrf-token': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (file, response) {
                        var holderP = file.previewElement.closest("p"),
                            preList = Array.prototype.slice.call(document.querySelectorAll('.CodeMirror-code pre')),
                            imgHolderMarkdown = preList.filter(function (element) {
                                return (/^(?:\{<(.*?)>\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?$/gim).test(element.textContent) && (element.querySelectorAll('span').length === 0);
                            }),
                            editorOrigVal = editor.getValue(),
                            nth = 0,
                            newMarkdown = editorOrigVal.replace(/^(?:\{<(.*?)>\})?!(?:\[([^\n\]]*)\])(:\(([^\n\]]*)\))?$/gim, function (match, i, original) {
                                nth++;
                                return (nth === (index + 1)) ? (match + "(" + response.path + ")") : match;
                            });

                        editor.setValue(newMarkdown);

                        holderP.classList.remove("dropzone");
                        holderP.innerHTML = '<img src="' + response.path + '"/>';
                    }
                });
            }
        );
    }

    function updatePreview() {
        preview.innerHTML = converter.makeHtml(editor.getValue());
        updateImagePlaceholders();
    }

    function updateWordCount() {
        var text = document.querySelector('.rendered-markdown').innerHTML.replace(/(<([^>]+)>)/ig, '').trim(),
            count = (text.length === 0) ? 0 : text.split(/\s+/).length;
        document.querySelector('.entry-word-count').innerHTML = count + " words";
    }

    function syncScroll() {
        var codeViewport = document.querySelector('.CodeMirror-scroll'),
            previewViewport = document.querySelector('.entry-preview-content'),
            codeContent = document.querySelector('.CodeMirror-sizer'),
            previewContent = document.querySelector('.rendered-markdown'),

            codeHeight = codeContent.clientHeight - window.getComputedStyle(codeViewport, null).height.split("px")[0],
            // TODO: for some reason, this needs a 50px 'bodge' to make it scroll to the bottom properly
            previewHeight = previewContent.clientHeight - window.getComputedStyle(previewViewport, null).height.split("px")[0] + 50,
            ratio = previewHeight / codeHeight,
            previewPostition = codeViewport.scrollTop * ratio;


        previewViewport.scrollTop = previewPostition;
    }

    editor.on("change", function () {
        updatePreview();
        syncScroll();
        updateWordCount();
    });
    $('.btn.btn-midnight').on('click focus', function(){
      $('#entry-markdown').html(editor.getValue());
    });

    updatePreview();
    updateWordCount();
    document.querySelector('.CodeMirror-scroll').onscroll = syncScroll;
});
