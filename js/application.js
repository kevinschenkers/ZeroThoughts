$(document).ready(function() {

    // Initialise. If the database doesn't exist, it is created
    var lib = new localStorageDB("library");

//Later wellicht nodig
//lib.drop();
//lib.commit(); 


    // Check if DB exists
    if (lib.isNew()) {




        // Create my "table"
        lib.createTable("breakthings", ["message"]);

        // insert initital data
        lib.insert("breakthings", {message: "Start your break with some meditation"});


        // commit the database to localStorage
        lib.commit();


    } else {
        console.log('DB not new');
    }
    // select all books
    var allbooks = lib.query("breakthings");
    lib.commit();
    for (x in allbooks)
    {
        //alert(allbooks[x]['message']);
    }




    $('#safebutton').click(function() {

        if ($('#safekeeper').val() != '') {


            var newvalues = $('#safekeeper').val();

            lib.insert("breakthings", {message: newvalues});
            lib.commit();

            $('#safekeeper').val('');
            //refreshall();
        }

    });



    $('#safeshow').click(function() {

        
        $('#safediv').fadeToggle(2000);

        //alert(JSON.parse(localStorage["checkins"]).length);


        refreshall();


    });


    function refreshall() {
        var allCheckins = lib.query("breakthings");
        lib.commit();



        var totalcheck = '';

        for (x in  allCheckins)
        {
            //alert( oldvalues[x] );


            totalcheck = totalcheck + '<div class="safeitem"><span id="' + allCheckins[x]['ID'] + '" class="glyphicon glyphicon-ok deleteme">&nbsp;</span>' + allCheckins[x]['message'] + '</div>';

        }

        $('#safediv').html(totalcheck);
    }




    $('#safediv').delegate('span', 'click', function() {



        var confirmme = confirm('If you are sure, well done :)');

        if (confirmme) {
            var name = $(this).attr('id');
            //alert(name);

            //delete where
            deleteme = lib.deleteRows("breakthings", {ID: name});
            lib.commit();

            refreshall();
        }
    });


});

