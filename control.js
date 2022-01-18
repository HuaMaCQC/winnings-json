var SlotOptions = new Array;
  for (var i = 0; i < SlotName.length; i++) { //建立遊戲名稱選單
    SlotOptions.push(
      {
        text: SlotName[i].name,
        value: {
          name: SlotName[i].id,
          roll: [15],
          img: [
            './img/' + SlotName[i].id + '/0.png',
            './img/' + SlotName[i].id + '/1.png',
            './img/' + SlotName[i].id + '/2.png',
            './img/' + SlotName[i].id + '/3.png',
            './img/' + SlotName[i].id + '/4.png',
            './img/' + SlotName[i].id + '/5.png',
            './img/' + SlotName[i].id + '/6.png',
            './img/' + SlotName[i].id + '/7.png',
            './img/' + SlotName[i].id + '/8.png',
            './img/' + SlotName[i].id + '/9.png',
            './img/' + SlotName[i].id + '/10.png',
            './img/' + SlotName[i].id + '/11.png'
          ]
        }
      }
    )
  }


  var search = new Vue({
    el: '#search',
    data: {
      selected: SlotOptions[0].value,
      options: SlotOptions,
      myjson: '{"mode":"normal","now_balance":9699,"result":{"total_win":2,"roll":[8,7,0,4,8,3,8,10,7,8,10,6,7,3,6],"data":[{"line":12,"symbol":8,"grid":[0,4,6],"winning":2}]}}',
      mode: '',
      now_balance: '',
      total_win: '',
      roll: '',
      data: ''
    },
    watch: {
      myjson: function (newjson) { //解析json
        var m_res = "";
        var m_roll = [];
        try {
          m_res = JSON.parse(newjson);
          console.log(typeof m_res)
        } catch (error) {
          this.mode = '您輸入的資料有誤';
          this.now_balance = '';
          this.total_win = '';
          this.roll = '';
          this.data = '';
        }
        for (var i = 0; i < SlotOptions.length; i++) {
          for (var x = 0; x < 15; x++) {
            SlotOptions[i].value.roll[x] = '';
          }
        }
        if (m_res.result.roll) {
          m_roll = m_res.result.roll;
        } else {
          m_roll = [];
        }
        if (m_roll.length == 15) {
          this.roll = m_res.result.roll;
        } else if (m_roll.length - 15 > 0) {
          this.roll = "多" + (m_roll.length - 15) + '顆';
          m_roll = [];
        } else {
          this.roll = "少" + (15 - m_roll.length) + '顆';
        }
        this.mode = m_res.mode;
        this.now_balance = m_res.now_balance;
        this.total_win = m_res.result.total_win;
        this.data = m_res.result.data;

        for (var i = 0; i < SlotOptions.length; i++) {
          for (var x = 0; x < m_roll.length; x++) {
            SlotOptions[i].value.roll[x] = SlotOptions[i].value.img[m_roll[x]];
          }
        }
      },
    }
  })
  search.myjson = '{"mode":"normal","now_balance":9699,"result":{"total_win":2,"roll":[8,7,0,4,8,3,8,10,7,8,10,6,7,3,6],"data":[{"line":12,"symbol":8,"grid":[0,4,6],"winning":2}]}}'
  
  function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
  }
