/*global TreeNode, describe, it, expect*/

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
            child1 = tree.Children(0),
            child1_1 = child1.Children(0),
            child1_1_1 = child1_1.Children(0),
            child1_1_2 = child1_1.Children(1),
            child2 = tree.Children(1),
            child2_1 = child2.Children(0);

        test = test.split('\n');

        expect(tree).toBeDefined();
        expect(tree.Payload().text).toBe(getRecord(0, 'text'));
        expect(tree.Payload().page_id).toBeNull();
        expect(child1.Payload().text).toBe(getRecord(1, 'text'));
        expect(child1.Payload().page_id).toBeNull();
        expect(child1_1.Payload().text).toBe(getRecord(2, 'text'));
        expect(child1_1.Payload().page_id).toBeNull();
        expect(child1_1_1.Payload().text).toBe(getRecord(3, 'text'));
        expect(child1_1_1.Payload().page_id).toBe(getRecord(3, 'page_id'));
        expect(child1_1_2.Payload().text).toBe(getRecord(4, 'text'));
        expect(child1_1_2.Payload().page_id).toBe(getRecord(4, 'page_id'));
        expect(child2_1.Payload().text).toBe(getRecord(6, 'text'));
        expect(child2_1.Payload().page_id).toBe(getRecord(6, 'page_id'));
    });
});
