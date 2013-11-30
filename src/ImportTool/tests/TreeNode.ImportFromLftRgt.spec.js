/*global TreeNode, describe, it, expect, beforeEach*/

describe("Import From LftRgt Table", function() {
    "use strict";
    var getRecord,
        test = "1	Root	0	13	NULL\n" +
               "2	Child1	1	8	NULL\n" +
               "3	Child1_1	2	7	NULL\n" +
               "4	Child1_1_1	3	4	1\n" +
               "5	Child1_1_2	5	6	2\n" +
               "6	Child2	9	12	NULL\n" +
               "7	Child2_1	10	11	3";

    beforeEach(function() {
        function get(record, field) {
            var fieldnum;

            switch (field) {
                case 'text':
                    fieldnum = 1;
                    break;
                case 'page_id':
                    fieldnum = 4;
                    break;
            }

            return test[record].split('\t')[fieldnum];
        }

        getRecord = get;
    });

    it("Returns a TreeNode", function() {
        var tree = TreeNode.ImportFromLftRgt(test);
        
        expect(tree).toBeDefined();
        expect(tree.constructor.name).toBe('TreeNode');
    });

    it("Can build a tree from LftRgt tables", function() {
        var tree = TreeNode.ImportFromLftRgt(test),
            child1 = tree.children[0],
            child1_1 = child1.children[0],
            child1_1_1 = child1_1.children[0],
            child1_1_2 = child1_1.children[1],
            child2 = tree.children[1],
            child2_1 = child2.children[0];

        test = test.split('\n');

        expect(tree).toBeDefined();
        expect(tree.data.text).toBe(getRecord(0, 'text'));
        expect(tree.data.page_id).toBeNull();
        expect(child1.data.text).toBe(getRecord(1, 'text'));
        expect(child1.data.page_id).toBeNull();
        expect(child1_1.data.text).toBe(getRecord(2, 'text'));
        expect(child1_1.data.page_id).toBeNull();
        expect(child1_1_1.data.text).toBe(getRecord(3, 'text'));
        expect(child1_1_1.data.page_id).toBe(getRecord(3, 'page_id'));
        expect(child1_1_2.data.text).toBe(getRecord(4, 'text'));
        expect(child1_1_2.data.page_id).toBe(getRecord(4, 'page_id'));
        expect(child2_1.data.text).toBe(getRecord(6, 'text'));
        expect(child2_1.data.page_id).toBe(getRecord(6, 'page_id'));
    });
});
