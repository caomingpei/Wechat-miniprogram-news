var typeindex = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Tabs: [//类别栏
      { text: '国内', type: 'gn', select: 'selected', selectLine: 'selectedLine', num: 0 },
      { text: '国际', type: 'gj', select: '', selectLine: '', num: 1 },
      { text: '财经', type: 'cj', select: '', selectLine: '', num: 2 },
      { text: '娱乐', type: 'yl', select: '', selectLine: '', num: 3 },
      { text: '军事', type: 'js', select: '', selectLine: '', num: 4 },
      { text: '体育', type: 'ty', select: '', selectLine: '', num: 5 },
      { text: '其他', type: 'other', select: '', selectLine: '', num: 6 }
    ],
    top: {},//顶部新闻
    newsList: []//列表新闻
  },

 // 设置新闻数据
  setNewsData(result) {
    let newsList = []
    let listLength = 0
    listLength = result.length
    for (var i = 1; i < listLength; i++) {
      let temp = result[i]
      temp.date = temp.date.slice(11, 16)
      newsList.push(temp)
    }
    let top = {}
    top = result[0]
    top.date = top.date.slice(11, 16)
    this.setData({
      top: top,
      newsList: newsList
    })
  },
  // 获取最新新闻
  getLatestNews(index,callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data:{
        "type": this.data.Tabs[index].type
      },
      success: res => {
        let result = res.data.result
        this.setNewsData(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  //下拉刷新和结束刷新
  onPullDownRefresh() {
    this.getLatestNews(typeindex, () => {
      wx.stopPullDownRefresh()
    })
  },

  //点按新闻类别时触发函数
  onNewsTabsTap(event) {
    typeindex = event.currentTarget.dataset.type
    this.setNewsTabsStyle()
    this.getLatestNews(typeindex)
  },

  //点击新闻时触发函数
  onNewsTap(event) {
    let id = event.currentTarget.dataset.type
    let Tabs = this.data.Tabs[typeindex].type
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  //设置类别栏的样式
  setNewsTabsStyle() {
    let Tabs = []
    for (let i = 0; i < 7; i++) {
      let temp = this.data.Tabs[i]
      temp.select = ''
      temp.selectLine = ''
      Tabs.push(temp)
    }
    Tabs[typeindex].select = 'selected'
    Tabs[typeindex].selectLine = 'selectedLine'
    this.setData({
      Tabs: Tabs
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getLatestNews(typeindex);
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