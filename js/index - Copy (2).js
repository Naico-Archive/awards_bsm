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
    $('#question3 ').hide();
    $('#end').hide();
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

$('#login_form').submit(function(){
    var username = $('#login_email').val();
    var password = $('#login_password').val();

    $.jStorage.set("pal_user_id", username);
    var form_data= {
        'username': username,
        'password': password
    };
    // req = $.ajax({
    //     url: 'https://getVesselTracker.com/ldap_test_awards_bsm.php',
    //     type: "post",
    //     data: form_data,
    //     beforeSend: function() {
    //         $(".spinner").css('display','inline');
    //         $(".spinner").center();
    //     },

    //     success : function(response) {
    //         if (response == 'success') {
    //         $('.login').hide();
    //         show_q1();           
    //         } else {
    //             login_failure();
    //         }
    //     }
    // });
    $('.login').hide();
    show_q1();           
    $('#login_password').blur();
    $('#login_email').blur();
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

function show_end(){
    hide_all();
    $('#end').show();
}

function save_results() {
    req = $.ajax({
        url: 'https://www.getvesseltracker.com/awards_bsm/save_award.php?username=vineeth.vijayan&result1='+ $('#answer1').val() +
            '&result2=' + $('#answer2').val(),
        beforeSend: function() {
            $(".spinner").css('display','block');
            $(".spinner").css('margin','auto');
        },

        success : function(results) {
            if (results == null) {
                alert('There was an error. Kindly try again in a few minutes.\n-vineeth.vijayan@bs-shipmanagment.com');
                $('.spinner').hide();
            } else {
                
            }
        }
    });
}