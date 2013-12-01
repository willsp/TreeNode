/*global TreeNode, describe, it, xit, expect*/

/*
 * @venus-library jasmine
 * @venus-include src/main/webapp/wsm/js/menuDemo/TreeNode.js
 */

describe('TreeNode class', function() {
    'use strict';

    it('returns a TreeNode object', function() {
        var tn = new TreeNode();

        expect(tn.constructor.name).toBe('TreeNode');
    });

    it('sets the data to the object that is passed in', function() {
        var data = {
            name: 'root1'
        };
        var tn = new TreeNode(data);

        expect(tn.data).toBe(data);
    });

    it('has 0 children by default', function() {
        var tn = new TreeNode();

        expect(tn.children.length).toBe(0);
    });

    it('allows you to add children which will also be TreeNodes', function() {
        var tn = new TreeNode();
        var child = tn.add(new TreeNode({name: 'child1'}));

        
        expect(tn.children.length).toBe(1);
        expect(tn.children[0]).toBe(child);
    });

    xit('does NOT allow you to add objects which are not tree nodes to the children', function() {
        var tn = new TreeNode();
        var addChild = function() {
            tn.add({});
        };

        expect(addChild).toThrow();
    });

    xit('does not allow you to add objects directly to the array returned by children', function() {
        var tn = new TreeNode();
        var child = tn.add(new TreeNode());
        var children = tn.children;

        children.push({});
        children[0] = "Something else";

        expect(tn.children.length).toBe(1);
        expect(tn.children[0]).toBe(child);
    });

    it('allows removal of children', function() {
        var tn = new TreeNode();
        var child = tn.add(new TreeNode());

        expect(tn.children.length).toBe(1);

        var removed = tn.remove(child);

        expect(tn.children.length).toBe(0);
        expect(removed).toBe(child);
    });

    it('allows insertion into children', function() {
        var tn = new TreeNode();
        var child = tn.add(new TreeNode());

        expect(tn.children[0]).toBe(child);
        
        var child1 = tn.insertBefore(new TreeNode(), child);

        expect(tn.children[0]).toBe(child1);
        expect(tn.children[1]).toBe(child);
    });

    it('has a reference to the parent object or null', function() {
        var tn = new TreeNode();
        var child = tn.add(new TreeNode());

        expect(child.getParent()).toBe(tn);
        expect(tn.getParent()).toBeNull();
    });
});
