(function ()
{

    /**
     * Created by bgllj on 2017/3/9.
     */

    /**
     * 排序对象数组
     * @param arr 数组
     * @param key 对象排序的键值，如 [{a:12}, {a:33}] , key 为 "a" 则以 a 排序
     * @param bigFront 大值在前
     */
    var sortObjectArray = function (arr, key, bigFront)
    {
        if (arr != undefined && arr.sort != undefined)
        {

            return arr.sort(by(key));
        }

        function by(name)
        {
            return function (o, p)
            {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p)
                {
                    a = o[name];
                    b = p[name];
                    if (a === b)
                    {
                        return 0;
                    }
                    if (typeof a === typeof b)
                    {
                        if (bigFront)
                        {
                            return a > b ? -1 : 1;
                        } else
                        {
                            return a < b ? -1 : 1;
                        }

                    }
                    return typeof a < typeof b ? -1 : 1;
                }
                else
                {
                    throw ("error");
                }
            }
        }
    }


    /**
     * 差集。（不支持对象数组）
     * a:[1,2,3] b:[1,2,4]   a-b => [3]
     * @param {Array} a
     * @param {Array} b
     * @returns {Array}
     */
    var difference = function (a, b)
    {
        var ob = {};
        for (var i = 0; i < a.length; i++)
        {
            ob[a[i]] = true;
        }

        for (var i = 0; i < b.length; i++)
        {
            if (ob[b[i]] != undefined)
            {
                ob[b[i]] = false;
            }
        }

        var arr = [];
        for (var x in ob)
        {
            if (ob[x] != false)
            {
                arr.push(x);
            }
        }
        return arr;
    }


    /**
     * 交集。（不支持对象数组）
     * a:[1,2,3] b:[1,2,4]   a∩b => [1,2]
     * @returns {Array}
     */
    var intersection = function (a, b)
    {
        var ob = {};
        for (var i = 0; i < a.length; i++)
        {
            ob[a[i]] = false;
        }

        for (var i = 0; i < b.length; i++)
        {
            if (ob[b[i]] != undefined)
            {
                ob[b[i]] = true;
            }
        }

        var arr = [];
        for (var x in ob)
        {
            if (ob[x] != false)
            {
                arr.push(x);
            }
        }
        return arr;
    }
    /**
     * 对象数组查找
     * 从对象数组中提取出一个对象，根据对象的一个属性值。
     * arr: [{name:a},{name:b}] getByKey(arr,"name","b") => return {name:b}
     * @param {[Object]} objectArr 对象数组
     * @param {String} key 关键属性
     * @param keyValue 欲提取的关键属性值
     * @param equalRule 值比较函数，可空
     * @returns {*}
     */
    var getByKey = function (objectArr, key, keyValue, equalRule)
    {
        for (var i = 0; i < objectArr.length; i++)
        {
            if (objectArr[i][key] != undefined)
            {
                if (equalRule != undefined)
                {
                    if (equalRule(objectArr[i][key], keyValue))
                    {
                        return objectArr[i]
                    }

                } else
                {
                    if (objectArr[i][key] == keyValue)
                    {
                        return objectArr[i]
                    }
                }
            }
        }

    }


    /**
     * 复制形状属性
     * @param infoObjec
     * @param envObject
     * @returns {*}
     */
    Libs.quick_shape_advance_distribute = function (infoObjec, envObject)
    {

        calcLayersGuide()


        /*------------------排序 指定间距*/
        // setLayerBounds_byId(RowColIds[0][0], {y: minY, x: minX})
        // distribute_xyDistance(RowColIds, layerPool, minX, minY, 5, 5, "vetically")


        // var temp = []
        // for (var i = 0; i < rankIds_x_y.length; i++)
        // {
        //     temp.push(Kinase.layer.getLayerName_byID(rankIds_x_y[i]))
        // }


        // return json(temp)
    }


    
    
    
    
    function calcLayersGuide()
    {
        var layerIds = Kinase.layer.getTargetLayersID()
        var layerPool = []
        for (var i = 0; i < layerIds.length; i++)
        {
            var bounds = Kinase.layer.getLayerBounds(Kinase.REF_LayerID, layerIds[i])

            var layerItem = {
                name: Kinase.layer.getLayerName_byID(layerIds[i]),
                id: layerIds[i],
                x: bounds.x, y: bounds.y, w: bounds.w, h: bounds.h,
                right: bounds.right, bottom: bounds.bottom,
                xy: bounds.x + bounds.y,
                x_y: bounds.x - bounds.y,
                rank_x: null, rank_y: null, rank_right: null, rank_bottom: null, rank_xy: null, rank_x_y: null
            }
            layerPool.push(layerItem)
        }

        var rankIds_x = []
        sortObjectArray(layerPool, "x", false)
        for (var i = 0; i < layerPool.length; i++)
        {
            layerPool[i].rank_x = i
            rankIds_x.push(layerPool[i].id)
        }
        var rankIds_y = []
        sortObjectArray(layerPool, "y", false)
        for (var i = 0; i < layerPool.length; i++)
        {
            layerPool[i].rank_y = i
            rankIds_y.push(layerPool[i].id)
        }
        //
        // var rankIds_right = []
        // sortObjectArray(layerPool, "right", false)
        // for (var i = 0; i < layerPool.length; i++)
        // {
        //     layerPool[i].rank_right = i
        //     rankIds_right.push(layerPool[i].id)
        // }
        //
        // var rankIds_bottom = []
        // sortObjectArray(layerPool, "bottom", false)
        // for (var i = 0; i < layerPool.length; i++)
        // {
        //     layerPool[i].rank_bottom = i
        //     rankIds_bottom.push(layerPool[i].id)
        // }
        //
        //
        // var rankIds_x_y = []
        // sortObjectArray(layerPool, "x_y", false)
        // for (var i = 0; i < layerPool.length; i++)
        // {
        //     layerPool[i].rank_x_y = i
        //     rankIds_x_y.push(layerPool[i].id)
        // }


        var rankIds_xy = []
        sortObjectArray(layerPool, "xy", false)
        for (var i = 0; i < layerPool.length; i++)
        {
            layerPool[i].rank_xy = i
            rankIds_xy.push(layerPool[i].id)
        }


        var RowColIds = []
        /*2维数组，行列排序*/
        var SingleIds = []
        /*一维数组，左右-上下顺序*/

        var minY = getByKey(layerPool, "id", rankIds_y[0]).y
        var minX = getByKey(layerPool, "id", rankIds_x[0]).x

        rowColDivide(rankIds_xy, 0)


        var RowNumber = RowColIds.length
        var ColNumber = 0
        for (var i = 0; i < RowColIds.length; i++)
        {
            if (RowColIds[i].length > ColNumber)
            {
                ColNumber = RowColIds[i].length
            }
        }

        $.writeln("RowColIds：" + json(RowColIds))
        $.writeln("SingleIds：" + json(SingleIds))
        $.writeln("ColNumber：" + json(ColNumber))
        $.writeln("RowNumber：" + json(RowNumber))
        $.writeln("minY：" + json(minY))
        $.writeln("minX：" + json(minX))
        $.writeln("RowColIds[0][0]：" + json(RowColIds[0][0]))

        var resultOb = {
            RowColIds: RowColIds, /*2维数组，行列排序*/
            SingleIds: SingleIds, /*2维数组，行列排序*/
            minY: minY, /*最上位置*/
            minX: minX, /*最左位置*/
            RowNumber: RowNumber, /*行数*/
            ColNumber: ColNumber, /*列数*/
        }

        return resultOb

        function rowColDivide(ids, time)
        {
            // $.writeln("r------------------length" + json(ids.length))
            // 获得 xy 排名，得到顶点
            var rankIds_xy = sortIds(ids, "xy", layerPool)


            var zero = getByKey(layerPool, "id", rankIds_xy[0])
            var layerArr = idsTolayerArr(rankIds_xy, layerPool)
            // $.writeln("rowColDivide layerArr.length：" + json(layerArr.length))
            // $.writeln("rowColDivide rankIds_xy：" + json(rankIds_xy))
            // $.writeln("rowColDivide rankIds_xy.slice(1)：" + json(rankIds_xy.slice(1)))

            var zeroRigth = []
            for (var i = 0; i < layerArr.length; i++)
            {
                if (layerArr[i].x >= zero.right)
                {
                    zeroRigth.push(layerArr[i].id)
                }
            }
            // $.writeln("zeroRigth：" + json(zeroRigth))

            var zeroBottom = []
            for (var i = 0; i < layerArr.length; i++)
            {
                if (layerArr[i].y >= zero.bottom)
                {
                    zeroBottom.push(layerArr[i].id)
                }
            }
            // $.writeln("zeroBottom：" + json(zeroBottom))


            var rowIds = difference(zeroBottom, zeroRigth)
            var colIds = difference(zeroRigth, zeroBottom)
            // rowIds = sortIds(rowIds, "y", layerPool)
            colIds = sortIds(colIds, "x", layerPool)
            // var subIds = intersection(zeroBottom, zeroRigth)
            // var colNumber = colIds.length + 1
            // var rowNumber = rowIds.length + 1

            // $.writeln("rowIds：" + json(rowIds))
            // $.writeln("colIds：" + json(colIds))

            var thisRow = []
            thisRow.push(zero.id)
            SingleIds.push(zero.id)
            for (var i = 0; i < colIds.length; i++)
            {
                thisRow.push(colIds[i])
                SingleIds.push(colIds[i])
            }
            RowColIds.push(thisRow)

            if (zeroBottom.length > 0)
            {
                rowColDivide(zeroBottom, time + 1)
            }
        }

    }


    /**
     * 排列，指定上下间距
     * @param xD 左右间距
     * @param yD 上下间距
     * @param inLineAlign 行内垂直对齐模式， "top","bottom","vetically"，
     */
    function distribute_xyDistance(rowColIds, layerPool, minX, minY, xD, yD, inLineAlign)
    {


        var topLine = minY;
        var lastRight = minX


        for (var r = 0; r < rowColIds.length; r++)
        {
            var lineHeight = getLineHeight(rowColIds[r], layerPool)
            var rowLayers = idsTolayerArr(rowColIds[r], layerPool)

            for (var c = 0; c < rowLayers.length; c++)
            {
                if (c == 0)
                {
                    setLayerBounds_byId(rowLayers[c].id, {
                            x: minX,
                            y: calcY_by_lineHeight(topLine, lineHeight, rowLayers[c].h, inLineAlign)
                        }
                    )
                    lastRight = minX + rowLayers[c].w

                } else
                {
                    setLayerBounds_byId(rowLayers[c].id, {
                            x: lastRight + xD,
                            y: calcY_by_lineHeight(topLine, lineHeight, rowLayers[c].h, inLineAlign)
                        }
                    )
                    lastRight = lastRight + xD + rowLayers[c].w

                }
            }
            topLine = topLine + lineHeight + yD


        }


        function calcY_by_lineHeight(topLine, lineHeight, h, inLineAlign)
        {
            if (inLineAlign == "top")
            {
                return topLine
            }
            else if (inLineAlign == "bottom")
            {
                return topLine + lineHeight - h
            }
            else  /* vetically 默认*/
            {
                return topLine + (lineHeight / 2) - (h / 2)
            }

        }

    }


    function setLayerBounds_byId(id, bounds)
    {
        Kinase.layer.selectLayer_byID(id)
        Kinase.layer.setLayerBounds_byActive(bounds)
    }


    function getLineHeight(rowIds, layerPool)
    {
        var layerArr = idsTolayerArr(rowIds, layerPool)
        var lineHeight = 0

        for (var i = 0; i < layerArr.length; i++)
        {
            if (layerArr[i].h > lineHeight)
            {
                lineHeight = layerArr[i].h
            }
        }
        return lineHeight
    }




    function sortIds(ids, propertyName, layerPool)
    {

        var layerArr = idsTolayerArr(ids, layerPool)
        sortObjectArray(layerArr, propertyName, false)

        var rankIds_xy = []
        for (var i = 0; i < layerArr.length; i++)
        {
            rankIds_xy.push(layerArr[i].id)
        }

        return rankIds_xy
    }


    function idsTolayerArr(ids, layerPool)
    {

        var layerArr = []
        for (var i = 0; i < ids.length; i++)
        {

            layerArr.push(getByKey(layerPool, "id", ids[i]))
        }
        return layerArr
    }



















// Libs.quick_shape_advance_copyShapeProperty = function (infoObjec, envObject)
// {
//
//     function _func()
//     {
//         var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
//         var desc692 = new ActionDescriptor();
//         var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
//         var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
//         var idshapeCopyShapeAll = stringIDToTypeID("shapeCopyShapeAll");
//         desc692.putEnumerated(idshapeClipboardOperation, idshapeClipboardOperation, idshapeCopyShapeAll);
//         executeAction(idshapeClipboardOperation, desc692, DialogModes.NO);
//     }
//
//     Proteins.doCon(_func, "形状对称差", false)
//     return 0
// }


})()