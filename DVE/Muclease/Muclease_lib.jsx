/**
 * Created by bgllj on 2016/7/6.
 */


// Muclease 核酸酶
//--------------------------
// By nullice ui@nullice.com
// nullice.com
// license: LGPL

$.evalFile("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/com.nullice.pschen.fonTags/jsx/json2.js");

/**
 *
 * @returns {Muclease}
 * @constructor
 */
Muclease = function ()
{
    try
    {
        JSON
    }
    catch (e)
    {
        $.writeln("无法使用 Muclease，因为载入 JSON 解析库，请载入 json2.js ")
    }

    return this;
};


/**
 * 把 actionReference 解析为一个简单 Object 并返回
 * @param actionReference
 * @returns {{}} actionReference 解析后的 Object
 */
Muclease.prototype.actionReferenceToObject = function (actionReference)
{
    var ob = {};

    try
    {
        ob.form = actionReference.getForm().toString()
    } catch (e)
    {
    }
    try
    {
        ob.desiredClass = typeIDToStringID(actionReference.getDesiredClass())
    } catch (e)
    {
    }
    try
    {
        ob.enumeratedType = typeIDToStringID(actionReference.getEnumeratedType())
    } catch (e)
    {
    }
    try
    {
        ob.enumeratedValue = typeIDToStringID(actionReference.getEnumeratedValue())
    } catch (e)
    {
    }
    try
    {
        ob.identifier = typeIDToStringID(actionReference.getIdentifier())
    } catch (e)
    {
    }
    try
    {
        ob.index = actionReference.getIndex()
    } catch (e)
    {
    }
    try
    {
        ob.offset = actionReference.getOffset()
    } catch (e)
    {
    }
    try
    {
        ob.property = typeIDToStringID(actionReference.getProperty())
    } catch (e)
    {
    }
    try
    {
        var t = actionReference.getName();
        if (t.length > 0) ob.name = t;

    } catch (e)
    {
    }


    return ob;
}


/**
 * 把 actionDescriptor 解析为一个 Object 并返回
 * @param actionDescriptor
 * @param in_outSimple bool 为真输出便于阅读的简单对象，否则输出带属性 Type 的完整对象
 * @returns {{}} actionDescriptor 解析后的 Object
 */
Muclease.prototype.actionDescriptorToObject = function (actionDescriptor, in_outSimple)
{
    var out_ob = {};
    _scanAD(actionDescriptor, out_ob, false, in_outSimple)


    function _scanAD(ad, ob, isAList, outSimple)
    {
        var len = ad.count;
        for (var i = 0; i < len; i++)
        {
            if (isAList)
            {
                var key = i;
            } else
            {
                var key = ad.getKey(i);
            }

            var obType = ad.getType(key)
            var obValue = null;

            if ("DescValueType.BOOLEANTYPE" == obType)
            {
                obValue = ad.getBoolean(key);
            }
            else if ("DescValueType.STRINGTYPE" == obType)
            {
                obValue = ad.getString(key);
            }
            else if ("DescValueType.INTEGERTYPE" == obType)
            {
                obValue = ad.getInteger(key);
            }
            else if ("DescValueType.DOUBLETYPE" == obType)
            {
                obValue = ad.getDouble(key);
            }
            else if ("DescValueType.CLASSTYPE" == obType)
            {
                obValue = ad.getClass(key);
            }
            else if ("DescValueType.RAWTYPE" == obType)
            {
                obValue = ad.getData(key);
            }
            else if ("DescValueType.LARGEINTEGERTYPE" == obType)
            {
                obValue = ad.getLargeInteger(key);
            }
            else if ("DescValueType.ALIASTYPE" == obType)
            {
                obValue = ad.getPath(key);
            }
            else if ("DescValueType.UNITDOUBLE" == obType)
            {
                obValue = {
                    doubleType: typeIDToStringID(ad.getUnitDoubleType(key)),
                    doubleValue: ad.getUnitDoubleValue(key)
                };
            }
            else if ("DescValueType.ENUMERATEDTYPE" == obType)
            {
                obValue = {
                    enumerationType: typeIDToStringID(ad.getEnumerationType(key)),
                    enumerationValue: typeIDToStringID(ad.getEnumerationValue(key))
                };
            }
            else if ("DescValueType.REFERENCETYPE" == obType)
            {
                obValue = Muclease.prototype.actionReferenceToObject(ad.getReference(key));
            }
            else if ("DescValueType.OBJECTTYPE" == obType)
            {
                obValue = {}
                _scanAD(ad.getObjectValue(key), obValue, false, outSimple)
            }
            else if ("DescValueType.LISTTYPE" == obType)
            {
                if (outSimple)
                {
                    obValue = [];
                    _scanAD(ad.getList(key), obValue, true, outSimple)
                }
                else
                {
                    obValue = {};
                    _scanAD(ad.getList(key), obValue, true, outSimple)

                }
            }


            if (isAList)
            {
                var name = key;
            } else
            {
                var name = typeIDToStringID(key);
            }

            if (outSimple)
            {
                if (isAList)
                {
                    ob[key] = obValue;
                }
                else
                {
                    ob[name] = obValue;
                    if ("DescValueType.OBJECTTYPE" == obType)
                    {
                        ob[name]._objectType = typeIDToStringID(ad.getObjectType(key));
                    }
                }

            }
            else
            {

                ob[name] = {
                    value: obValue,
                    type: obType.toString()
                };
                if ("DescValueType.OBJECTTYPE" == obType)
                {
                    ob[name].objectType = typeIDToStringID(ad.getObjectType(key));
                }

            }

        }

    }

    return out_ob
}


