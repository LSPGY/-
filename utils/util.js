const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function pares(e){
  let row
  let col
  if(e[0].length==2){
    row = Number(e[0].charAt(0)) 
    col = Number(e[0].charAt(1))
  } else if (e[0].length == 3){
    row = Number(e[0].charAt(0) + e[0].charAt(1))
    col = Number(e[0].charAt(2))
  }
   
  return  { row: row, col: col,value:e[1] };
}
function arryigf(e){
  let p = []
  let a = e.row
  let b = e.col
  let c = e.value
  p.push(a + "" + b)
  p.push(c)
  return p;
}
//同一行或者同一列 中间是否有不为空的（-1）
function ljpd(hs,sr,er,c,list){
  if (sr>er){
    let tmp=sr
    sr=er;
    er=tmp;
  }
  if (er-sr==1){
    return true
  }
  for(let i=0;i<er-sr-1;i++){
    if (hs == "h" && list[parseInt(c)][i + parseInt(sr) + 1][1] != -1){
      return false;
    }
    if (hs == "s" && list[i + parseInt(sr) + 1][parseInt(c)][1] != -1) {
      return false;
    }
  }
  return true  
}
//判断是否在同一行或者同一列 且不是同一位置的
function wgd(star,end,list){
  let _star = pares(star)
  let _end = pares(end)
  if (_star.value==_end.value){
    if (_star.row == _end.row && _star.col != _end.col) {
      return ljpd("h", _star.col, _end.col, _star.row,list)
    } else if (_star.row != _end.row && _star.col == _end.col){
      return ljpd("s", _star.row, _end.row, _star.col, list)
    }else{
      return false
    }
  }
  
}
//判断某点是否为空
function pdgd(gd,list){
  if(list[gd.row][gd.col][1]==-1){
    return true
  }else{
    return false
  }
}
//一个拐点
function onegd(star, end, list){
  let _star = pares(star)
  let _end = pares(end)
  if (_star.value == _end.value) {
    let gd1 = { row: 0 , col: 0 , value : "" }
    let gd2 = { row: 0 , col: 0 , value : "" }
    gd1.row = _star.row
    gd1.col = _end.col
    gd1.value = _star.value
    gd2.row = _end.row
    gd2.col = _star.col
    gd2.value = _star.value
    if (pdgd(gd1,list)){
      if (wgd(arryigf(gd1), star, list) && wgd(arryigf(gd1), end, list)){
        return true
       }
    } else if (pdgd(gd2, list)){
      if (wgd(arryigf(gd2), star, list) && wgd(arryigf(gd2), end, list)) {
        return true
      }
    }else{
      return false
    }  
  }else{
    return false
  }
}

//两个拐点
function twogd(star, end, list) {
  let _star = pares(star)
  let _end = pares(end)
  for (let i1 = 0; i1 < 10; i1++) {
    let g1 = _star
    let g2 = _end
    if (g1.row == i1 || g2.row == i1){
      continue
    }
    g1.col = i1
    g2.col = i1
    console.log(g1)
    console.log(g2)
    let p1 = wgd(arryigf(g1), arryigf(g2), list)
    let p2 = wgd(arryigf(g1), star, list)
    let p3 = wgd(arryigf(g2), end, list)
    console.log("第一"+"p1:" + p1 + "    p2:" + p2 + "    p3:" + p3)
    if (p1 && p2 && p3) {
      return true
    }
  }
  for (let i2 = 0; i2 < 11; i2++) {
    let g1 = pares(star)
    let g2 = pares(end)
    if (g1.col == i2 || g2.col == i2) {
      continue
    }
    g1.row = i2
    g2.row = i2
    let p1 = wgd(arryigf(g1), arryigf(g2), list)
    let p2 = wgd(arryigf(g1), star, list)
    let p3 = wgd(arryigf(g2), end, list)
    console.log(g1)
    console.log(g2)
    console.log("第二"+"p1:"+p1+"    p2:"+p2+"    p3:"+p3)
    if (p1 && p2 && p3) {
      return true
    }
    console.log(g1)
    console.log(g2)
  }
}

//消除判断成功，消除两个方块
function xc(star, end, list){
  let _star = pares(star)
  let _end = pares(end)
  star[1]=-1
  end[1]=-1
  list[_star.row][_star.col] = star 
  list[_end.row][_end.col] = end
  return list
}

module.exports = {
  formatTime: formatTime,
  pares:pares,
  xc: xc,
  wgd: wgd,
  onegd: onegd,
  twogd: twogd
}
