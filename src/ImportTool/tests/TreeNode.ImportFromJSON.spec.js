/*global TreeNode, describe, it, expect, beforeEach*/

describe('TreeNode.importFromJSON class', function() {
    'use strict';

    var testData = {
        "Children": [
            {
            "Children": [
                {
                "Children": [],
                "Original": [
                    "Home",
                    3,
                    4,
                    null,
                    "~/"
                ],
                "Text": "Home",
                "Url": "~/"
            },
            {
                "Children": [
                    {
                    "Children": [],
                    "Original": [
                        "Assessor",
                        6,
                        7,
                        null,
                        "~/assessor/"
                    ],
                    "Text": "Assessor",
                    "Url": "~/assessor/"
                },
                {
                    "Children": [],
                    "Original": [
                        "Board of Supervisors",
                        8,
                        9,
                        null,
                        "~/bos/"
                    ],
                    "Text": "Board of Supervisors",
                    "Url": "~/bos/"
                }
                ],
                "Text": "Elected Officials"
            }
            ],
            "Text": "Main"
        }
        ],
        "Text": "County"
    };

    it('returns a TreeNode object', function() {
        var target = new TreeNode.ImportFromJSON({
            data: testData,
            childKey: 'Children'
        });

        expect(target).toBeDefined();
        expect(target.constructor.name).toBe('TreeNode');
    });

    it('moves the children into the proper container', function() {
        var target = new TreeNode.ImportFromJSON({
            data: testData,
            childKey: 'Children'
        });

        expect(target.children.length).toBe(1);
    });

    it('moves the childrens children into the proper container', function() {
        var target = new TreeNode.ImportFromJSON({
            data: testData,
            childKey: 'Children'
        });

        expect(target.children[0].children.length).toBe(2);
    });
        
});