/**
 * 把 actionDescriptor 解析为一个简单 Object 并返回
 * @param actionDescriptor
 * @returns {{}} actionDescriptor 解析后的简单 Object
 */
Muclease.prototype.actionDescriptorToSimpleObject = function (actionDescriptor)
{
    return Muclease.prototype.actionDescriptorToObject(actionDescriptor, true);
}

/**
 * 把 actionDescriptor 解析为对象并转换为 JSON 字符串
 * @param actionDescriptor
 */
Muclease.prototype.actionDescriptorToJSON = function (actionDescriptor)
{
    var ob = Muclease.prototype.actionDescriptorToObject(actionDescriptor);
    return JSON.stringify(ob);
}


/**
 * 把 actionDescriptor 解析为简单对象并转换为 JSON 字符串
 * @param actionDescriptor
 */
Muclease.prototype.actionDescriptorToSampleJSON = function (actionDescriptor)
{
    var ob = Muclease.prototype.actionDescriptorToObject(actionDescriptor, true);
    return JSON.stringify(ob);
}

/**
 * 把 actionReference 解析为简单对象并转换为 JSON 字符串
 * @param actionDescriptor
 */
Muclease.prototype.actionReferenceToJSON = function (actionDescriptor)
{
    var ob = Muclease.prototype.actionReferenceToObject(actionDescriptor);
    return JSON.stringify(ob);
}

/**
 * 把一个 JSON 字符串，写到一个文件中。
 * @param filePath
 * @param json
 */
Muclease.prototype.jsonToFile = function (filePath, json)
{
    var f = new File(filePath);
    f.open("w");
    f.write(json);
    f.close();
}


/**
 * 把通过  actionReferenceToObject() 得到的  object 转回 ActionReference
 * @param ob
 * @returns {*}
 */
Muclease.prototype.objectToActionReference = function (ob)
{
    if (ob.constructor !== Object)
    {
        return "not_Object";
    }

    var hasDesiredClass = false;//只有当没有设置 DesiredClass 时才 putClass();


    var af = new ActionReference();

    if (ob.property !== undefined)
    {
        // $.writeln("property:" + ob.property);
        var idDC = stringIDToTypeID(ob.desiredClass);
        var idPR = stringIDToTypeID(ob.property);
        // $.writeln("putProperty:" + typeIDToCharID(idDC) + " , " + typeIDToCharID(idPR));
        // putProperty(desiredClass,value)
        af.putProperty(idDC, idPR);
        hasDesiredClass = true;

    }
    if (ob.identifier !== undefined)
    {
        //putIdentifier(desiredClass,value)
        af.putIdentifier(stringIDToTypeID(ob.desiredClass), stringIDToTypeID(ob.identifier))
        hasDesiredClass = true;
    }
    if (ob.index !== undefined)
    {
        //putIndex(desiredClass, value)
        af.putIndex(stringIDToTypeID(ob.desiredClass), ob.index);
        hasDesiredClass = true;
    }
    if (ob.offset !== undefined)
    {
        //   putOffset(desiredClass,value)
        af.putOffset(stringIDToTypeID(ob.desiredClass), ob.offset);
        hasDesiredClass = true;
    }
    if (ob.name !== undefined)
    {
        // putName(desiredClass,value)
        af.putName(stringIDToTypeID(ob.desiredClass), ob.name);
        hasDesiredClass = true;
    }
    if ((ob.enumeratedValue !== undefined) && (ob.enumeratedType !== undefined))
    {
        //putEnumerated(desiredClass,enumType,value)
        af.putEnumerated(stringIDToTypeID(ob.desiredClass), stringIDToTypeID(ob.enumeratedType), stringIDToTypeID(ob.enumeratedValue));
        hasDesiredClass = true;
    }

    if ((ob.desiredClass !== undefined) && (hasDesiredClass == false))
    {
        $.writeln("desiredClass:" + ob.desiredClass);
        af.putClass(stringIDToTypeID(ob.desiredClass));
    }


    var ref50 = new ActionReference();
    var idPrpr = charIDToTypeID("Prpr");
    var idLefx = charIDToTypeID("Lefx");
    ref50.putProperty(idPrpr, idLefx);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref50.putEnumerated(idLyr, idOrdn, idTrgt);

    return af;
}


