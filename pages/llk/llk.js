// pages/llk/llk.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    itm:[],
    new:"",
    old:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let difficulty="";
    let i1=0;
    let i2=0;
    let itm=[];
    if (difficulty=="简单"){
      i1=12;
      i2=6;
    } else if (difficulty == "中等"){
      i1=8;
      i2=9;
    }else{
      i1=12;
      i2=6;
    }
    
      for( let i=0;i<i2;i++){
        for ( let a=0; a < i1; a++) {
            itm.push(a);
        }
      }
      console.log(itm)
    Array.prototype.shuffle = function () {
      var input = this;

      for (var i = input.length - 1; i >= 0; i--) {

        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
      }
      return input;
    }
    itm.shuffle()
    let list=[];
    for(let i3=0;i3<11;i3++){
      let t=[]
      if (i3==0||i3==10){
        for(let i = 0; i < 10; i++){
          let tmp=[]
          tmp.push(i3 + "" + i)
          tmp.push(-1);
          t.push(tmp);
        }
     }else {
        for (let i = 0; i < 10; i++) {
          if (i == 0 || i == 9) {
            let tmp3=[]
            tmp3.push(i3 + "" + i)
            tmp3.push(-1)
            t.push(tmp3)
            continue
          }
          let tmp = itm.slice(0, 8)[i - 1]
          let tmp2 = []
          tmp2.push(i3 + "" + i)
          tmp2.push(tmp)
          t.push(tmp2)
        }
        itm.splice(0, 8)
     } 
      list.push(t)
      
    }
    console.log(list)
      this.setData({
        list:list
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  danji(e){
    let i = this.data.new
    this.setData({
      new: e.target.dataset["in"]
    })
    let a = e.target.dataset["in"][0]
    console.log(a)
    if(i&&i[0]!=a){
     let bl= utils.wgd(i, e.target.dataset["in"], this.data.list)
      console.log(bl) 
      if(bl){
        let l=utils.xc(i, this.data.new, this.data.list)
        this.setData({
          list: l,
        })
      } else if (utils.onegd(i, e.target.dataset["in"], this.data.list)){
        let l = utils.xc(i, this.data.new, this.data.list)
        this.setData({
          list: l,
        })
      } else if (utils.twogd(i, e.target.dataset["in"], this.data.list)){
        let l = utils.xc(i, this.data.new, this.data.list)
        this.setData({
          list: l,
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})