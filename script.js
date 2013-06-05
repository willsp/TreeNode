(function() {
    "use strict";

    function generate() {
        var data = document.getElementById('import').value,
            index = document.getElementById('index').value,
            results = document.getElementById('insert'),
            tree, inserts;

        if (data) {
            tree = TreeNode.ImportFromSelfRef(data);
            tree.Decorate('LftRgt', {index: index});

            inserts = tree.ExportInserts();

            results.innerText = inserts.Statement();
        }
    }

    function selectText(el) {
        var range, selection;

        if (document.body.createTextRange) { // ie
            range = doc.body.createTextRange();
            range.moveToElementText(el);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(el);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    document.getElementById('generate').addEventListener("click", generate, false);
    document.getElementById('insert').addEventListener("click", function() {
        selectText(this);
    }, false);

}());
