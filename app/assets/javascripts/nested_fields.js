$(document).ready(function(){
    // so the nestedForm is only cloned in pages where there actualy is one.
    if($(".duplicatable-nested-form").size() > 0){
        nestedForm = $(".duplicatable-nested-form").last().clone();
    }
    $(".form").on("click", ".duplicate-nested-form", function(event){
        event.preventDefault();
        lastNestedForm = $(".duplicatable-nested-form").last();
        newNestedForm = $(nestedForm);
        formsOnPage = $(".duplicatable-nested-form").size();
        
        $(newNestedForm).find("label").each(function(){
            oldLabel = $(this).attr("for");
            newLabel = oldLabel.replace(new RegExp(/_[0-9]+_/), "_" + formsOnPage + "_");
            $(this).attr("for", newLabel);
        });

        $(newNestedForm).find("select,input").each(function(){
            oldId = $(this).attr("id");
            newId = oldId.replace(new RegExp(/_[0-9]+_/), "_" + formsOnPage + "_");
            $(this).attr("id", newId);

            oldName = $(this).attr("name");
            newName = oldName.replace(new RegExp(/\[[0-9]+\]/), "[" + formsOnPage + "]");
            $(this).attr("name", newName);
        });

        $(newNestedForm).clone().appendTo(".nested-forms");
    });

    $(".nested-forms").on("click", ".remove-duplicate-nested-form", function(event){
        event.preventDefault();
        $(this).parent(".duplicatable-nested-form").slideUp().remove();
    });
});
