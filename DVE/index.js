/**
 * Created by bgllj on 2016/7/5.
 */




// import Vue from "vue";
import App from "./components/area.vue";
// import vi from "./components/AttributePanel_valueInput.vue";

//
// +---------------+
// |   DOCUMENT    |
// +-------+-------+
//         |
//         |                                   +--------------------------+
//         |                                   |       DNA RENDERER       |
//         |   +-------------------------------+                          +-----+
//         |   |                               |                          |     |
//         |   |                               +------------+-------------+     |
//         |   |                                            |                   |
//         |   |                                            |                   |
//         |   |                               +------------+-------------+     |
// +-------+---v---+                           |         DNA MODEL        |     |
// |    LAYERS     +---------------------------+                          |     |
// +---------------+                           |                          |     |
//                                             +------------+-------------+     |
//                                                          |                   |
//                 +--------------------------+             |   +---------------+-----+
//                 |      SELCET LAYERS       |             |   |     VAR SYSTEM      |
//                 |                          +-------------+   |                     |
//                 |   (selectsMembrane.js)   |                 |   (varSystem.js)    |
//                 +------------+-------------+                 +-----------+---------+
//                              |                                           |
//                              |                                           |
//                 +------------+-------------+                             |
//                 |        EDIT PANEL        |                             |
//                 |                          +-----------------------------+
//                 |                          |
//                 +--------------------------+

//重要信息
var UIDNA = {
    name: "UI-DNA",
    version: "0.0.1",
    codename: ["Euglena"][0],
    author: "nullice",
    website: "http://nullice.com",
    email: "ui@nullice.com"

}

window.UIDNA = UIDNA
//CEP 库-------------------------------------
if (typeof window.__adobe_cep__ !== "undefined")
{
    window.cs = new CSInterface();
} else
{
    console.info("running without CEP!")
}


//日志记录系统 -------------------------------------
import  LoggerCaryon  from "./Caryon/loggerCaryon.js";
var logger = new LoggerCaryon();
window.logger = logger;


logger.info(
    "3,2,1 "+ "%c"+UIDNA.name + " v" + UIDNA.version + " -" + UIDNA.codename+ "  %cstart!",
    "background-color: #7d7d7d;color: #fff; padding:2px 8px; font-size:12px;border-radius: 4px;",
    (new Date()).toLocaleString(),
    {
        "localeTime": (new Date()).toLocaleString(),
        "UTC": new Date(),
    }
)

//PhotoShop 接口操作库-------------------------------------
import  Enzymes  from "./Enzymes/Enzymes";
if (typeof window.__adobe_cep__ !== "undefined")
{
    var enzymes = new Enzymes();
    window.enzymes = enzymes;

}
//数据结构--------------------------------------------
import  IchiColor_base  from "./Caryon/IchiColor/ichi-color.js";
import  IchiColor_ex  from "./Caryon/IchiColor/ichi-color-extension";
var IchiColor = IchiColor_ex(IchiColor_base);
window.IchiColor = IchiColor;
window.ichiColor = new IchiColor();

import  ColorRNA  from "./Caryon/IchiColor/lib/ColorRNA.js";
window.ColorRNA = ColorRNA;


//渲染系统-------------------------------------
import  RenderCaryon  from "./Caryon/renderCaryon";
var renderCaryon = new RenderCaryon();
window.renderCaryon = renderCaryon;

//数据存储系统-------------------------------------
import  DataCaryon  from "./Caryon/dataCaryon";
var dataCaryon = new DataCaryon();
window.dataCaryon = dataCaryon;
// 变量系统-------------------------------------
import  VarSystem  from "./Caryon/varSystem";
var varSystem = new VarSystem();
window.varSystem = varSystem;
//设置系统-------------------------------------
import  SetSystem  from "./Caryon/settingCaryon";
var setSystem = new SetSystem();
window.setSystem = setSystem;
//测试系统-------------------------------------
import  TEST  from "./test/test_core";
var test = new TEST("默认测试");
window.test = test
//选中图层处理-------------------------------------
import  GobCaryon  from "./Caryon/gobCaryon";
var Gob = new GobCaryon("默认测试");
window.Gob = Gob
//Photoshop 事件相关-------------------------------------
import  EventCaryon  from "./Caryon/eventCaryon";
var eventCaryon = new EventCaryon("默认测试");
window.eventCaryon = eventCaryon


//测试相关 -----------------------------------
window.tests = {};
import  test_task_Enzymes from "./test/test_Enzymes_JS";
window.tests.task_Enzymes = test_task_Enzymes;

//多国语相关 -----------------------
import  Lang from "./Caryon/lang";
Vue.filter('lang', Lang.fiterFunc);
Lang.currentLANG = Lang.LANG_Chiness2English;
window.Lang = Lang;


//UI -------------------------
Vue.config.debug = true;//开启错误提示

import {UI_model, UI_action} from "./components/UI_model/UI_model.js"
window.UI_model = UI_model;
window.UI_action = UI_action;


//其他 -------------------------

import AttrPanel from "./components/AttributePanel.vue";
import LayerSelectors from "./components/LayerSelectors.vue";
import VarPanel from "./components/VarPanel.vue";
import ExpressionPanel from  "./components/ExpressionPanel.vue"


var mainVue = new Vue({
    el: 'body',
    data: {},
    components: {
        // include the required component
        // in the options
        "attr-panel": AttrPanel,
        "layers-panel": LayerSelectors,
        "var-panel": VarPanel,
        "expression-panel": ExpressionPanel
    }
})

window.mainVue = mainVue


//测试 ----------------------
async function doAsync()
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(() =>
        {
            console.log("sleep 2s");
            resolve(444)
        }, 2000)
    })
}

window.sleep = async function (ms)
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(() =>
        {
            resolve()
        }, ms)
    })
}
async function asyncTask()
{

    console.log("ssss1")
    var a = await  doAsync();
    console.log("ssss2" + a)

    return 2016
}


var __result = asyncTask()
console.log("sss_end" + __result)
