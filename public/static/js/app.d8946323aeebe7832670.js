webpackJsonp([1],{"+skl":function(t,e){},0:function(t,e){},L99s:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",{staticClass:"card"},[r("h1",{staticClass:"title",slot:"title"},[t._v("博客网址提交系统")]),t._v(" "),r("Form",{ref:"formValue",attrs:{rules:t.validateRule,model:t.formValue}},[r("FormItem",{attrs:{label:"学号",prop:"id"}},[r("Input",{attrs:{placeholder:"请输入8位学号"},model:{value:t.formValue.id,callback:function(e){t.formValue.id=e},expression:"formValue.id"}})],1),t._v(" "),r("FormItem",{attrs:{label:"博客网址",prop:"url"}},[r("Input",{attrs:{type:"textarea",placeholder:"只允许输入一个网址",autosize:{minRows:7,maxRows:9}},model:{value:t.formValue.url,callback:function(e){t.formValue.url=e},expression:"formValue.url"}})],1),t._v(" "),r("FormItem",[r("Button",{staticClass:"submit",attrs:{type:"primary",long:""},on:{click:function(e){t.handleSubmit(e)}}},[t._v("提交")])],1)],1)],1)},o=[],l={render:a,staticRenderFns:o};e.a=l},M93x:function(t,e,r){"use strict";function a(t){r("isls")}var o=r("xJD8"),l=r("L99s"),n=r("VU/8"),i=a,s=n(o.a,l.a,i,null,null);e.a=s.exports},NHnr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("7+uW"),o=r("M93x"),l=r("BTaQ"),n=r.n(l),i=r("ORbq"),s=r("+skl");r.n(s);a.default.config.productionTip=!1,a.default.use(n.a),a.default.use(i.a),new a.default({el:"#app",template:"<App/>",components:{App:o.a}})},isls:function(t,e){},xJD8:function(t,e,r){"use strict";e.a={name:"app",methods:{handleSubmit:function(t){var e=this,r=this;t.preventDefault(),this.$refs.formValue.validate(function(t){t?(e.$Loading.start(),e.$http.post("/",{id:r.formValue.id,url:r.formValue.url}).then(function(t){console.log(t.body),t.body.status?(r.$Loading.finish(),console.log("Success"),r.$Notice.success({title:"提交成功",desc:"您的博客网址已成功提交"})):(r.$Loading.error(),console.log("Failed-IncorrectData"),r.$Notice.error({title:"提交失败",desc:"您的内容格式可能错误，或您已经提交过该博客地址"}))},function(t){r.$Loading.error(),console.log("Failed-NetworkPronlem"),r.$Notice.warning({title:"提交失败",desc:"与后台服务器连接失败，请联系管理员协助解决问题"})})):r.$Message.error("表单验证失败")})}},data:function(){return{formValue:{id:"",url:""},validateRule:{id:[{validator:function(t,e,r){var a=/^(1)(4|5)([0-9]){6}/;""!==e&&8===e.length&&a.test(e)?r():r(new Error("请输入8位有效学号"))},trigger:"blur"}],url:[{validator:function(t,e,r){var a=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;if(""===e||!a.test(e))return void r("网址格式错误，注意检查是否加入http://或https://前缀");r()},trigger:"blur"}]}}}}}},["NHnr"]);
//# sourceMappingURL=app.d8946323aeebe7832670.js.map