const $siteList = $('.siteList')
const $lastList = $siteList.find('li.lastList')
const x = localStorage.getItem('x')
// console.log(x)
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {
        logo: 'A', url: 'https://acfan.cn'
    },
    {
        logo: 'B', url: 'https://bilibili.com'
    }
];
const simplyfyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www', '').replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.lastList)').remove()
    hashMap.forEach((node, index) => {
        console.log(index)
        const $li = $(`
        <li>
           <div class="site">
               <div class="logo">${node.logo}</div>
               <div class="link">${simplyfyUrl(node.url)}</div>
               <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>   
               </div>
           </div>
       </li>
   `).insertBefore($lastList)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            console.log('这里')
            e.stopPropagation()
            console.log(hashMap)
            hashMap.splice(index, 1)
            render()
        })
    });

}

render();
$('div.addButton').on(('click'), () => {
    //console.log(1) //测试点击生效
    let url = window.prompt('您想添加的网址是什么？');
    if (url.indexOf('http' !== 0)) {
        url = 'https://' + url
    }
    // console.log(url)
    hashMap.push({
        logo: simplyfyUrl(url)[0].toUpperCase(),
        url: url
    });
    render();
})
window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    // console.log(string)
    localStorage.setItem('x', string)
}
$(document).on('keypress',(e)=>{
    // console.log('das')
    const key=e.key
    for(i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})