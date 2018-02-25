export const isScrollReachedBottom  = (ratioToStartLoadAsync = 1/10) => {
    let windowHeight = ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight),
        html = document.documentElement,
        docHeight = Math.max.call(this, html.clientHeight,  html.scrollHeight, html.offsetHeight),
        windowBottom = windowHeight + window.pageYOffset;
    return ( (Math.max(windowBottom,docHeight) - Math.min(windowBottom,docHeight) < (docHeight * ratioToStartLoadAsync))
            || (windowBottom <= Math.cbrt(docHeight)/2)
    );
}