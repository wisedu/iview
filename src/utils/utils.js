let _u = {};
export default _u;

_u.checkIsIe9 = function () {
    let isIe9 = false;
    let browser=navigator.appName;
    let b_version=navigator.appVersion;
    let version=b_version.split(';');
    let trim_Version=version[1].replace(/[ ]/g,'');
    if(browser === 'Microsoft Internet Explorer' && trim_Version === 'MSIE9.0') {
        isIe9 = true;
    }
    return isIe9;
};
