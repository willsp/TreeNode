(function(TreeNode) {
    'use strict';

    TreeNode.ImportFromJSON = function(init) {
        if (init) {
            var tree = new TreeNode();
            var data = init.data;
            var i, max;

            var childKey = init.childKey || 'children';
            var textKey = init.textKey || 'text';
            var urlKey = init.urlKey || 'url';
            
            tree.data = tree.data || {};

            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    switch (prop) {
                        case childKey:
                            for (i = 0, max = data[prop].length; i < max; i++) {
                                tree.add(TreeNode.ImportFromJSON({
                                    data: data[prop][i],
                                    childKey: childKey,
                                    textKey: textKey,
                                    urlKey: urlKey
                                }));
                            }
                            break;
                        case textKey:
                            tree.data.text = data[prop];
                            break;
                        case urlKey:
                            tree.data.url = data[prop];
                            break;
                        default:
                            tree.data[prop] = data[prop];
                    }
                }
            }

            return tree;
        }
    };
}(window.TreeNode));
