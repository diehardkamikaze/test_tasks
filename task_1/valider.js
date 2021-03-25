function skip_spaces(data, obj)
{
    while (('\t' <= data[obj.i] && data[obj.i] <= "\r") || data[obj.i] == " ")
        obj.i++;
}

function handle_string(data, obj)
{
    while (data[obj.i] != '"' && obj.i < data.length)        
        obj.i++;
    if (data[obj.i] === undefined) 
        return (0);
        obj.i++;   
    return (1);
}


function handle_key(data, obj)
{
    if (data[obj.i] == '"' && ++obj.i)
    {
        if (!handle_string(data, obj))
            return (0);
    }
    else 
        return (0);
    skip_spaces(data, obj);
    return (1);
}

function handle_object(data, obj)
{
    var flag;
    skip_spaces(data, obj);

    if (data[obj.i] == '}' && ++obj.i)
        return (1);
    flag = 1;
    while (flag)
    {
        skip_spaces(data, obj);
        if (!handle_key(data, obj))
            return (0);
        if (data[obj.i] !== ':')
            return (0);
        ++obj.i;
        if (!json_parser(data, obj))
            return (0);
        if (data[obj.i] == ',')
            obj.i++;
        else flag = 0;
    }
    if (data[obj.i] == '}' && ++obj.i)
        return (1);
    return (0);
}

function handle_array(data, obj)
{
    var flag;
    skip_spaces(data, obj);
    
    if (data[obj.i] == ']' && ++obj.i)
        return (1);
    flag = 1;
    while (flag)
    {
        if (!json_parser(data, obj))
            return (0);
        if (data[obj.i] == ',')
            obj.i++;
        else flag = 0;
    }
    skip_spaces(data, obj);
    if (data[obj.i] == ']' && ++obj.i)
        return (1);
    return (0);
}

function json_parser(data, obj)
{
    var result = 0;
    skip_spaces(data, obj);

    if (data[obj.i] === undefined)
        result = 1;
    else if (data[obj.i] == '{' && ++obj.i)
        result = handle_object(data, obj);
    else if (data[obj.i] == '"' && ++obj.i)
        result = handle_string(data, obj);
    else if (data[obj.i] == "[" && ++obj.i)
        result = handle_array(data, obj);
    if (!result)
        return (0);

    skip_spaces(data, obj);
    return (1);
}

function json_valider(event)
{
    var data = textarea.value;
    var obj = {};

    obj.i = 0;
    if (json_parser(data, obj) && data[obj.i] == undefined)
        result.innerHTML = "VALID";
    else
        result.innerHTML = "INVALID";
 
}

//main
var checkBtn = document.querySelector(".valider button");
var textarea = document.querySelector(".valider textarea");
var result = document.querySelector("div.result");
checkBtn.addEventListener("click", json_valider);