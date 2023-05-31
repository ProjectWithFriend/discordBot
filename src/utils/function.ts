export function randomColor4Chat() : number{
    //hex color code without #
    const hex = '0123456789ABCDEF'
    let color = '#'
    for(let i = 0; i < 6; i++){
        color += hex[Math.floor(Math.random() * 16)]
    }
    return parseInt(color.replace('#', ''), 16)
}