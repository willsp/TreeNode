/*global TreeNode, describe, it, expect*/

describe("Import From Self Reference Table", function() {
    "use strict";

    var test = "0	1	Root	\n" +
        "1	2	Child1	http://www.example.com/\n" +
        "1	3	Child2	\n" +
        "3	4	Child2_1	http://www.example.com/1\n",
        test2 = "0	1	Root	\n" +
        "1	2	Child1	http://www.example.com/\n" +
        "3	4	Child2_1	http://www.example.com/1\n" +
        "1	3	Child2	\n";

    it("Can build a tree from self referenced tables", function() {
        var tree = TreeNode.ImportFromSelfRef(test);

        test = test.split('\n');

        expect(tree).toBeDefined();
        expect(tree.data.text).toBe(test[0].split('\t')[2]);
        expect(tree.data.page_id).toBeNull();
        expect(tree.children[0].data.text).toBe(test[1].split('\t')[2]);
        expect(tree.children[0].data.page_id).toBe(test[1].split('\t')[1]);
        expect(tree.children[1].data.text).toBe(test[2].split('\t')[2]);
        expect(tree.children[1].data.page_id).toBeNull();
        expect(tree.children[1].children[0].data.text).toBe(test[3].split('\t')[2]);
        expect(tree.children[1].children[0].data.page_id).toBe(test[3].split('\t')[1]);
    });

    it("Won't fail when a child comes before a parent", function() {
        var tree = TreeNode.ImportFromSelfRef(test2);

        test2 = test2.split('\n');

        expect(tree).toBeDefined();
        expect(tree.data.text).toBe(test2[0].split('\t')[2]);
        expect(tree.data.page_id).toBeNull();
        expect(tree.children[0].data.text).toBe(test2[1].split('\t')[2]);
        expect(tree.children[0].data.page_id).toBe(test2[1].split('\t')[1]);
        expect(tree.children[1].data.text).toBe(test2[3].split('\t')[2]);
        expect(tree.children[1].data.page_id).toBeNull();
        expect(tree.children[1].children[0].data.text).toBe(test2[2].split('\t')[2]);
        expect(tree.children[1].children[0].data.page_id).toBe(test2[2].split('\t')[1]);
    });
});

