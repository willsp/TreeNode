(function(TreeNode) {
    "use strict";

    function addNode(record, nodes) {
        nodes[record[1]] = nodes[record[0]].Add({
            parent: record[0],
            id: record[1],
            text: record[2],
            page_id: (record[3]) ? record[1] : null
        });
    }

    TreeNode.ImportFromSelfRef = function(records) {
        var tree,
            root,
            record,
            tempQueue = [],
            nodes = {}; // Need to be able to reference nodes by old id

        if (records) {
            records = records.split('\n');
            root = records[0].split('\t');

            tree = TreeNode.CreateRoot({
                parent: root[0],
                id: root[1],
                text: root[2],
                page_id: (root[3]) ? root[1] : null
            });

            nodes[root[1]] = tree;

            for (var i = 1, max = records.length; i < max; i++) {
                record = records[i].split('\t');

                if (record[0]) {
                    if (nodes[record[0]]) {
                        addNode(record, nodes);

                        if (tempQueue.length && nodes[tempQueue[0][0]]) {
                            addNode(tempQueue.shift(), nodes);
                        }
                            
                    } else {
                        tempQueue.push(record);
                    }
                }
            }

            return tree;
        }

    };

}(this.TreeNode));
