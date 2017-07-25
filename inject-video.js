//  classificationSecondCategory = classificationSecondCategory.substr(classificationSecondCategory.indexOf("    ")+4);
//  document.getElementsByClassName('pl-products-item__link')[0].href

// var pidsPath = document.getElementsByClassName('pl-products-item__link')

// pids = pidsPath.replace(/^.*[\\\/]/, '');   

// https://www.mrporter.com/mens/search?keywords=globe   (allows search terms)
  
var imageType = "";
var subImageType = 1;  //group 2 is individual
var pidsPath = "";

var arImageTypes = ["ou","mp4","in"];
var site = "";
var subSite = "";
var imageClass = "";  
var typeOfImages = 0;
var filename = "";
var arPIDs = [];
var arFulcrumDesignerPIDs = [];
var arFulcrumProductDescriptionPIDs = [];
var arFulcrumProductNotesPIDs = [];
var arFulcrumColourPIDs = [];
var arFulcrumCategoryPIDs = [];
var arFulcrumSubcategoryPIDs = [];
var fulcrumDesigner = "";
var fulcrumProductDescription = "";
var fulcrumProductNotes = "";
var fulcrumColour = "";
var fulcrumCategory = "";
var fulcrumSubcategory = "";
var userDefinedPIDs = "";
var i = 0;
var j = 0;

var napImageWidth = 390;
var napImageHeight = 585;
var napVideoWidth = 420;
var napVideoHeight = 443;
var mrpImageWidth = 464;
var mrpImageHeight = 475;
var mrpVideoWidth = 464;
var mrpVideoHeight = 475;

var tableHTML = "<html><head><link href='https://rawgit.com/aaronrainbird/work-tools/master/video-js.css' rel='stylesheet'><script language = 'javascript'></script><!-- If you'd like to support IE8 --><script src='https://rawgit.com/aaronrainbird/work-tools/master/video.js'></script><script language = 'javascript'>function updateMedia() { for (var t = 0;t<document.getElementsByTagName('video').length;t++) { if (document.getElementsByTagName('source')[t].src.search('t=03') != -1) {document.getElementsByTagName('source')[t].src = document.getElementsByTagName('source')[t].src.substr(0,document.getElementsByTagName('source')[t].src.search('mp4')+3) + '?' + escape(new Date()) + '#t=03'; } else { document.getElementsByTagName('source')[t].src = document.getElementsByTagName('source')[t].src.substr(0,document.getElementsByTagName('source')[t].src.search('mp4')+3) + '?' + escape(new Date()); } document.getElementsByTagName('video')[t].load(); document.getElementsByTagName('video')[t].pause(); } for (var x = 0;x<document.getElementsByTagName('img').length;x++) { document.getElementsByTagName('img')[x].src = document.getElementsByTagName('img')[x].src.substr(0,document.getElementsByTagName('img')[x].src.search('jpg')+3); } }</script><!-- If you'd like to support IE8 --><script src='https://rawgit.com/aaronrainbird/work-tools/master/video.js'></script></head><body><input type='button' value='Click to refresh images and videos on page' onclick='updateMedia()'><table class='tg' style='text-align: center; font-family: Georgia; border: 1px solid black;'><tr><th class='header'>OU</th><th class='header'>Video</th><th class='header'>IN</th></tr><tr>"



defineChoices();

