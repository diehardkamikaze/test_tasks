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
    skip_spaces(data, obj);

    if (data[obj.i] == '}' && ++obj.i)
        return (1);
    if (!handle_key(data, obj))
        return (0);
    if (data[obj.i] !== ':')
        return (0);

    ++obj.i;
    if (!json_parser(data, obj))
        return (0);
    while (data[obj.i] == ',')
    {
        obj.i++;
        skip_spaces(data, obj);
        if (!handle_key(data, obj))
            return (0);
        if (data[obj.i] !== ':')
            return (0);
        ++obj.i;

        if (!json_parser(data, obj))
            return (0);

    }
    if (data[obj.i] == '}' && ++obj.i)
        return (1);
    return (0);
}

function json_parser(data, obj)
{
    skip_spaces(data, obj);
    if (data[obj.i] === undefined)
        return (1);

    if (data[obj.i] == '{' && ++obj.i)
    {
        if(!handle_object(data, obj))
            return (0);
    } 
    else if (data[obj.i] == '"' && ++obj.i)
    {
        if (!handle_string(data, obj))
            return (0);
    }
    else
        return (0);
    skip_spaces(data, obj);

    return (1);
}

function json_valider(event)
{
    var data = textarea.value;
    var obj = {};

    obj.i = 0;
   // json_parser(data, obj);
    if (json_parser(data, obj) && data[obj.i] == undefined)
        result.innerHTML = "VALID";
    else
        result.innerHTML = "INVALID";
        //else result.innerHTML = "INVALID!";
    /* var i;

    i = 0;
    while (i < data.length)
    {
        while (is_space(data[i]))
            i++;
        if (data[i] != '{')
            return (0);
        i++;
        while (is_space(data[i]))
            i++;
        if (data[i] != '"')
            return (0);
        i++;
        while (is_alpha(data[i]))
            i++;
        if (data[i] != '"')
            return (0);
        i++;
        while (is_space(data[i])
            i++;
        if (data[i] != ':')
            return (0);

    }
    return (1); */
 
}

//main
var checkBtn = document.querySelector(".valider button");
var textarea = document.querySelector(".valider textarea");
var result = document.querySelector("div.result");
checkBtn.addEventListener("click", json_valider);