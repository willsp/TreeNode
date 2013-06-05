/*global TreeNode, describe, it, expect*/

describe("TreeNode suite basics", function() {
    "use strict";

    it("Can create root node", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj);

        expect(node).not.toBe(null);
        expect(node.Payload()).toBe(obj);
        expect(node.Parent()).toBe(null);
    });

    it("Can add child node", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj);

        expect(node.Children(0)).toBe(childNode);
    });

    it("Can return the length of children", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj),
            child2Obj = {text: "Child2"},
            child2Node = node.Add(child2Obj);

        expect(node.Children().length).toBe(2);
        expect(node.Children(0)).toBe(childNode);
        expect(node.Children(1)).toBe(child2Node);
    });
});

