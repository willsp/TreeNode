/*global TreeNode, TreeNode_LftRgt, describe, it, expect, beforeEach*/

describe("TreeNode_LftRgt Decorator Suite", function() {
    "use strict";

    var root, rootPayload,
        child1, child1Payload,
        child1_1, child1_1Payload,
        child2, child2Payload,
        child2_1, child2_1Payload,
        child2_2, child2_2Payload;

    beforeEach(function() {
        rootPayload = {text: 'Root'};
        root = TreeNode.CreateRoot(rootPayload);
        
        child1Payload = {text: 'Child 1'};
        child1 = root.Add(child1Payload);

        child1_1Payload = {text: 'Child 1-1'};
        child1_1 = child1.Add(child1_1Payload);

        child2Payload = {text: 'Child 2'};
        child2 = root.Add(child2Payload);

        child2_1Payload = {text: 'Child 2-1'};
        child2_1 = child2.Add(child2_1Payload);

        child2_2Payload = {text: 'Child 2-2'};
        child2_2 = child2.Add(child1_1Payload);
    });

    it("Can decorate a TreeNode with Lft and Rgt Attributes", function() {
        var decorator = root.Decorate('LftRgt'),
            DecoratedTree = decorator.Context();

        expect(DecoratedTree).toBeDefined();
        expect(DecoratedTree).not.toBe(null);
        expect(DecoratedTree).toBe(root);
        expect(DecoratedTree.Lft).toBe(1);
        expect(DecoratedTree.Children(0).Lft).toBe(2);
        expect(DecoratedTree.Children(0).Children(0).Lft).toBe(3);
        expect(DecoratedTree.Children(0).Children(0).Rgt).toBe(4);
        expect(DecoratedTree.Children(0).Rgt).toBe(5);
        expect(DecoratedTree.Children(1).Lft).toBe(6);
        expect(DecoratedTree.Children(1).Children(0).Lft).toBe(7);
        expect(DecoratedTree.Children(1).Children(0).Rgt).toBe(8);
        expect(DecoratedTree.Children(1).Children(1).Lft).toBe(9);
        expect(DecoratedTree.Children(1).Children(1).Rgt).toBe(10);
        expect(DecoratedTree.Children(1).Rgt).toBe(11);
        expect(DecoratedTree.Rgt).toBe(12);
    });

    it("Can start the Lft values with any number", function() {
        var decorator = root.Decorate('LftRgt', {index: 100}),
            DecoratedTree = decorator.Context();

        expect(DecoratedTree).toBeDefined();
        expect(DecoratedTree).not.toBe(null);
        expect(DecoratedTree).toBe(root);
        expect(DecoratedTree.Lft).toBe(100);
        expect(DecoratedTree.Children(0).Lft).toBe(101);
        expect(DecoratedTree.Children(0).Children(0).Lft).toBe(102);
        expect(DecoratedTree.Children(0).Children(0).Rgt).toBe(103);
        expect(DecoratedTree.Children(0).Rgt).toBe(104);
        expect(DecoratedTree.Children(1).Lft).toBe(105);
        expect(DecoratedTree.Children(1).Children(0).Lft).toBe(106);
        expect(DecoratedTree.Children(1).Children(0).Rgt).toBe(107);
        expect(DecoratedTree.Children(1).Children(1).Lft).toBe(108);
        expect(DecoratedTree.Children(1).Children(1).Rgt).toBe(109);
        expect(DecoratedTree.Children(1).Rgt).toBe(110);
        expect(DecoratedTree.Rgt).toBe(111);
    });

    it("Can start the Lft values with 0", function() {
        var decorator = root.Decorate('LftRgt', {index: 0}),
            DecoratedTree = decorator.Context();

        expect(DecoratedTree).toBeDefined();
        expect(DecoratedTree).not.toBe(null);
        expect(DecoratedTree).toBe(root);
        expect(DecoratedTree.Lft).toBe(0);
        expect(DecoratedTree.Children(0).Lft).toBe(1);
        expect(DecoratedTree.Children(0).Children(0).Lft).toBe(2);
        expect(DecoratedTree.Children(0).Children(0).Rgt).toBe(3);
        expect(DecoratedTree.Children(0).Rgt).toBe(4);
        expect(DecoratedTree.Children(1).Lft).toBe(5);
        expect(DecoratedTree.Children(1).Children(0).Lft).toBe(6);
        expect(DecoratedTree.Children(1).Children(0).Rgt).toBe(7);
        expect(DecoratedTree.Children(1).Children(1).Lft).toBe(8);
        expect(DecoratedTree.Children(1).Children(1).Rgt).toBe(9);
        expect(DecoratedTree.Children(1).Rgt).toBe(10);
        expect(DecoratedTree.Rgt).toBe(11);
    });

});

