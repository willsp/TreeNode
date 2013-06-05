(function (TreeNode) {
    "use strict";

    TreeNode.LftRgt = function (options) {
        if (!(this instanceof TreeNode.LftRgt)) {
            return new TreeNode.LftRgt(options);
        }

        var context,
            currIndex;

        if (!(options && options.context && options.context instanceof TreeNode)) {
            return null;
        }

        this.Context = function() {
            return context;
        };

        this.CurrentIndex = function() {
            return currIndex++;
        };

        context = options.context;
        currIndex = (options.index || options.index === 0) ? options.index : 1;
        
        decorateChild(this.Context(), this);

        return this;
    };

    function decorateChild(treeNode, context) {
        treeNode.Lft = context.CurrentIndex();

        for (var i = 0, max = treeNode.Children().length; i < max; i++) {
            decorateChild(treeNode.Children(i), context);
        }

        treeNode.Rgt = context.CurrentIndex();
    }

}(this.TreeNode));

