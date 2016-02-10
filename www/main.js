function submitForm(){
	   $('.detailContainer').hide("slow");
		console.log( 'submitForm' );
		
        var $this = $(this);
        var search = $('#search').val();
        
        if( search === ""){
            alert('Votre recherche: 42')
        }
        else{
            $.ajax({
                url: 'https://fr.wikipedia.org/w/api.php?action=query&format=json',
                data: '&list=search&srsearch=' + search,
                type: 'GET',
                dataType: 'json',
                success: onRequestSuccess
            }); 
        }
        $('.results ul').empty();
}
        
function onRequestSuccess(batchcomplete) {

    console.log('onRequestSuccess');
    //console.log(batchcomplete);

    $('.results h1').html(batchcomplete.query.searchinfo.totalhits + ' correspondance(s) pour le terme:' + batchcomplete.query.search[0].title);

    var records = batchcomplete.query.search;

    var content = '';
    for (var i = 0, recordslenght = records.length; i < recordslenght; i++) {
        content += '<li class="title">' + records[i].title + '</li>' + '<p>' + records[i].snippet;
        document.getElementById('list').innerHTML = content;
    }
    $('.title').click(function () {
         title = $(this)
.text();
        console.log(title);
           $.ajax({
                url: 'https://fr.wikipedia.org/w/api.php?action=query&format=json',
                data: '&prop=revisions&rvprop=content&titles=' + title,
                type: 'GET',
                dataType: 'json',
                success: onRequestSuccessTitle
            }); 
    });
}

function onRequestSuccessTitle (bactchomplete){
    console.log('onRequestSuccessTilte');
    $('.results ul').empty();
    $('.detailContainer').show("slow");
    var page = bactchomplete.query.pages;
    for (var key in page) {
        $('.detailContainer h3').text(page[key].title);
        for (var key2 in page[key].revisions[0]) {
            if (key2 === "*") {
                $('.detailContainer p').text(page[key].revisions[0][key2]);
            }
        }
    }
}

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

// Handle the back button
//
function onBackKeyDown() {
    submitForm();
}


    
