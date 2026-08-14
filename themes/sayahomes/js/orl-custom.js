// $(document).ready(function() {
//     $(".chat-box").on("click", function(event) {
//         event.preventDefault();        
//         $('iframe#konverse-chat-frame').attr('src', 'https://app.konverse.ai/thor/chat/CE5A798BDA037');
//         $('iframe#konverse-chat-frame').css({'width' : '386px', 'height' : '652px'});
//         $('div#konverse-container').addClass('k-fadeFirst k-active');
//         return false;
//     });
// });

jQuery(document).ready(function(){
    jQuery('a.read-more').on('click', function(event){
        //event.preventDefault();
        jQuery('.form_div').slideToggle('slow');
    });

// $('.Show-HideDiv').hide();
//   $('input[type="radio"]').click(function() {
//     // alert("test")
//             var inputValue = $(this).attr("value");
//         if (inputValue == 'no') {
//             $('.Show-HideDiv').hide()
//         } else {
//             $('.Show-HideDiv').show()
//         }
//     });


  $('a.read-more, .e-stop').click(function(event){
   //event.stopPropagation();
});
   $('body').click(function() {
   $('.form_div').slideUp('slow');
});

      $('a.serch-click').click(function() {
   $('#edit-search-api-fulltext').focus();
});


 $('.VIEW4BHk_drop li').mouseover(function(){
    $(this).css({'background-color' : '#f1f1f1', 'border-radius' : '5px', 'cursor' : 'pointer', });
  });
  $('.VIEW4BHk_drop li').mouseout(function(){
    $(this).css({'background-color': 'white',  });
  }); 

     
});

// jQuery(document).ready(function() {
// jQuery('#audio-control2').on('click', function() {

//         if (jQuery(this).parent().children('.box2').children('#myVideo_partner').prop('muted')) {
//             jQuery(this).parent().children('.box2').children("#myVideo_partner").prop('muted', false);
//             jQuery(this).children('.icon-soundoff').addClass('act');
                
//         } else {
//             jQuery(this).parent().children('.box2').children('#myVideo_partner').prop('muted', true);
//             jQuery(this).children('.icon-soundoff').removeClass('act');
//         }
//     });

     

//     });

jQuery(document).ready(function(){
    // jQuery('div#audio-control2').on('click', function(){
    //     var childClass = jQuery(this).children().attr('class');
    //     if(childClass !='icon-soundoff act'){
    //         jQuery(this).children().addClass('act');
    //     }else{
    //         jQuery(this).children().removeClass('act');
    //     }
    // });



jQuery('div#audio-control2').on('click', function(){
         if (jQuery("#myVideo_partner").prop('muted')) {
            jQuery("#myVideo_partner").prop('muted', false);
            jQuery('.icon-soundoff').addClass('act')
                //jQuery(this).text('Mute');
                // or toggle class, style it with a volume icon sprite, change background-position
        } else {
            jQuery("#myVideo_partner").prop('muted', true);
            //jQuery(this).text('Unmute');
            jQuery('.icon-soundoff').removeClass('act')
        }
     });

    $('#myVideo_partner').parent().siblings('#audio-control2').css('display','block');
     $('img').parent('.box2 ').siblings('#audio-control2').css('display','none'); 

   


     
}); 

jQuery(document).ready(function(){ 
    jQuery('#enquery1, #enquery2').on('click', function(){
        jQuery(this).hide();

    });
 
  });

jQuery(document).ready(function(){

    jQuery('div#audio-control').on('click', function(){
         if (jQuery("#director_video-MeSsAgE").prop('muted')) {
            jQuery("#director_video-MeSsAgE").prop('muted', false);
            jQuery('.icon-soundoff').addClass('act')
                //jQuery(this).text('Mute');
                // or toggle class, style it with a volume icon sprite, change background-position
        } else {
            jQuery("#director_video-MeSsAgE").prop('muted', true);
            //jQuery(this).text('Unmute');
            jQuery('.icon-soundoff').removeClass('act')
        }
     });

     jQuery('.img-hover-box').parent('.more-about-img-box').children('#audio-control').css('display','none'); 

     

     });  

//Brockrage Logo
jQuery(document).ready(function(){
    jQuery(".so").click(function(){
      jQuery(".viewbrock").addClass("sho-1");
    });
  });





 // dk sh
    jQuery(document).ready(function($){
        jQuery(".continue").on("click", function(){
            jQuery(".page2").removeClass('hide1')
            jQuery(".page2").addClass('open1')
            jQuery(".page1").addClass('hide1')
        })
        // jQuery(".exit").on("click", function(){
        //  jQuery(".page3").addClass('open')
        //  jQuery(".page1").addClass('hide')
        // })
        jQuery(".not-accept").on("click", function(){
            jQuery(".page3").addClass('open1')
            jQuery(".page2").removeClass('open1')
            jQuery(".page2").addClass('hide1')
        })
        jQuery(".accept").on("click", function(){
            jQuery(".page5").addClass('open1')
            jQuery(".page2").removeClass('open1')
            jQuery(".page2").addClass('hide1')
        })

    });

jQuery(document).ready(function(){
    jQuery(".cont_code").val("+91");
});