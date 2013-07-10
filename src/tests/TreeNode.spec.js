/*global TreeNode, describe, it, expect*/

describe("TreeNode suite basics", function() {
    "use strict";

    it("Can create root node", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj);

        expect(node).not.toBe(null);
        expect(node.Payload()).toBe(obj);
    });

    it("Can add child node", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj);

        expect(node.Children(0)).toBe(childNode);
    });

    it("Can insert a node before a child", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj);

        var newChild = {text: "new child"},
            newChildNode = node.InsertBefore(newChild, childNode);

        expect(node.Children(0)).toBe(newChildNode);
        expect(node.Children(1)).toBe(childNode);
    });

    it("Can insert a node as the last node using length", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj);

        var newChild = {text: "new child"},
            newChildNode = node.Add(newChild, 1);

        expect(node.Children(0)).toBe(childNode);
        expect(node.Children(1)).toBe(newChildNode);
    });

    it("Can insert a node that is TreeNode before a child", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj);

        var removed = node.Remove(childNode),
            obj2 = {text: 'Root2'},
            tree2 = TreeNode.CreateRoot(obj2),
            child2Obj = {text: "Child2"},
            child2Node = tree2.Add(child2Obj),
            childNode2 = tree2.Add(removed, 0);

        expect(tree2.Children(0)).toBe(childNode);
        expect(tree2.Children(1)).toBe(child2Node);
    });

    it("Can add a child node that is already a TreeNode", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj);

        expect(node.Children(0)).toBe(childNode);

        var removed = node.Remove(childNode),
            obj2 = {text: 'Root2'},
            tree2 = TreeNode.CreateRoot(obj2),
            childNode2 = tree2.Add(removed);

        expect(tree2.Children(0)).toBe(childNode2);
        expect(removed).toBe(childNode);
        expect(childNode2).toBe(childNode);
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

    it("Can remove a child node", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj);

        var removed = node.Remove(childNode);
        expect(node.Children().length).toBe(0);
        expect(removed).toBe(childNode);
    });

    it("Returns undefined if Remove is unsuccessful", function() {
        var obj = {text: 'Root'},
            node = TreeNode.CreateRoot(obj),
            childObj = {text: "Child"},
            childNode = node.Add(childObj);

        var removed = node.Remove(childObj);
        expect(node.Children().length).toBe(1);
        expect(node.Children(0)).toBe(childNode);
        expect(removed).toBeUndefined();
    });
});

