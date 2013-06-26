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
                    page_id: (record[4] === "NULL") ? null : record[4]
                };

                if (tree) {
                    // if record.lft > parent.rgt we got the wrong parent.
                    while (record[2] > parseInt(tree.Payload().rgt, 10)) {
                        tree = tree.Parent();
                    }

                    tree = tree.Add(payload);
                } else {
                    tree = TreeNode.CreateRoot(payload);
                    root = tree;
                }
            }
        }

        return root;
    };
}(this.TreeNode));
