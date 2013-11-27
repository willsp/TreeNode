/*global TreeNode, describe, it, expect, beforeEach*/

describe("ExportInserts Suite", function() {
    "use strict";

    var root, rootPayload,
        child1, child1Payload,
        child1_1, child1_1Payload,
        child2, child2Payload,
        child2_1, child2_1Payload,
        child2_2, child2_2Payload;

    beforeEach(function() {
        rootPayload = {text: 'Root', page_id: null};
        root = new TreeNode(rootPayload);
        
        child1Payload = {text: 'Child 1', page_id: null};
        child1 = root.add(new TreeNode(child1Payload));

        child1_1Payload = {text: 'Child 1-1', page_id: 1};
        child1_1 = child1.add(new TreeNode(child1_1Payload));

        child2Payload = {text: 'Child 2', page_id: null};
        child2 = root.add(new TreeNode(child2Payload));

        child2_1Payload = {text: 'Child 2-1', page_id: 2};
        child2_1 = child2.add(new TreeNode(child2_1Payload));

        child2_2Payload = {text: 'Child 2-2', page_id: 3};
        child2_2 = child2.add(new TreeNode(child1_1Payload));
    });

    it("Can return insert statements in a string", function() {
        var inserts = root.ExportInserts(),
			statement = inserts.Statement();


        expect(statement).toBeDefined();
		expect(statement).toMatch(/'Child 2',6,11,NULL/);
		expect(statement).toMatch(/'Child 2-1',7,8,2/);
    });
});

