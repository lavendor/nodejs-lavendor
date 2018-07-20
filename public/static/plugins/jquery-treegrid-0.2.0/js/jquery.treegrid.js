/*
 * jQuery treegrid Plugin 0.2.0
 * https://github.com/maxazan/jquery-treegrid
 * 
 * Copyright 2013, Pomazan Max
 * Licensed under the MIT licenses.
 */
(function($) {

    var methods = {
        /**
         * Initialize tree
         * 
         * @param {Object} options
         * @returns {Object[]}
         */
        initTree: function(options) {
            var settings = $.extend({}, this.treeGridList.defaults, options);
            return this.each(function() {
                var $this = $(this);
                $this.treeGridList('setTreeContainer', $(this));
                $this.treeGridList('setSettings', settings);
                settings.getRootNodes.apply(this, [$(this)]).treeGridList('initNode', settings);
            });
        },
        /**
         * Initialize node
         * 
         * @param {Object} settings
         * @returns {Object[]}
         */
        initNode: function(settings) {
            return this.each(function() {
                var $this = $(this);
                $this.treeGridList('setTreeContainer', settings.getTreeGridContainer.apply(this));
                $this.treeGridList('getChildNodes').treeGridList('initNode', settings);
                $this.treeGridList('initExpander').treeGridList('initIndent').treeGridList('initEvents').treeGridList('initState').treeGridList("initSettingsEvents");
            });
        },
        /**
         * Initialize node events
         * 
         * @returns {Node}
         */
        initEvents: function() {
            var $this = $(this);
            //Save state on change
            $this.on("change", function() {
                var $this = $(this);
                $this.treeGridList('render');
                if ($this.treeGridList('getSetting', 'saveState')) {
                    $this.treeGridList('saveState');
                }
            });
            //Default behavior on collapse
            $this.on("collapse", function() {
                var $this = $(this);
                $this.removeClass('treegrid-expanded');
                $this.addClass('treegrid-collapsed');
            });
            //Default behavior on expand
            $this.on("expand", function() {
                var $this = $(this);
                $this.removeClass('treegrid-collapsed');
                $this.addClass('treegrid-expanded');
            });

            return $this;
        },
        /**
         * Initialize events from settings
         * 
         * @returns {Node}
         */
        initSettingsEvents: function() {
            var $this = $(this);
            //Save state on change
            $this.on("change", function() {
                var $this = $(this);
                if (typeof ($this.treeGridList('getSetting', 'onChange')) === "function") {
                    $this.treeGridList('getSetting', 'onChange').apply($this);
                }
            });
            //Default behavior on collapse
            $this.on("collapse", function() {
                var $this = $(this);
                if (typeof ($this.treeGridList('getSetting', 'onCollapse')) === "function") {
                    $this.treeGridList('getSetting', 'onCollapse').apply($this);
                }
            });
            //Default behavior on expand
            $this.on("expand", function() {
                var $this = $(this);
                if (typeof ($this.treeGridList('getSetting', 'onExpand')) === "function") {
                    $this.treeGridList('getSetting', 'onExpand').apply($this);
                }

            });

            return $this;
        },
        /**
         * Initialize expander for node
         * 
         * @returns {Node}
         */
        initExpander: function() {
            var $this = $(this);
            var cell = $this.find('td').get($this.treeGridList('getSetting', 'treeColumn'));
            var tpl = $this.treeGridList('getSetting', 'expanderTemplate');
            var expander = $this.treeGridList('getSetting', 'getExpander').apply(this);
            if (expander) {
                expander.remove();
            }
            $(tpl).prependTo(cell).click(function() {
                $($(this).closest('tr')).treeGridList('toggle');
            });
            return $this;
        },
        /**
         * Initialize indent for node
         * 
         * @returns {Node}
         */
        initIndent: function() {
            var $this = $(this);
            $this.find('.treegrid-indent').remove();
            for (var i = 0; i < $(this).treeGridList('getDepth'); i++) {
                $($this.treeGridList('getSetting', 'indentTemplate')).insertBefore($this.find('.treegrid-expander'));
            }
            return $this;
        },
        /**
         * Initialise state of node
         * 
         * @returns {Node}
         */
        initState: function() {
            var $this = $(this);
            if ($this.treeGridList('getSetting', 'saveState') && !$this.treeGridList('isFirstInit')) {
                $this.treeGridList('restoreState');
            } else {
                if ($this.treeGridList('getSetting', 'initialState') === "expanded") {
                    $this.treeGridList('expand');
                } else {
                    $this.treeGridList('collapse');
                }
            }
            return $this;
        },
        /**
         * Return true if this tree was never been initialised
         * 
         * @returns {Boolean}
         */
        isFirstInit: function() {
            var tree = $(this).treeGridList('getTreeContainer');
            if (tree.data('first_init') === undefined) {
                tree.data('first_init', $.cookie(tree.treeGridList('getSetting', 'saveStateName')) === undefined);
            }
            return tree.data('first_init');
        },
        /**
         * Save state of current node
         * 
         * @returns {Node}
         */
        saveState: function() {
            var $this = $(this);
            if ($this.treeGridList('getSetting', 'saveStateMethod') === 'cookie') {

                var stateArrayString = $.cookie($this.treeGridList('getSetting', 'saveStateName')) || '';
                var stateArray = (stateArrayString === '' ? [] : stateArrayString.split(','));
                var nodeId = $this.treeGridList('getNodeId');

                if ($this.treeGridList('isExpanded')) {
                    if ($.inArray(nodeId, stateArray) === -1) {
                        stateArray.push(nodeId);
                    }
                } else if ($this.treeGridList('isCollapsed')) {
                    if ($.inArray(nodeId, stateArray) !== -1) {
                        stateArray.splice($.inArray(nodeId, stateArray), 1);
                    }
                }
                $.cookie($this.treeGridList('getSetting', 'saveStateName'), stateArray.join(','));
            }
            return $this;
        },
        /**
         * Restore state of current node.
         * 
         * @returns {Node}
         */
        restoreState: function() {
            var $this = $(this);
            if ($this.treeGridList('getSetting', 'saveStateMethod') === 'cookie') {
                var stateArray = $.cookie($this.treeGridList('getSetting', 'saveStateName')).split(',');
                if ($.inArray($this.treeGridList('getNodeId'), stateArray) !== -1) {
                    $this.treeGridList('expand');
                } else {
                    $this.treeGridList('collapse');
                }

            }
            return $this;
        },
        /**
         * Method return setting by name
         * 
         * @param {type} name
         * @returns {unresolved}
         */
        getSetting: function(name) {
            if (!$(this).treeGridList('getTreeContainer')) {
                return null;
            }
            return $(this).treeGridList('getTreeContainer').data('settings')[name];
        },
        /**
         * Add new settings
         * 
         * @param {Object} settings
         */
        setSettings: function(settings) {
            $(this).treeGridList('getTreeContainer').data('settings', settings);
        },
        /**
         * Return tree container
         * 
         * @returns {HtmlElement}
         */
        getTreeContainer: function() {
            return $(this).data('treegrid');
        },
        /**
         * Set tree container
         * 
         * @param {HtmlE;ement} container
         */
        setTreeContainer: function(container) {
            return $(this).data('treegrid', container);
        },
        /**
         * Method return all root nodes of tree. 
         * 
         * Start init all child nodes from it.
         * 
         * @returns {Array}
         */
        getRootNodes: function() {
            return $(this).treeGridList('getSetting', 'getRootNodes').apply(this, [$(this).treeGridList('getTreeContainer')]);
        },
        /**
         * Method return all nodes of tree. 
         * 
         * @returns {Array}
         */
        getAllNodes: function() {
            return $(this).treeGridList('getSetting', 'getAllNodes').apply(this, [$(this).treeGridList('getTreeContainer')]);
        },
        /**
         * Mthod return true if element is Node
         * 
         * @returns {String}
         */
        isNode: function() {
            return $(this).treeGridList('getNodeId') !== null;
        },
        /**
         * Mthod return id of node
         * 
         * @returns {String}
         */
        getNodeId: function() {
            if ($(this).treeGridList('getSetting', 'getNodeId') === null) {
                return null;
            } else {
                return $(this).treeGridList('getSetting', 'getNodeId').apply(this);
            }
        },
        /**
         * Method return parent id of node or null if root node
         * 
         * @returns {String}
         */
        getParentNodeId: function() {
            return $(this).treeGridList('getSetting', 'getParentNodeId').apply(this);
        },
        /**
         * Method return parent node or null if root node
         * 
         * @returns {Object[]}
         */
        getParentNode: function() {
            if ($(this).treeGridList('getParentNodeId') === null) {
                return null;
            } else {
                return $(this).treeGridList('getSetting', 'getNodeById').apply(this, [$(this).treeGridList('getParentNodeId'), $(this).treeGridList('getTreeContainer')]);
            }
        },
        /**
         * Method return array of child nodes or null if node is leaf
         * 
         * @returns {Object[]}
         */
        getChildNodes: function() {
            return $(this).treeGridList('getSetting', 'getChildNodes').apply(this, [$(this).treeGridList('getNodeId'), $(this).treeGridList('getTreeContainer')]);
        },
        /**
         * Method return depth of tree.
         * 
         * This method is needs for calculate indent
         * 
         * @returns {Number}
         */
        getDepth: function() {
            if ($(this).treeGridList('getParentNode') === null) {
                return 0;
            }
            return $(this).treeGridList('getParentNode').treeGridList('getDepth') + 1;
        },
        /**
         * Method return true if node is root
         * 
         * @returns {Boolean}
         */
        isRoot: function() {
            return $(this).treeGridList('getDepth') === 0;
        },
        /**
         * Method return true if node has no child nodes
         * 
         * @returns {Boolean}
         */
        isLeaf: function() {
            return $(this).treeGridList('getChildNodes').length === 0;
        },
        /**
         * Method return true if node last in branch
         * 
         * @returns {Boolean}
         */
        isLast: function() {
            if ($(this).treeGridList('isNode')) {
                var parentNode = $(this).treeGridList('getParentNode');
                if (parentNode === null) {
                    if ($(this).treeGridList('getNodeId') === $(this).treeGridList('getRootNodes').last().treeGridList('getNodeId')) {
                        return true;
                    }
                } else {
                    if ($(this).treeGridList('getNodeId') === parentNode.treeGridList('getChildNodes').last().treeGridList('getNodeId')) {
                        return true;
                    }
                }
            }
            return false;
        },
        /**
         * Method return true if node first in branch
         * 
         * @returns {Boolean}
         */
        isFirst: function() {
            if ($(this).treeGridList('isNode')) {
                var parentNode = $(this).treeGridList('getParentNode');
                if (parentNode === null) {
                    if ($(this).treeGridList('getNodeId') === $(this).treeGridList('getRootNodes').first().treeGridList('getNodeId')) {
                        return true;
                    }
                } else {
                    if ($(this).treeGridList('getNodeId') === parentNode.treeGridList('getChildNodes').first().treeGridList('getNodeId')) {
                        return true;
                    }
                }
            }
            return false;
        },
        /**
         * Return true if node expanded
         * 
         * @returns {Boolean}
         */
        isExpanded: function() {
            return $(this).hasClass('treegrid-expanded');
        },
        /**
         * Return true if node collapsed
         * 
         * @returns {Boolean}
         */
        isCollapsed: function() {
            return $(this).hasClass('treegrid-collapsed');
        },
        /**
         * Return true if at least one of parent node is collapsed
         * 
         * @returns {Boolean}
         */
        isOneOfParentsCollapsed: function() {
            var $this = $(this);
            if ($this.treeGridList('isRoot')) {
                return false;
            } else {
                if ($this.treeGridList('getParentNode').treeGridList('isCollapsed')) {
                    return true;
                } else {
                    return $this.treeGridList('getParentNode').treeGridList('isOneOfParentsCollapsed');
                }
            }
        },
        /**
         * Expand node
         * 
         * @returns {Node}
         */
        expand: function() {
            return $(this).each(function() {
                var $this = $(this);
                if (!$this.treeGridList('isLeaf') && !$this.treeGridList("isExpanded")) {
                    $this.trigger("expand");
                    $this.trigger("change");
                }
            });
        },
        /**
         * Expand all nodes
         * 
         * @returns {Node}
         */
        expandAll: function() {
            var $this = $(this);
            $this.treeGridList('getRootNodes').treeGridList('expandRecursive');
            return $this;
        },
        /**
         * Expand current node and all child nodes begin from current
         * 
         * @returns {Node}
         */
        expandRecursive: function() {
            return $(this).each(function() {
                var $this = $(this);
                $this.treeGridList('expand');
                if (!$this.treeGridList('isLeaf')) {
                    $this.treeGridList('getChildNodes').treeGridList('expandRecursive');
                }
            });
        },
        /**
         * Collapse node
         * 
         * @returns {Node}
         */
        collapse: function() {
            return $(this).each(function() {
                var $this = $(this);
                if (!$this.treeGridList('isLeaf') && !$this.treeGridList("isCollapsed")) {
                    $this.trigger("collapse");
                    $this.trigger("change");
                }
            });
        },
        /**
         * Collapse all nodes
         * 
         * @returns {Node}
         */
        collapseAll: function() {
            var $this = $(this);
            $this.treeGridList('getRootNodes').treeGridList('collapseRecursive');
            return $this;
        },
        /**
         * Collapse current node and all child nodes begin from current
         * 
         * @returns {Node}
         */
        collapseRecursive: function() {
            return $(this).each(function() {
                var $this = $(this);
                $this.treeGridList('collapse');
                if (!$this.treeGridList('isLeaf')) {
                    $this.treeGridList('getChildNodes').treeGridList('collapseRecursive');
                }
            });
        },
        /**
         * Expand if collapsed, Collapse if expanded
         * 
         * @returns {Node}
         */
        toggle: function() {
            var $this = $(this);
            if ($this.treeGridList('isExpanded')) {
                $this.treeGridList('collapse');
            } else {
                $this.treeGridList('expand');
            }
            return $this;
        },
        /**
         * Rendering node
         * 
         * @returns {Node}
         */
        render: function() {
            return $(this).each(function() {
                var $this = $(this);

                if ($this.treeGridList('isOneOfParentsCollapsed')) {
                    $this.hide();
                } else {
                    $this.show();
                }
                if (!$this.treeGridList('isLeaf')) {
                    $this.treeGridList('renderExpander');
                    $this.treeGridList('getChildNodes').treeGridList('render');
                }
            });
        },
        /**
         * Rendering expander depends on node state
         * 
         * @returns {Node}
         */
        renderExpander: function() {
            return $(this).each(function() {
                var $this = $(this);
                var expander = $this.treeGridList('getSetting', 'getExpander').apply(this);
                if (expander) {

                    if (!$this.treeGridList('isCollapsed')) {
                        expander.removeClass($this.treeGridList('getSetting', 'expanderCollapsedClass'));
                        expander.addClass($this.treeGridList('getSetting', 'expanderExpandedClass'));
                    } else {
                        expander.removeClass($this.treeGridList('getSetting', 'expanderExpandedClass'));
                        expander.addClass($this.treeGridList('getSetting', 'expanderCollapsedClass'));
                    }
                } else {
                    $this.treeGridList('initExpander');
                    $this.treeGridList('renderExpander');
                }
            });
        }
    };
    $.fn.treeGridList = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.initTree.apply(this, arguments);
        } else {
            $.error('Method with name ' + method + ' does not exists for jQuery.treegrid');
        }
    };
    /**
     *  Plugin's default options
     */
    $.fn.treeGridList.defaults = {
        initialState: 'expanded',
        saveState: false,
        saveStateMethod: 'cookie',
        saveStateName: 'tree-grid-state',
        expanderTemplate: '<span class="treegrid-expander"></span>',
        indentTemplate: '<span class="treegrid-indent"></span>',
        expanderExpandedClass: 'treegrid-expander-expanded',
        expanderCollapsedClass: 'treegrid-expander-collapsed',
        treeColumn: 0,
        getExpander: function() {
            return $(this).find('.treegrid-expander');
        },
        getNodeId: function() {
            var template = /treegrid-([A-Za-z0-9_-]+)/;
            if (template.test($(this).attr('class'))) {
                return template.exec($(this).attr('class'))[1];
            }
            return null;
        },
        getParentNodeId: function() {
            var template = /treegrid-parent-([A-Za-z0-9_-]+)/;
            if (template.test($(this).attr('class'))) {
                return template.exec($(this).attr('class'))[1];
            }
            return null;
        },
        getNodeById: function(id, treegridContainer) {
            var templateClass = "treegrid-" + id;
            return treegridContainer.find('tr.' + templateClass);
        },
        getChildNodes: function(id, treegridContainer) {
            var templateClass = "treegrid-parent-" + id;
            return treegridContainer.find('tr.' + templateClass);
        },
        getTreeGridContainer: function() {
            return $(this).closest('table');
        },
        getRootNodes: function(treegridContainer) {
            var result = $.grep(treegridContainer.find('tr'), function(element) {
                var classNames = $(element).attr('class');
                var templateClass = /treegrid-([A-Za-z0-9_-]+)/;
                var templateParentClass = /treegrid-parent-([A-Za-z0-9_-]+)/;
                return templateClass.test(classNames) && !templateParentClass.test(classNames);
            });
            return $(result);
        },
        getAllNodes: function(treegridContainer) {
            var result = $.grep(treegridContainer.find('tr'), function(element) {
                var classNames = $(element).attr('class');
                var templateClass = /treegrid-([A-Za-z0-9_-]+)/;
                return templateClass.test(classNames);
            });
            return $(result);
        },
        //Events
        onCollapse: null,
        onExpand: null,
        onChange: null

    };
})(jQuery);