function defineChoices() {                      //  Identifies what subsite you're on and what the image classes are on the live site.
  
    
    
    if(document.getElementsByClassName('channel_logo')[0] != undefined) {
         subSite = "fulcrum";
         getFulcrumInfo();
    
        if(document.getElementsByClassName('channel_logo')[0].alt.search('MRP') != -1)  {
              site = "MrP";      
        }
        else if(document.getElementsByClassName('channel_logo')[0].alt.search('NAP') != -1) {
              site = "NAP";   
        }
    }
    else if (document.URL.search('net-a-porter') != -1) {
        site = "NAP";
        imageClass = "product-image";
    }
    else if (document.URL.search('mrporter') != -1) {
        site = "MrP";
        if (document.getElementsByClassName('pl-products-item__link').length > 1) {
            imageClass = "pl-products-item__link";
        }
        else {
            imageClass = "product-image";
        }    
    }
   
    findPid();    // Finds the PIDs on the page.
             
    if (arPIDs.length > 0) {
        typeOfImages = prompt('What images would you like to view on the ' + site + ' site? \n1. All images on Page\n2. User defined PIDs');
    }
    else {
        if (subSite != "fulcrum") {
            if (site != "NAP" && site != "MrP") {
                var siteChoice = prompt("You don't appear to be on any of the YNAP group sites. Which site would you like to search? Choose 1 or 2. \n1. NAP \n2. MrP");
                if (siteChoice == 1) {
                    site = "NAP";
                }
                else {
                    site = "MrP";
                }
          
              userDefinedPIDs = prompt('Type multiple 6 or 7 digit PIDs below to search them on the ' + site + ' site.\n \n Use only spaces or commas as a separator, they can be mixed. \n \n');
             // userDefinedPIDsSeparator = userDefinedPIDs.match(/\D/)[0];
              arPIDs = userDefinedPIDs.split(/[\s,]+/);
              // userDefinedPIDs = userDefinedPIDs.replace(/[^0-9]+/g, '');   
              // arPIDs = userDefinedPIDs.match(/.{1,6}/g)

      
            }
          }
      }
        
    if (typeOfImages == 2 && arPIDs.length > 0) {     // Chosen user defined PIDs but there's some on the page.
        var includePIDs = prompt('There are PIDs on this page, want to include those?\n1. Yes\n2. No');
        if (includePIDs == 1) {
                               userDefinedPIDs = prompt('Type multiple 6 or 7 digit PIDs below to search them on the ' + site + ' site.\n \n Use only spaces or commas as a separator, they can be mixed. \n \n',arPIDs.join(','));
            //  userDefinedPIDsSeparator = userDefinedPIDs.match(/\D/)[0];
              arPIDs = userDefinedPIDs.split(/[\s,]+/);
        }
        else {
               userDefinedPIDs = prompt('Type multiple 6 or 7 digit PIDs below to search them on the ' + site + ' site.\n \n Use only spaces or commas as a separator, they can be mixed. \n \n');
             // userDefinedPIDsSeparator = userDefinedPIDs.match(/\D/)[0];
              arPIDs = userDefinedPIDs.split(/[\s,]+/);
        }
    }
    else if (arPIDs.length == 0) {    // No PID numbers on the page, just take user search.
          userDefinedPIDs = prompt('Type multiple 6 or 7 digit PIDs below to search them on the ' + site + ' site.\n \n Use only spaces or commas as a separator, they can be mixed. \n \n');
           //   userDefinedPIDsSeparator = userDefinedPIDs.match(/\D/)[0];
              arPIDs = userDefinedPIDs.split(/[\s,]+/);
    }
    
 }


function findPid() {                // Finds the PIDs on the page on NAP or MrP sites only.  NOT FULCRUM.
   
    for (var j = 0; j < document.getElementsByClassName(imageClass).length; j++) {
         
        if (site == "MrP") {
            
            if (document.getElementsByClassName('pl-products-item__link').length > 1) {
                var pidsPath = document.getElementsByClassName(imageClass)[j].href; 
            }
            else if (document.getElementsByClassName('product-carousel__image  product-carousel__item--current') != undefined) {
              console.log("test");
                var pidsPath = document.getElementsByClassName(imageClass)[j].childNodes[1].childNodes[1].src;
                
            }

          if (pidsPath != undefined) {
          
            var pidsFull = pidsPath.replace(/^.*[\\\/]/, '');         
            arPIDs.push(pidsFull.slice(0,6));
          }
           
        }
         
        if (site == "NAP") {

            var pidsPath = document.getElementsByClassName(imageClass)[j].childNodes[1].pathname;

            if (pidsPath.slice(0,8) == '/product') {
                var pidsFull = pidsPath.replace('/product/', '');    

            }
            else {
                var pathArray = window.location.pathname.split( '/' );
                var pidsFull = pidsPath.replace("/" + pathArray[1] + "/" + pathArray[2] + "/product/", '');
            }

            arPIDs.push(pidsFull.slice(0,6));

        }
        
    }
    
}


