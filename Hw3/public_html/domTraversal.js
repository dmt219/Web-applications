            
var domTraversal = function traverse(node, foo) {
    foo(node);
    var ul = $("ul");
    node = node.firstChild;
    while (node) {
        traverse(node, foo);
        node = node.nextSibling;
    }
};
$(function(){
domTraversal(document.body, function(node) {
    if(node.nodeType == 1){
        nodeInfo = $.parseHTML(node.nodeName + '(' + node.firstChild.nodeValue+ ')');
        var ul = $("<ul>");
        var li = $("<li>");s
        li.append(nodeInfo);
        ul.append(li);
        $("body").append(ul);
    }
});


});