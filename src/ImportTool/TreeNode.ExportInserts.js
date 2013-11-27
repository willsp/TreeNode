(function(TreeNode) {
    'use strict';

    TreeNode.prototype.ExportInserts = function(options) {
        options = options || {};
        options.context = this;

        return new TreeNode.InsertWriter(options);
    };

    TreeNode.InsertWriter = function(options) {
        if (!(this instanceof TreeNode.InsertWriter)) {
            return new TreeNode.InsertWriter(options);
        }

        var context = options.context,
            statementPrefix = 'INSERT INTO `nav` (`name`, `lft`, `rgt`, `page_id`, `url`)\n' +
                     'VALUES',
            statementPostfix = ';',
            statement;

        this.Statement = function() {
            return statement;
        };

        this.Context = function() {
            return context;
        };

        if (context.Lft === undefined) {
            context.Decorate('LftRgt');
        }

        this.rows = [];
        writeRows(this, this.Context());

        statement = statementPrefix + this.rows.join(',') + statementPostfix;

        return this;
    };

    function writeRows(context, tree) {
        var rowPrefix = '\n(',
            rowPostfix = ')';

        context.rows.push(rowPrefix + [
            '\'' + tree.data.text + '\'',
            tree.Lft,
            tree.Rgt,
            tree.data.page_id || 'NULL',
            tree.data.url || 'NULL'
        ].join(',') + rowPostfix);

        for (var i = 0, max = tree.children.length; i < max; i++) {
            writeRows(context, tree.children[i]);
        }
    }

}(this.TreeNode));

