$().ready(function() {

    $('textarea.tinymce').tinymce({
        // Location of TinyMCE script
        script_url : template_url + '/js/tiny_mce/tiny_mce.js',

        // General options
        theme : "advanced",
        plugins : "pagebreak,style,layer,table,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

        // Theme options
        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
        theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
        theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_statusbar_location : "bottom",
        theme_advanced_resizing : true,

        // Example content CSS (should be your site CSS)
        content_css : "",

        // Drop lists for link/image/media/template dialogs
        template_external_list_url : "lists/template_list.js",
        external_link_list_url : "lists/link_list.js",
        external_image_list_url : "lists/image_list.js",
        media_external_list_url : "lists/media_list.js",

        // Replace values for the template plugin
        template_replace_values : {
            username : "Some User",
            staffid : "991234"
        }
    });
    
    var validateform = $("#validate-form").validate();
    $("#reset-validate-form").click(function() {
        validateform.resetForm();
    });
    
    // ===============================================
    // bind the News form using 'ajaxForm' 
    $('#validate-form').ajaxForm({
        beforeSubmit: function (arr, data, options)
        {
            $('#js_news_message').attr('class', 'alert loading').html('Submitting Form...').slideDown(300);
            return true;
        },
        success: news_result,
        timeout: 5000 
    });

    // Callback function for the News ajaxForm 
    function news_result(response, statusText, xhr, $form)  
    { 
        // Parse the JSON response
        var result = jQuery.parseJSON(response);
        if (result.success == true)
        {
            // Display our Success message, and ReDraw the table so we imediatly see our action
            $('#js_news_message').attr('class', 'alert success').html(result.message);
        }
        else
        {
            $('#js_news_message').attr('class', 'alert ' + result.type).html(result.message);
        }
        $('#js_news_message').delay(5000).slideUp(300);
    }
});