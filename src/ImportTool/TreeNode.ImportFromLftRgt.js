(function(TreeNode) {
    "use strict";

    TreeNode.ImportFromLftRgt = function(records) {
        var tree,
            root,
            record,
            payload;

        if (records) {
            records = records.split('\n');

            for (var i = 0, max = records.length; i < max; i++) {
                record = records[i].split('\t');
                payload = {
                    id: record[0],
                    text: record[1],
                    lft: record[2],
                    rgt: record[3],
                    url: (record[5] === "NULL") ? null : record[5],
                    page_id: (record[4] === "NULL") ? null : record[4]
                };

                if (tree) {
                    // TODO: This works great, as long as the records are in order... arg
                    // if record.lft > parent.rgt we got the wrong parent.
                    while (record[2] > parseInt(tree.data.rgt, 10)) {
                        tree = tree.parent;
                    }

                    tree = tree.add(new TreeNode(payload));
                } else {
                    tree = new TreeNode(payload);
                    root = tree;
                }
            }
        }

        return root;
    };
}(this.TreeNode));

