/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // if (parseFloat(window.device.version) === 7.0) {
        //   document.body.style.marginTop = "20px";
        // }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentyearent = document.getyearentById(id);
        // var listeningyearent = parentyearent.querySelector('.listening');
        // var receivedyearent = parentyearent.querySelector('.received');

        // listeningyearent.setAttribute('style', 'display:none;');
        // receivedyearent.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};

function toTitleCase(str)
{ if(str)
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
};

Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function hide_all() {
    $('#btnBack').hide();
    $('#navbar').hide();
    $('.spinner_index').hide();
    $('#index_content').hide();
    $('#ajax_error').hide();
    $('#question1').hide();
    $('#question2').hide();
    $('#question3').hide();
    $('#question4').hide();
    $('#end').hide();
    $('#thankyou').hide();
}

var step_back = function() {};

var current_step = function() {};

var pal_user_id;
try{
    pal_user_id = $.jStorage.get("pal_user_id");
    $.jStorage.set("pal_user_id", '');
}
catch(err){    
}
if (pal_user_id == null) {
  hide_all();
  $('.login').show();
} else {
  show_years();
}

function login_failure() {
  $(".spinner").css('display','none');
  $("#ajax_error").show();
  $("#ajax_error").html('Wrong Email or Password. Please try again.');
  $("#ajax_error").attr('style','display:block; text-align:center;');
}

function login_entered() {
  $(".spinner").css('display','none');
  $("#ajax_error").show();
  $("#ajax_error").html('You have already submitted your polls.');
  $("#ajax_error").attr('style','display:block; text-align:center;');
}

$('#login_form').submit(function(){
    var username = $('#login_email').val();
    var password = $('#login_password').val();

    $.jStorage.set("pal_user_id", username);
    var form_data= {
        'username': username,
        'password': password
    };
    req = $.ajax({
        url: 'https://getVesselTracker.com/ldap_test_awards_bsm.php',
        type: "post",
        data: form_data,
        beforeSend: function() {
            $(".spinner").css('display','inline');
            $(".spinner").center();
        },

        success : function(response) {
            if (response == 'success') {
                $('#login_form').hide();
                show_q1();

                load_emp();

                $("#txt_best_emp").autocomplete({
                    source: best_emp,
                    minLength: 1,
                    matchFromStart: false,
                    messages: {
                        noResults: '',
                        results: function() {}
                    }
                });
                $("#txt_new_comer").autocomplete({
                    source: new_comer,
                    minLength: 1,
                    matchFromStart: false,
                    messages: {
                        noResults: '',
                        results: function() {}
                    }
                });
                $("#txt_new_trainee").autocomplete({
                    source: best_traniee,
                    minLength: 1,
                    matchFromStart: false,
                    messages: {
                        noResults: '',
                        results: function() {}
                    }
                });
                $("#txt_new_consultant").autocomplete({
                    source: best_consultant,
                    minLength: 1,
                    matchFromStart: false,
                    messages: {
                        noResults: '',
                        results: function() {}
                    }
                });

            } else if(response == 'Entered') {
                login_entered();
            } else {
                login_failure();
            }
        }
    });
    // $('#login_form').hide();
    // show_q1();           
    // $('#login_password').blur();
    // $('#login_email').blur();
    return false;
});


function show_q1(){
    hide_all();
    $('#question1').show();
}

function show_q2(){
    hide_all();
    $('#question2').show();
}

function show_q3(){
    hide_all();
    $('#question3').show();
}

function show_q4(){
    hide_all();
    $('#question4').show();
}

function show_end(){
    hide_all();
    $('#end').show();
    jQuery('#lbl_best_emp').text($('#txt_best_emp').val())
    jQuery('#lbl_new_comer').text($('#txt_new_comer').val())
    jQuery('#lbl_best_const').text($('#txt_new_consultant').val())
    jQuery('#lbl_best_Trainee').text($('#txt_new_trainee').val())
}

