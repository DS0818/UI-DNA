/**
 * Created by nullice on 2017/4/26.
 */

//基础版本
window.UIDNA_BASE_VERINNDEX = 7;


(function ()
{
    var fs = require("fs")
    var path = require("path")
    var cs = new CSInterface()

    var scriptBox = document.getElementById("script-box")
    var loadingBox = document.createElement("div")
    var jslist = []
    loadingBox.id = "loading-box"
    addScript("./JS/gonz.js")
    //------------------------------
    loading_Main()
    //-----------------------------
    addScript("./JS/UI_theme.js")

    loadJs()

    function loading_Main()
    {
        var autoUpdatePath = path.join(cs.getSystemPath(SystemPath.USER_DATA), "nullice.designEnzyme/UI-DNA/AutoUpdate")

        if (fs.existsSync(autoUpdatePath))
        {
            var fileList = fs.readdirSync(autoUpdatePath)
            var reg = /^patch_main_V0@[0-9]{0,4}/
            var reg_ver = /@[0-9]{0,4}/
            var maxVerIndex = window.UIDNA_BASE_VERINNDEX;
            var maxVerFilePath = null;

            for (var i = 0; i < fileList.length; i++)
            {

                if (reg.test(fileList[i]))
                {
                    var verIndex = +(reg_ver.exec(fileList[i])[0].slice(1))
                    if (verIndex > maxVerIndex)
                    {
                        maxVerIndex = verIndex
                        maxVerFilePath = fileList[i]
                    }
                }
            }
            if (maxVerFilePath != undefined)
            {
                var finPath = path.join(autoUpdatePath, maxVerFilePath)
                if (fs.existsSync(finPath))
                {
                    addScript(finPath)
                    return
                }

            }
        }

        addScript("./JS/main.js")
    }

    function addScript(src)
    {

        var js = document.createElement("script")
        js.src = src
        jslist.push(js)
    }


    function loadJs()
    {
        for (var i = 0; i < jslist.length; i++)
        {
            if (i < jslist.length - 1)
            {
                jslist[i].onload = (function (i)
                {
                    return function ()
                    {
                        console.info("loadJs",i + 1,jslist[i + 1])
                        scriptBox.appendChild(jslist[i + 1])
                    }
                })(i)
            }else
            {

                jslist[i].onload =  loading_jquery

            }
        }
        console.info("loadJs",0,jslist[0])
        scriptBox.appendChild(jslist[0])
    }

    function loading_jquery()
    {
        console.info("loadJs","loading_jquery")
        /*页面滚动 nicescroll*/
        $(document).ready(function ()
        {
            $("html").niceScroll({
                cursorcolor: "rgba(0, 0, 0, 0.17)",
                cursorborder: "2px solid rgba(0, 0, 0, 0)",
                scrollspeed: 40, // scrolling speed
                mousescrollstep: 5, // scrolling speed with mouse wheel (pixel)});
            })
        });

        /*自动完成  autocomplete*/


        $('.value_input_box .edit_input,.value_input_box .out_input ').autocomplete({
            lookup: autocomplete_var,
            orientation: "top",
            width: "flex"

        });

    }


})()
