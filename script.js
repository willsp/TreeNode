/*global TreeNode*/
(function() {
    "use strict";

    var tree,
        deleted = [],
        added = [],
        updated = [];

    function addItem(context) {
        var newItem = context.item.Add({
                text: null,
                page_id: null,
                url: null
            }, 0),
            childWrapper = context.wrapper.parentNode,
            parentUI = childWrapper.parentNode;

        if (context.childWrapper) {
            context.wrapper.removeChild(context.childWrapper);
            context.wrapper.appendChild(bindChildren(context.item.Children()));
        } else {
            parentUI.removeChild(childWrapper);
            parentUI.appendChild(bindChildren(context.item.Parent().Children()));
        }

        added.push(newItem);
    }

    function removeItem(context) {
        var parent = context.item.Parent(),
            childWrapper = context.wrapper.parentNode,
            parentUI = childWrapper.parentNode,
            itemname = (context.item.Payload()) ? context.item.Payload().text : "null",
            children, addedIndex, updatedIndex;

        if (confirm("Deleting " + itemname + ". Are you sure?")) {
            addedIndex = added.indexOf(context.item);
            if (addedIndex > -1) {
                added.splice(addedIndex, 1);
            }

            updatedIndex = updated.indexOf(context.item);
            if (updatedIndex > -1) {
                updated.splice(updatedIndex, 1);
            }

            deleted.push(context.item);
            
            parent.Remove(context.item);

            parentUI.removeChild(childWrapper);
            children = bindChildren(parent.Children());
            if (children) {
                parentUI.appendChild(children);
            }
        }
    }

    function move(context) {
        var parent = context.item.Parent(),
            index = parent.Children().indexOf(context.item),
            newIndex = index + context.move,
            childWrapper = context.wrapper.parentNode,
            parentUI = childWrapper.parentNode;

        if (newIndex >= 0 && newIndex < parent.Children().length) {
            context.item = parent.Remove(context.item);
            parent.Add(context.item, newIndex);

            parentUI.removeChild(childWrapper);
            parentUI.appendChild(bindChildren(parent.Children()));
        }
    }

    function saveItem(context) {
        var newPayload = {
            text: context.text.value
        };

        if (/^\d+$/.test(context.url.value)) {
            newPayload.page_id = context.url.value;
        } else {
            newPayload.url = context.url.value || null;
        }

        context.item.Payload(newPayload);
        if (added.indexOf(context.item) < 0 && updated.indexOf(context.item)) {
            updated.push(context.item);
        }
    }

    function bindChildren(children) {
        var wrapper;

        for (var i = 0, max = children.length; i < max; i++) {
            if (!wrapper) {
                wrapper = document.createElement('ul');
            }

            wrapper.appendChild(addNode(children[i]));
        }

        return wrapper;
    }

    function addNode(item) {
        var text = document.createElement('input'),
            url = document.createElement('input'),
            inputs = document.createElement('div'),
            add = document.createElement('button'),
            remove = document.createElement('button'),
            up = document.createElement('button'),
            down = document.createElement('button'),
            save = document.createElement('button'),
            buttons = document.createElement('div'),
            wrapper = document.createElement('li'),
            childWrapper;

        text.value = item.Payload().text;
        text.setAttribute('class', 'text');

        url.value = item.Payload().url || item.Payload().page_id;
        url.setAttribute('class', 'url');

        add.textContent = '+';
        add.setAttribute('class', 'add');

        remove.textContent = '-';
        remove.setAttribute('class', 'remove');

        up.textContent = 'u';
        up.setAttribute('class', 'up');

        down.textContent = 'd';
        down.setAttribute('class', 'down');

        save.textContent = 'save';
        save.setAttribute('class', 'save');
 
        add.addEventListener('click', function() {
            addItem({
                item: item,
                wrapper: wrapper,
                childWrapper: childWrapper
            });
        }, false);
        remove.addEventListener('click', function() {
            removeItem({
                item: item,
                wrapper: wrapper
            });
        }, false);
        up.addEventListener('click', function() {
            move({
                item: item,
                wrapper: wrapper,
                move: -1
            });
        }, false);
        down.addEventListener('click', function() {
            move({
                item: item,
                wrapper: wrapper,
                move: 1
            });
        }, false);
        save.addEventListener('click', function() {
            saveItem({
                item: item,
                text: text,
                url: url
            });
        }, false);

        inputs.setAttribute('class', 'inputs');
        inputs.appendChild(text);
        inputs.appendChild(url);

        buttons.setAttribute('class', 'buttons');
        buttons.appendChild(add);
        buttons.appendChild(remove);
        buttons.appendChild(up);
        buttons.appendChild(down);
        buttons.appendChild(save);

        wrapper.setAttribute('class', 'item');
        wrapper.appendChild(inputs);
        wrapper.appendChild(buttons);

        childWrapper = bindChildren(item.Children());
        if (childWrapper) {
            wrapper.appendChild(childWrapper);
        }

        return wrapper;
    }

    function buildUI() {
        var df = document.createDocumentFragment(),
            treeRoot = document.createElement('ul');

        treeRoot.appendChild(addNode(tree));
        df.appendChild(treeRoot);
        
        return df;
    }

    function importModel() {
        /*jshint validthis: true*/
        var data = document.getElementById('import').value,
            menuBox = document.getElementById('menu');

        if (data) {
            tree = TreeNode['ImportFrom' + this.id.replace(/build/, '')](data);
        }

        if (menuBox.firstChild) {
            menuBox.removeChild(menuBox.firstChild);
        }
        menuBox.appendChild(buildUI());
    }

    function generate() {
        var index = document.getElementById('index').value,
            results = document.getElementById('insert'),
            inserts;

        tree.Decorate('LftRgt', {index: index});
        inserts = tree.ExportInserts();
        results.textContent = inserts.Statement();
    }

    function selectText(el) {
        var range, selection;

        if (document.body.createTextRange) { // ie
            range = document.body.createTextRange();
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

    document.getElementById('buildLftRgt').addEventListener("click", importModel, false);
    document.getElementById('buildSelfRef').addEventListener("click", importModel, false);
    document.getElementById('generate').addEventListener("click", generate, false);
    document.getElementById('insert').addEventListener("click", function() {
        selectText(this);
    }, false);

}());
