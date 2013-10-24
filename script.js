/*jshint quotmark: false, plusplus: false*/
/*global TreeNode, confirm*/

(function() {
    "use strict";

    var tree,
        dragging,
        draggedItem,
        deleted = [],
        added = [],
        updated = [];

    function addTargetListeners(target) {
        target.addEventListener('dragenter', function(e) {
            e.stopPropagation();
            if (this.classList.contains('target')) {
                this.classList.add('over');
            }
        }, false);
        target.addEventListener('dragover', function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';

            return false;
        }, false);
        target.addEventListener('dragleave', function() {
            this.classList.remove('over');
        }, false);
        target.addEventListener('drop', function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            var parent = this.parentNode;
            var children = parent.childNodes;
            var targets = document.querySelectorAll('.target');
            var itemParent = draggedItem.Parent();
            var item = itemParent.Remove(draggedItem);
            var newIndex;

            this.parentNode.insertBefore(dragging, this);
            this.parentNode.classList.remove('draggingCont');
            dragging.classList.remove('dragging');

            [].forEach.call(targets, function(targ) {
                targ.parentNode.removeChild(targ);
            });

            for (var i = children.length - 1; i >= 0; i--) {
                if (children[i] === dragging) {
                    newIndex = i;
                    break;
                }
            }

            itemParent.Add(item, newIndex);

            return false;
        }, false);
    }

    function updatedItem(item) {
        if (added.indexOf(item) < 0 && updated.indexOf(item) < 0) {
            updated.push(item);
        }

    }

    function setLink(item, link) {
        if (/^\d+$/.test(link)) {
            item.Payload().page_id = link;
        } else {
            item.Payload().url = link || null;
        }
    }

    function addItem(context) {
        var hasChildren = context.item.Children().length > 0;
        var newItem = context.item.Add({
                text: null,
                page_id: null,
                url: null
            }, 0);
        var childWrapper = context.childWrapper;
        var myNode = addNode(newItem);

        childWrapper.insertBefore(myNode, childWrapper.firstChild);

        if (!hasChildren) {
            context.wrapper.insertBefore(context.openButton, context.view);
            context.item.Payload().url = null;
            context.item.Payload().page_id = null;
            context.urlBox.disabled = true;
            updatedItem(context.item);
        }

        if (!context.wrapper.classList.contains('childrenVisible')) {
            context.wrapper.classList.add('childrenVisible');
        }

        myNode.classList.add('edit');

        added.push(newItem);
    }

    function removeItem(context) {
        var parent = context.item.Parent();
        var parentCont = context.wrapper.parentNode;
        var parentUI = parentCont.parentNode;
        var itemname = (context.item.Payload()) ? context.item.Payload().text : "null";
        var addedIndex = added.indexOf(context.item);
        var updatedIndex = updated.indexOf(context.item);

        if (context.item.Children().length === 0 && confirm("Deleting " + itemname + ". Are you sure?")) {
            if (addedIndex > -1) {
                added.splice(addedIndex, 1);
            } else {
                if (updatedIndex > -1) {
                    updated.splice(updatedIndex, 1);
                }

                deleted.push(context.item);
            }
            
            parent.Remove(context.item);

            parentCont.removeChild(context.wrapper);

            if (!parentCont.hasChildNodes()) {
                parentUI.removeChild(parentUI.querySelector('.open'));
                parentUI.querySelector('.url').removeAttribute('disabled');
                setLink(parent, parentUI.querySelector('.url').value);
                parentUI.classList.remove('childrenVisible');
                updatedItem(parent);
            }
        }
    }

    function saveItem(context) {
        var oldPayload = context.item.Payload();
        var newPayload = {
            id: oldPayload.id,
            lft: oldPayload.lft,
            rgt: oldPayload.rgt,
            text: context.text.value
        };

        context.item.Payload(newPayload);
        setLink(context.item, context.url.value);
        updatedItem(context.item);
    }

    function addNode(item) {
        var view = document.createElement('span'),
            text = document.createElement('input'),
            url = document.createElement('input'),
            inputs = document.createElement('div'),
            add = document.createElement('button'),
            remove = document.createElement('button'),
            save = document.createElement('button'),
            cancel = document.createElement('button'),
            open = document.createElement('button'),
            buttons = document.createElement('div'),
            wrapper = document.createElement('li'),
            childWrapper = document.createElement('ul'),
            children = item.Children();

        // Set up the elements inside each item
        view.textContent = item.Payload().text;
        view.classList.add('view');

        text.value = item.Payload().text;
        text.classList.add('text');

        url.value = item.Payload().url || item.Payload().page_id;
        url.classList.add('url');

        add.textContent = 'Add';
        remove.textContent = 'Delete';
        save.textContent = 'Save';
        cancel.textContent = 'Cancel';

        inputs.classList.add('inputs');
        inputs.appendChild(text);
        inputs.appendChild(url);

        buttons.classList.add('buttons');
        buttons.appendChild(add);
        buttons.appendChild(remove);
        buttons.appendChild(cancel);
        buttons.appendChild(save);

        wrapper.setAttribute('draggable', 'true');
        wrapper.classList.add('item');
        wrapper.appendChild(view);
        wrapper.appendChild(inputs);
        wrapper.appendChild(buttons);

        // Go get the children
        for (var i = 0, max = children.length; i < max; i++) {
            childWrapper.appendChild(addNode(children[i]));
        }
        wrapper.appendChild(childWrapper);
        open.classList.add('open');

        if (children.length) {
            url.setAttribute('disabled', 'disabled');
            wrapper.insertBefore(open, view);
        }

        // Add event listeners
        add.addEventListener('click', function() {
            addItem({
                item: item,
                wrapper: wrapper,
                childWrapper: childWrapper,
                urlBox: url,
                openButton: open,
                view: view
            });
        }, false);
        remove.addEventListener('click', function() {
            removeItem({
                item: item,
                wrapper: wrapper
            });
        }, false);
        save.addEventListener('click', function() {
            saveItem({
                item: item,
                text: text,
                url: url
            });

            view.textContent = text.value;
            wrapper.classList.remove('edit');
        }, false);
        cancel.addEventListener('click', function() {
            text.value = item.Payload().text;
            url.value = item.Payload().url || item.Payload().page_id;
            wrapper.classList.remove('edit');
        }, false);
        open.addEventListener('click', function() {
            wrapper.classList.toggle('childrenVisible');
        }, false);
        wrapper.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            if (!this.classList.contains('edit')) {
                this.classList.add('edit');
            }
        }, false);

        // Drag events
        wrapper.addEventListener('dragstart', function(e) {
            e.stopPropagation();
            var target = document.createElement('li');
            var parent = this.parentNode;
            var children = parent.childNodes;
            var curr;

            this.classList.add('dragging');
            parent.classList.add('draggingCont');
            target.classList.add('target');

            for (var i = children.length - 1; i >= 0; i--) {
                if ((children[i] && children[i] !== this) &&
                    !(children[i - 1] && children[i - 1] === this)) {
                    curr = parent.insertBefore(target.cloneNode(), children[i]);
                    addTargetListeners(curr);
                }
            }
            
            curr = this.parentNode.appendChild(target.cloneNode());
            addTargetListeners(curr);

            dragging = this;
            draggedItem = item;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }, false);
        wrapper.addEventListener('dragend', function() {
            var targets = document.querySelectorAll('.target');
            [].forEach.call(targets, function(target) {
                if (!target.classList.contains('over')) {
                    target.parentNode.removeChild(target);
                }
            });

            var overs = document.querySelectorAll('.over');
            [].forEach.call(overs, function(over) {
                over.classList.remove('over');
            });

            this.classList.remove('dragging');
            this.parentNode.classList.remove('draggingCont');
        }, false);

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

    function generateInserts() {
        var index = document.getElementById('index').value,
            inserts;

        tree.Decorate('LftRgt', {index: index});
        inserts = tree.ExportInserts();
        return inserts.Statement();
    }

    function generateUpdates(lists) {
        var index = document.getElementById('index').value,
            inserts;

        tree.Decorate('LftRgt', {index: index});
        inserts = tree.ExportUpdates(lists);
        return inserts.Statement();
    }

    function generate() {
        var statements;
        var useUpdate = document.getElementById('useUpdate');
        var results = document.getElementById('insert');

        if (useUpdate.checked) {
            statements = generateUpdates({
                updates: updated,
                inserts: added,
                deletes: deleted
            });
        } else {
            statements = generateInserts();
        }

        results.textContent = statements;
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