function tableCell() {
     
    if (a == 1) {   // 2nd cell is video cell.
         if (site == "MrP") {
             
             tableHTML +=  "<td class='columns' style='background-color: lightgrey;'><video id='my-video' class='video-js' preload='auto' controls data-setup='{}' width='" + mrpVideoWidth + "px'  height='" + mrpVideoHeight + "px'><source type='video/mp4' src='https://video.mrporter.com/videos/productPage/" + arPIDs[i] + "_detail.mp4?" + timeDelay + "'></video><BR>" + arPIDs[i] + "_" + arImageTypes[a] + "</td>";
         }
            else if (site == "NAP") {
             tableHTML +=  "<td class='columns' style='background-color: lightgrey;'><video id='my-video' class='video-js' preload='auto' controls data-setup='{}' width='" + napVideoWidth + "px'  height='" + napVideoHeight + "px'><source type='video/mp4' src='https://video.net-a-porter.com/videos/productPage/" + arPIDs[i] + "_detail.mp4?" + timeDelay + "'></video><BR>" + arPIDs[i] + "_" + arImageTypes[a] + "</td>";
         }
        }
        
    else if (a == 2){
        console.log(arImageTypes[a])
        if (site == "MrP") {
            tableHTML += "<td class='columns' style='background-color: lightgrey;'><IMG SRC='" + imageFileLocation() + "' onmouseover=this.src='https://cache.mrporter.com/images/products/" + arPIDs[i] + "/" + arPIDs[i] + "_mrp_bk" + "_xl.jpg?" + escape(new Date()) + "' onmouseout=this.src='https://cache.mrporter.com/images/products/" + arPIDs[i] + "/" + arPIDs[i] + "_mrp_in" + "_xl.jpg?" + escape(new Date()) + "' width='" + mrpImageWidth + "px' height='" + mrpImageHeight + "px'><BR>";
          
        }
        else {
            tableHTML += "<td class='columns' style='background-color: lightgrey;'><IMG SRC='" + imageFileLocation() + "' onmouseover=this.src='https://cache.net-a-porter.com/images/products/" + arPIDs[i] + "/" + arPIDs[i] + "_bk_pp.jpg?" + escape(new Date()) + "' onmouseout=this.src='https://cache.net-a-porter.com/images/products/" + arPIDs[i] + "/" + arPIDs[i] + "_in_pp.jpg?" + escape(new Date()) + "' width='" + napImageWidth + "px' height='" + napImageHeight + "px'><BR>";
            
            // https://cache.net-a-porter.com/images/products/854930/854930_bk_pp.jpg?Thu%20Apr%2006%202017%2016%3A30%3A52%20GMT+0100%20(BST)
            
            /*
             tableHTML += "<td class='columns' style='background-color: lightgrey;'><IMG SRC='" + imageFileLocation() + "' onmouseover=this.src='https://cache.net-a-porter.com/images/products/" + arPIDs[i] + "/" + arPIDs[i] + "_bk_pp.jpg?" + escape(new Date()) + "' onmouseout=this.src='https://cache.net-a-porter.com/images/products/" + arPIDs[i] + "/" + arPIDs[i] + "_in_pp.jpg?" + escape(new Date()) + "' width='" + napImageWidth + "px' height='" + napImageHeight + "px'><BR>"; 
            
            */
        } 
            tableHTML += filename + "</td>";
        
    }
    
        else {
         
        if (site == "MrP") {
            tableHTML += "<td class='columns' style='background-color: lightgrey;'><IMG SRC='" + imageFileLocation() + "' width='" + mrpImageWidth + "px' height='" + mrpImageWidth + "px'><BR>";
          
        }
        else {
            tableHTML += "<td class='columns' style='background-color: lightgrey;'><IMG SRC='" + imageFileLocation() + "' width='" + napImageWidth + "px' height='" + napImageHeight + "px'><BR>";
            
        } 
            tableHTML += filename + "</td>";
        }
}


