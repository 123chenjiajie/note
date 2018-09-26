Vue.component('note', {
  // 声明 props
  props: ['todo'],
    //组件
  template: `
    <div class="card">
        <div class="card-body">
            <h2 class="card-title">{{getTitle ||'笔记标题'}}</h2>
            <textarea class="form-control" rows="3" v-model="todo.text" @keyup="upload"></textarea>
            <p class="card-text">{{getTime}}   {{todo.text.length}}字</p>
            <i class="fa fa-trash" title="删除这条笔记" @click="del"></i>
        </div>
    </div>
`,
    computed:{
        getTitle:function(){
            return _.truncate(this.todo.text, {'length': 10});
        },
        getTime:function(){
            return moment(this.todo.time).fromNow()
        }
    },
    methods:{
        //删除
         del: function () {
            //console.log(this._uid-1)
            //删除当前的笔记
            app.notes.splice(this._uid - 1,1);
             
              //本地存储
            localStorage.setItem('nnn',JSON.stringify(app.notes))
        },
        //修改笔记
        upload:function(){
            app.notes[this._uid - 1].text=this.todo.text;
            //本地存储
             localStorage.setItem('nnn',JSON.stringify(app.notes))
        }
    }
})
var app=new Vue({
    el:"#app",
    data:{
        notes:[
            {text:"新建笔记1",time:1537401600000}, 
            {text:"新建笔记2",time:1536537600000}, 
            {text:"新建笔记3",time:1535760000000} 
        ]
    },
    methods:{
        add:function(){
            this.notes.unshift({text:"","time":Date.parse(new Date())})
            //光标自动定位到第一个表单
            document.querySelector("textarea").focus();
            //本地存储
            localStorage.setItem('nnn',JSON.stringify(this.notes))
           
        }
        
    },
    //生命周期created 浏览器
  created: function () {
        //浏览器打开的时候赋值本地存储的值    判断是否等于空
        if (localStorage.getItem('nnn') !== null){
            this.notes = JSON.parse(localStorage.getItem('nnn'));
        }
    }
})
//自动撑开多行文本框
autosize(document.querySelectorAll('textarea'));