(function (global) {
    "use strict";

    // To use this, first create a tree root with:
    // var root = TreeNode.CreateRoot(Payload);
    var TreeNode = function (options) {
        if (!(this instanceof TreeNode)) {
            return new TreeNode(options);
        }

        // Private Properties
        var parent = null,
            payload = null,
            children = [];

        // Public Getters/Setters
        this.Parent = function() {
            return parent;
        };

        this.Payload = function(value) {
            if (value) {
                payload = value;
            }

            return payload;
        };

        this.Children = function(index) {
            if (index || index === 0) {
                return children[index];
            } else {
                return children;
            }
        };

        // Public Methods
        this.Add = function (Payload) {
            var child = new TreeNode({
                parent: this,
                payload: Payload
            });

            children.push(child);

            return child;
        };

        // Setup this instance
        if (options && options.payload) {
            if (options.parent) {
                parent = options.parent;
            }

            this.Payload(options.payload);

            return this;
        } else {
            return null;
        }
    };

    // Factory...
    TreeNode.CreateRoot = function (Payload) {
        return new TreeNode({
            parent: null,
            payload: Payload
        });
    };

    global.TreeNode = TreeNode;

}(this));