function imageFileLocation() {                      //  Pulls the location of the files.
    
   if (site == "MrP") {  //MrP
        filename = arPIDs[i] + "_mrp_" + arImageTypes[a];
        return "https://cache.mrporter.com/images/products/" + arPIDs[i] + "/" + arPIDs[i] + "_mrp_" + arImageTypes[a] + "_xl.jpg?" + escape(new Date());       
    }
    else if (site == "NAP") {    //NAP
        filename = arPIDs[i] + "_" + arImageTypes[a];
      
        return "https://cache.net-a-porter.com/images/products/" + arPIDs[i] + "/" + arPIDs[i] + "_" + arImageTypes[a] + "_pp.jpg?" + escape(new Date());
           
    }
    
}






function getFulcrumInfo() {
    
        clean(document.body);
          
    for (var l=0; l < document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes.length; l++) {
    
            if (document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes.length > 19) {    //Confirm it's a row?
               
                                   
                    if (document.getElementById("image_icon_" +  document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[1].textContent + "_15").src.search("film") > 0) {
                            
                    arPIDs.push(document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[1].textContent);
                
                fulcrumDesigner = document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes[1].childNodes[0].childNodes[0].textContent;
                
                arFulcrumDesignerPIDs.push(fulcrumDesigner.trim());
                
                fulcrumProductDescription = document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes[1].childNodes[1].childNodes[0].textContent;
 
                arFulcrumProductDescriptionPIDs.push(fulcrumProductDescription.trim());
                
                fulcrumProductNotes = document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes[1].childNodes[2].textContent;
  
                arFulcrumProductNotesPIDs.push(fulcrumProductNotes.trim());   
                    
                fulcrumColour = document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes[2].childNodes[5].textContent
  
                arFulcrumColourPIDs.push(fulcrumColour.trim());  
                    
                 fulcrumCategory = document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes[2].childNodes[2].textContent;
  
                arFulcrumCategoryPIDs.push(fulcrumCategory.trim());  
                    
                 fulcrumSubcategory =  document.getElementById('photography_worklist_details').childNodes[0].childNodes[2].childNodes[l].childNodes[2].childNodes[0].textContent;  
  
                arFulcrumSubcategoryPIDs.push(fulcrumSubcategory.trim());      
                 }              
                   
            }        
    typeOfImages = 5;    
    }
}




// Ask when to start in video.

var timeDelay = escape(new Date());   
var timeChoice = prompt("Start from beginning or a few seconds in for colour matching? Choose 1 or 2. \n1. Start from beginning \n2. Few seconds in");
if (timeChoice == 2) {
    timeDelay += "#t=03";
}

if (subSite == "fulcrum") {   //Fulcrum
    for (var i = 0; i < arPIDs.length; i++) {
        for (var a = 0; a < 3; a++) {
            tableCell();
        }
                tableHTML += "</tr><tr><td colspan='3' style='border: 1px solid black;'>"  + arFulcrumProductDescriptionPIDs[i] + "</SPAN><BR><SPAN>Colour: " + arFulcrumColourPIDs[i] + "</SPAN></td></tr>"; 
        
    }
}

else {        // Get Pid No's from page
    for (var i = 0; i < arPIDs.length; i++) {

        for (var a = 0; a < arImageTypes.length;a++) {
            tableCell();
        }
                    
            tableHTML += "</tr>";    // Put more info in here later if appropriate.
        
    }

}

tableHTML += "</table>";

// Write table to new tab.

var x = window.open();
x.document.open();
x.document.write(tableHTML);
x.document.close();



function clean(node)
{
  for(var n = 0; n < node.childNodes.length; n ++)
  {
    var child = node.childNodes[n];
    if
    (
      child.nodeType === 8 
      || 
      (child.nodeType === 3 && !/\S/.test(child.nodeValue))
    )
    {
      node.removeChild(child);
      n --;
    }
    else if(child.nodeType === 1)
    {
      clean(child);
    }
  }
}




// window.MRP_PL.state.listing.metadata.categories  Could you cycle through categories? Although this array is a dead end.

// window.MRP_PL.state.listing.products.items[1].leafCategoryIds[0]  Use to get category? Could lead to the Rollover.