function save_results() {
    req = $.ajax({
        url: 'https://www.getvesseltracker.com/awards_bsm/save_award.php?' +
        'username='+ $('#login_email').val() +
        '&result1='+ $('#txt_best_emp').val() +
        '&result2='+ $('#txt_new_comer').val() +
        '&result3='+ $('#txt_new_consultant').val() +
        '&result4=' + $('#txt_new_trainee').val(),
        beforeSend: function() {
            $(".spinner").css('display','block');
            $(".spinner").css('margin','auto');
        },

        success : function(results) {
            console.log(results);
            if (results == null) {
                alert('There was an error. Kindly try again in a few minutes.\n-vineeth.vijayan@bs-shipmanagment.com');
                $('.spinner').hide();
            } else {
                hide_all();
                $('#thankyou').show();
            }
        }
    });
}




var best_emp = new Array();
var new_comer = new Array();
var best_traniee = new Array();
var best_consultant = new Array();

function load_emp(){
    var username = $('#login_email').val().split('@')[0];
    if(username != 'aansen.varkey') best_emp.push('Aansen Olakkattil Varkey');
    if(username != 'abdul.wahab') best_emp.push('Abdul Wahab');
    if(username != 'ajee.kurian') best_emp.push('Ajee M Kurian');
    if(username != 'aji.francis') best_emp.push('Aji Francis');
    if(username != 'anand.muthuswamy') best_emp.push('Anand Muthuswamy');
    if(username != 'binish.vj') best_emp.push('Binish VJ');
    if(username != 'binu.robert') best_emp.push('Binu Robert');
    if(username != 'briston.thomas') best_emp.push('Briston Thomas');
    if(username != 'cenoy.divakaran') best_emp.push('Cenoy Mangattu Divakaran');
    if(username != 'divya.mohan') best_emp.push('Divya C Mohan');
    if(username != 'divya.uthup') best_emp.push('Divya Elizabeth Uthup');
    if(username != 'dixy.avarachan') best_emp.push('Dixy Avarachan');
    if(username != 'fathimabeevi.rasheed') best_emp.push('Fathimabeevi A. Rasheed');
    if(username != 'sridharan.suryanaray') best_emp.push('G S Sridharan');
    if(username != 'gayathri.venugopal') best_emp.push('Gayathri Venugopal');
    if(username != 'jayasankar.ramakrish') best_emp.push('Jayasankar Ramakrishnan');
    if(username != 'jeethi.george') best_emp.push('Jeethi George');
    if(username != 'jijo.poulose') best_emp.push('Jijo Poulose');
    if(username != 'jinto.francis') best_emp.push('Jinto Francis');
    if(username != 'jisa.abraham') best_emp.push('Jisa Abraham');
    if(username != 'jolly.koshy') best_emp.push('Jolly Koshy');
    if(username != 'jose.george') best_emp.push('Jose Tuttu George');
    if(username != 'kishore.sahasranaman') best_emp.push('Kishore Sahasranaman');
    if(username != 'laurent.mendez') best_emp.push('Laurent Mendez');
    if(username != 'lidil.davis') best_emp.push('Lidil Davis K');
    if(username != 'liju.paul') best_emp.push('Liju Paul');
    if(username != 'mahesh.kadam') best_emp.push('Mahesh Kadam');
    if(username != 'meera.prasad') best_emp.push('Meera Prasad');
    if(username != 'megha.mohanan') best_emp.push('Megha Mohanan');
    if(username != 'minu.cherian') best_emp.push('Minu Mereena Cherian');
    if(username != 'nabila.poptiya') best_emp.push('Nabila S Poptiya');
    if(username != 'nandagopal.mohan') best_emp.push('Nandagopal Mohan');
    if(username != 'nandhini.gaur') best_emp.push('Nandini Gaur');
    if(username != 'nijo.jose') best_emp.push('Nijo Jose');
    if(username != 'nimi.manoharan') best_emp.push('Nimi A Manoharan');
    if(username != 'nisanth.vijay') best_emp.push('Nisanth Vijay');
    if(username != 'pavithra.baskaran') best_emp.push('Pavithra Baskaran');
    if(username != 'pawan.gaur') best_emp.push('Pawan Gaur');
    if(username != 'peter.paul') best_emp.push('Peter Paul');
    if(username != 'piyush.garg') best_emp.push('Piyush Garg');
    if(username != 'pradeep.joseph') best_emp.push('Pradeep Joseph');
    if(username != 'prasanth.gokuldas') best_emp.push('Prasanth Gokuldas');
    if(username != 'priyanka.naveen') best_emp.push('Priyanka Naveen');
    if(username != 'raamkumar.vijayakuma') best_emp.push('Raamkumar Vijayakumar');
    if(username != 'rahul.dedhia') best_emp.push('Rahul Dedhia');
    if(username != 'rajesh.vattakkeel') best_emp.push('Rajesh Vattakkeel');
    if(username != 'rajitha.govindan') best_emp.push('Rajitha Govindan');
    if(username != 'rajkumar.dwivedi') best_emp.push('Rajkumar Dwivedi');
    if(username != 'ramesh.iyer') best_emp.push('Ramesh Iyer');
    if(username != 'ranjith.c') best_emp.push('Ranjith C');
    if(username != 'ratheesh.ramaswamy') best_emp.push('Ratheesh R');
    if(username != 'remya.mohan') best_emp.push('Remya Mohan');
    if(username != 'rengaraj.rengasamy') best_emp.push('Rengaraj Ramasamy');
    if(username != 'renjana.ragavan') best_emp.push('Renjana M. Ragavan');
    if(username != 'resmi.chandrasekhara') best_emp.push('Resmi Chandrasekharan');
    if(username != 'retheesh.sankaranarayanan') best_emp.push('Retheesh Sankaranarayanan');
    if(username != 'rio.issac') best_emp.push('Rio Issac');
    if(username != 'saiprasad.narayanan') best_emp.push('Saiprasad Narayanan');
    if(username != 'sandeep.ramachandran') best_emp.push('Sandeep Ramachandran');
    if(username != 'sankar.ragavan') best_emp.push('Sankar Ragavan');
    if(username != 'santosh.chankane') best_emp.push('Santosh Chankane');
    if(username != 'saravanan.subramania') best_emp.push('Saravanan Subramanian');
    if(username != 'sourabh.trivedi') best_emp.push('Saurabh Trivedi');
    if(username != 'shabnam.ahmed') best_emp.push('Shabnam Ahmed');
    if(username != 'shahana.muhammed') best_emp.push('Shahana Muhammed');
    if(username != 'shalini.prasad') best_emp.push('Shalini Prasad');
    if(username != 'sharika.padiyath') best_emp.push('Sharika P');
    if(username != 'sheena.ignacious') best_emp.push('Sheena Ignacious');
    if(username != 'shyam.sadanandan') best_emp.push('Shyam T S');
    if(username != 'sijo.abraham') best_emp.push('Sijo Abraham');
    if(username != 'smijitha.sreenivasan') best_emp.push('Smijitha Sreenivasan');
    if(username != 'smitha.nair') best_emp.push('Smitha R Nair');
    if(username != 'smitha.soman') best_emp.push('Smitha Soman Pillai');
    if(username != 'sonia.varghese') best_emp.push('Sonia Varghese');
    if(username != 'soya.varghese') best_emp.push('Soya M Varghese');
    if(username != 'sreekanth.pillai') best_emp.push('Sreekanth Pillai');
    if(username != 'suganya.karuppaiya') best_emp.push('Suganya K');
    if(username != 'sujith.sreedhar') best_emp.push('Sujith Sreedhar');
    if(username != 'sumesh.kc') best_emp.push('Sumesh K C');
    if(username != 'sunil.ashar') best_emp.push('Sunil Ashar');
    if(username != 'sunil.thomas') best_emp.push('Sunil Thomas');
    if(username != 'sunitha.ramachandran') best_emp.push('Sunitha K R');
    if(username != 'suraj.singh') best_emp.push('Suraj Singh');
    if(username != 'susan.kurian') best_emp.push('Susan George Kurian');
    if(username != 'swapna.ps') best_emp.push('Swapna P S');
    if(username != 'tijoy.varghese') best_emp.push('Tijoy Mathew Varghese');
    if(username != 'trupti.kerkar') best_emp.push('Trupti Kerkar');
    if(username != 'vijay.halpeth') best_emp.push('Vijay Halpeth');
    if(username != 'vijeesh.vijayan') best_emp.push('Vijeesh Vijayan');
    if(username != 'vineeth.vijayan') best_emp.push('Vineeth Vijayan');
    if(username != 'vinu.abraham') best_emp.push('Vinu Abraham');
    if(username != 'vysakh.mohan') best_emp.push('Vysakh Mohan');

    best_consultant.push('Nityananda Patra');
    best_consultant.push('Aarathy Antony');
    best_consultant.push('Sayoojya');
    best_consultant.push('Vidyasagar');
    best_consultant.push('Neena Alotious');
    best_consultant.push('Vineesh Chenthamarakshan');
    best_consultant.push('Prasad C');
    best_consultant.push('Omkar Sawant');
    best_consultant.push('Mangesh Pille');

    if(username != 'abdul.wahab') best_traniee.push('Abdul Wahab');
    if(username != 'fathimabeevi.rasheed') best_traniee.push('Fathimabeevi A. Rasheed');
    if(username != 'gayathri.venugopal') best_traniee.push('Gayathri Venugopal');
    if(username != 'nandhini.gaur') best_traniee.push('Nandhini Gaur');
    if(username != 'peter.paul') best_traniee.push('Peter Paul');
    if(username != 'prasanth.gokuldas') best_traniee.push('Prasanth Gokuldas');
    if(username != 'priyanka.naveen') best_traniee.push('Priyanka Naveen');
    if(username != 'raamkumar.vijayakuma') best_traniee.push('Raamkumar Vijayakumar');
    if(username != 'renjana.ragavan') best_traniee.push('Renjana M. Ragavan');
    if(username != 'tijoy.varghese') best_traniee.push('Tijoy Mathew Varghese');

    if(username != 'aansen.varkey') new_comer.push('Aansen Olakkattil Varkey');
    if(username != 'ajee.kurian') new_comer.push('Ajee M Kurian');
    if(username != 'cenoy.divakaran') new_comer.push('Cenoy Mangattu Divakaran');
    if(username != 'sridharan.suryanaray') new_comer.push('G S Sridharan');
    if(username != 'jolly.koshy') new_comer.push('Jolly Koshy');
    if(username != 'kishore.sahasranaman') new_comer.push('Kishore Sahasranaman');
    if(username != 'liju.paul') new_comer.push('Liju Paul');
    if(username != 'nandagopal.mohan') new_comer.push('Nandagopal Mohan');
    if(username != 'nijo.jose') new_comer.push('Nijo Jose');
    if(username != 'nimi.manoharan') new_comer.push('Nimi A Manoharan');
    if(username != 'pavithra.baskaran') new_comer.push('Pavithra Baskaran');
    if(username != 'rahul.dedhia') new_comer.push('Rahul Dedhia');
    if(username != 'remya.mohan') new_comer.push('Remya Mohan');
    if(username != 'rio.issac') new_comer.push('Rio Issac');
    if(username != 'santosh.chankane') new_comer.push('Santosh Chankane');
    if(username != 'smijitha.sreenivasan') new_comer.push('Smijitha Sreenivasan');
    if(username != 'smitha.soman') new_comer.push('Smitha Soman Pillai');
    if(username != 'vijeesh.vijayan') new_comer.push('Vijeesh Vijayan');
    if(username != 'vineeth.vijayan') new_comer.push('Vineeth Vijayan');

}