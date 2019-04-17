let _u = {};
export default _u;

_u.checkIsIe9 = function() {
    let isIe9 = false;
    let browser = navigator.appName;
    let b_version = navigator.appVersion;
    let version = b_version.split(';');
    let trim_Version = version[1].replace(/[ ]/g, '');
    if (browser === 'Microsoft Internet Explorer' && trim_Version === 'MSIE9.0') {
        isIe9 = true;
    }
    return isIe9;
};
_u.checkIsIe10 = function() {
    let isIe10 = false;
    let browser = navigator.appName;
    let b_version = navigator.appVersion;
    let version = b_version.split(';');
    let trim_Version = version[1].replace(/[ ]/g, '');
    if (browser === 'Microsoft Internet Explorer' && (trim_Version === 'MSIE10.0')) {
        isIe10 = true;
    }
    return isIe10;
};

_u.checkIsIe11 = function() {
    var isIe11 = navigator.userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/);
    return isIe11;
};

_u.getAbsolute = function(reference, target) {
    //因为我们会将目标元素的边框纳入递归公式中，这里先减去对应的值
    var result = {
        left: -target.clientLeft,
        top: -target.clientTop
    }
    var node = target;
    while (node != reference && node != document && node != null) {
        result.left = result.left + node.offsetLeft + node.clientLeft;
        result.top = result.top + node.offsetTop + node.clientTop;
        node = node.offsetParent;
    }
    if (isNaN(reference.scrollLeft)) {
        result.right = document.documentElement.scrollWidth - result.left;
        result.bottom = document.documentElement.scrollHeight - result.top;
    } else {
        result.right = reference.scrollWidth - result.left;
        result.bottom = reference.scrollHeight - result.top;
    }
    //获取到了要插入元素的位置，left相同。再加上当前元素的高度，就是下拉框的位置
    var targetHeight = target.offsetHeight;
    if (targetHeight) {
        result.top = result.top + targetHeight;
    }
    return result;
}