Muclease.prototype.objectToActionDescriptor = function (ob)
{
    var ad = new ActionDescriptor();
    _creatAD(ob, ad)

    function _creatAD(in_ob, in_ad, mod)
    {
        for (var i in in_ob)
        {
            // $.writeln(i);
            if (in_ob[i].type == "DescValueType.UNITDOUBLE")
            {
                //putUnitDouble(key, unitID, value);
                if (mod == "list")
                {
                    in_ad.putUnitDouble(stringIDToTypeID(in_ob[i].value.doubleType), in_ob[i].value.doubleValue);
                } else
                {
                    in_ad.putUnitDouble(stringIDToTypeID(i), stringIDToTypeID(in_ob[i].value.doubleType), in_ob[i].value.doubleValue);
                }
            }
            if (in_ob[i].type == "DescValueType.DOUBLETYPE")
            {
                //putDouble(key,value)
                if (mod == "list")
                {
                    in_ad.putDouble( in_ob[i].value);
                } else
                {
                    in_ad.putDouble(stringIDToTypeID(i), in_ob[i].value);
                }
            }
            if (in_ob[i].type == "DescValueType.BOOLEANTYPE")
            {
                //putBoolean(key,value)
                in_ad.putBoolean(stringIDToTypeID(i), in_ob[i].value);
                if (mod == "list")
                {
                    in_ad.putBoolean(in_ob[i].value);
                } else
                {
                    in_ad.putBoolean(stringIDToTypeID(i), in_ob[i].value);
                }
            }
            if (in_ob[i].type == "DescValueType.CLASSTYPE")
            {
                // putClass(key,value)
                if (mod == "list")
                {
                    in_ad.putClass(stringIDToTypeID(in_ob[i].value));
                } else
                {
                    in_ad.putClass(stringIDToTypeID(i), stringIDToTypeID(in_ob[i].value));
                }
            }
            if (in_ob[i].type == "DescValueType.RAWTYPE")
            {
                // putData(key,value)
                if (mod == "list")
                {
                    in_ad.putData(in_ob[i].value);
                } else
                {
                    in_ad.putData(stringIDToTypeID(i), in_ob[i].value);
                }

            }
            if (in_ob[i].type == "DescValueType.ENUMERATEDTYPE")
            {
                // putEnumerated(key,enumType,value)
                if (mod == "list")
                {
                    in_ad.putEnumerated(stringIDToTypeID(in_ob[i].value.enumerationType), stringIDToTypeID(in_ob[i].value.enumerationValue));
                } else
                {
                    in_ad.putEnumerated(stringIDToTypeID(i), stringIDToTypeID(in_ob[i].value.enumerationType), stringIDToTypeID(in_ob[i].value.enumerationValue));
                }

            }
            if (in_ob[i].type == "DescValueType.INTEGERTYPE")
            {
                // putInteger(key,value)
                if (mod == "list")
                {
                    in_ad.putInteger(in_ob[i].value);
                } else
                {
                    in_ad.putInteger(stringIDToTypeID(i), in_ob[i].value);
                }

            }
            if (in_ob[i].type == "DescValueType.LARGEINTEGERTYPE")
            {
                // putLargeInteger(key,value)
                if (mod == "list")
                {
                    in_ad.putLargeInteger(in_ob[i].value);
                } else
                {
                    in_ad.putLargeInteger(stringIDToTypeID(i), in_ob[i].value);
                }
            }
            if (in_ob[i].type == "DescValueType.ALIASTYPE")
            {
                // putPath(key,value)
                if (mod == "list")
                {
                    in_ad.putPath(new File(in_ob[i].value));
                } else
                {
                    in_ad.putPath(stringIDToTypeID(i), new File(in_ob[i].value));
                }
            }
            if (in_ob[i].type == "DescValueType.STRINGTYPE")
            {
                // putString(key,value)
                if (mod == "list")
                {
                    in_ad.putString(in_ob[i].value);
                } else
                {
                    in_ad.putString(stringIDToTypeID(i), in_ob[i].value);
                }
            }
            if (in_ob[i].type == "DescValueType.REFERENCETYPE")
            {
                // putReference(key,value)
                var af = Muclease.prototype.objectToActionReference(in_ob[i].value);
                if (mod == "list")
                {
                    in_ad.putReference(af);
                } else
                {
                    in_ad.putReference(stringIDToTypeID(i), af);
                }

            }
            if (in_ob[i].type == "DescValueType.LISTTYPE")
            {
                //  putList(key, value)
                var aList = new ActionList();
                _creatAD(in_ob[i].value, aList, "list");

                if (mod == "list")
                {
                    in_ad.putString(aList);
                } else
                {
                    in_ad.putList(stringIDToTypeID(i), aList);
                }
            }
            if (in_ob[i].type == "DescValueType.OBJECTTYPE")
            {
                //  putObject(key,classID,value)
                var aOb = new ActionDescriptor();
                _creatAD(in_ob[i].value, aOb, "object");

                if (mod == "list")
                {
                    in_ad.putString(aOb);
                } else
                {
                    in_ad.putObject(stringIDToTypeID(i),stringIDToTypeID(in_ob[i].objectType) ,aOb);
                }
            }

        }

    }

    return ad;
}






