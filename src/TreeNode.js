(function (global) {
    "use strict";

    // To use this, first create a tree root with:
    // var root = TreeNode.CreateRoot(Payload);
    function TreeNode(options) {
        if (!(this instanceof TreeNode)) {
            return new TreeNode(options);
        }

        if (options && options.payload) {
            this._children = [];
            this._parent = options.parent;
            this._payload = options.payload;

            return this;
        } else {
            return null;
        }
    }

    TreeNode.prototype.Parent = function() {
        return this._parent;
    };

    TreeNode.prototype.Payload = function(payload) {
        if (payload) {
            this._payload = payload;
        }

        return this._payload;
    };

    TreeNode.prototype.Children = function(index) {
        if (index || index === 0) {
            return this._children[index];
        } else {
            return this._children;
        }
    };

    TreeNode.prototype.Add = function(payload) {
            var child;

            if (!payload) {
                return;
            }

            if (payload.constructor.name !== "TreeNode") {
                child = new TreeNode({
                    parent: this,
                    payload: payload,
                });
            } else {
                child = payload;
                child._parent = this; // This kind of breaks my rules...
            }

            this._children.push(child);

            return child;
    };

    TreeNode.prototype.Remove = function(target) {
            var removed,
                targetIndex = this.Children().indexOf(target);

            if (targetIndex > -1) {
                removed = this.Children().splice(targetIndex, 1);
            }

            return (removed && removed[0]) ? removed[0] : undefined;
    };

    // Factory...
    TreeNode.CreateRoot = function (Payload) {
        var tree =  new TreeNode({
            payload: Payload,
            parent: null
        });

        return tree;
    };

    global.TreeNode = TreeNode;

}(this));

