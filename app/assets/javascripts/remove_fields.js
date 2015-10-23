//function remove_fields(e){
    //e.preventDefault();
    ////this will put the destroy value to true
    //$(this).prev("input[type=hidden]").value = "1";
    //$(this).parent(".field").hide();
//}

$(document).ready(function(){
    if($(".duplicatable-nested-form").length > 0){
        nestedForm = $(".duplicatable-nested-form").last.clone();
    }
    $(".duplicate-nested-form").click(function(event){
        event.preventDefault();
        lastNestedForm = $(".duplicatable-nested-form").last();
        newNestedForm = $(nestedForm);
        formsOnPage = $(".duplicatable-nested-form").length();
        
        $(newNestedForm).find("label").each(function(){
            oldLabel = $(this).attr("for");
            newLabel = oldLabel.replace(new RegExp(_/0-9/+_, "_#{formsOnPage}_"));
            $(this).attr("for") = newlabel;
        });

        $(newNestedForm).find("select,input").each(function(){
            oldId = $(this).attr("id");
            newId = oldId.replace(new RegExp(_/0-9+_, "_#{formsOnPage}"));
            $(this).attr("id") = newId;

            oldName = $(this).attr("name");
            newName = oldName.replace(new RegExp(_/0-9+_, "_#{formsOnPage}"));
            $(this).attr("name") = newName;
        });

        $(newNestedForm).insertAfter(lastNestedForm);
    });

    $(".duplicatable-nested-form").on("click", ".delete-link", function(event){
    event.preventDefault();
    //this will put the destroy value to true
    //console.log()
    $(this).prev("input[type=hidden]").val("true");
    $(this).parent(".duplicatable-nested-form").hide();
    });
});
