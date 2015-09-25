$(window).load(function(){
  var x = 'x';
  var o = 'o';
  var currentplayer;
  var winningconditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  var boardcondition = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var players;
  var turncount = 0;
  var gamedone = false;
  var player1wins = 0;
  var player2wins = 0;
  var gametype;

//Two player option
  $('#twoplayer').click(function() {
    event.preventDefault();

    gametype = "2p";
    $("#firstplayer").css("visibility", "visible");
    $("#secondplayer").css("visibility", "visible");
    $("#playersubmit").css("visibility", "visible");
    $("#firstplayer").focus();

    $("#playersubmit").click(function() {
      event.preventDefault();
      var player1 = $("#firstplayer").val();
      var player2 = $("#secondplayer").val();
      game(player1, player2, gametype);
    })//player submit click

  });//twoplayer click

//Computer option
  $('#computer').click(function() {
    event.preventDefault();

    gametype = "comp";
    $("#firstplayer").css("visibility", "visible");
    $("#playersubmit").css("visibility", "visible");
    $("#firstplayer").focus();

    $("#playersubmit").click(function() {
      event.preventDefault();
      var player1 = $("#firstplayer").val();
      var player2 = "Computer";
      game(player1, player2, gametype);
    })//player submit click

  });

//Mass of functions//
function computerAI() {

}

function ifstatement(thisid) {
  for (i = 0; i < 9; i++) {
    if (i == thisid) {
    everything(thisid);
    }
  };
}

function game(player1, player2, gametype) {
  $('.gameselection').css("visibility", "hidden");
  $("#firstplayer").css("visibility", "hidden");
  $("#secondplayer").css("visibility", "hidden");
  $("#playersubmit").css("visibility", "hidden");
  currentplayer = playerselect(player1, player2);
  addNames(player1, player2);

if (gametype == "2p") {
    $(".square").click(function() {
      var checkvalid = true;

      if (gamedone == false) {
        var thisid = $(this).attr('id');
        ifstatement(thisid);
      }
    });//square click
  } else if (gametype == "comp") {
    if (currentplayer == "o") {
      var checkvalid = true;
      if (gamedone == false) {
      var thisid = computerAI();
      ifstatement(thisid);
      }
    } else if (currentplayer == "x") {
      $(".square").click(function() {
        var checkvalid = true;

        if (gamedone == false) {
          var thisid = $(this).attr('id');
          ifstatement(thisid);
        }
      });//square click
    };
  };
}//game function

  function everything(thisid) {
    checkvalid = startturn(thisid, currentplayer);
    if (checkvalid == true) {
      writeboard(thisid, currentplayer);
      wincheck(currentplayer);
      if (gamedone == false) {
        turntrack(turncount);
        if (gamedone == false) {
        currentplayer = playerswitch(currentplayer);
        announcer(currentplayer);
        };
      };
    }
  }

  function turntrack(count) {
    if (count >= 8) {
      $("#announcer").html('Game is a Draw!');
      gamedone = true;
      restart();
    } else {
      turncount++;
    }
  };

  function wincheck(currentplayer) {
    var checkw = 0;

    winningconditions.forEach(function(win) {
      if (boardcondition[win[0]] == currentplayer && boardcondition[win[1]] == currentplayer && boardcondition[win[2]] == currentplayer) {
        checkw++;
        if (checkw == 1) {
          $("#announcer").html(players[currentplayer] + " is the Winner!");
          gamedone = true;
          $(".grid").children().children().addClass("disable");
          restart();
          wincount();
        }
      }
    });
  };

  function wincount() {
    if (currentplayer == "x") {
      player1wins++;
      $('#player1wins').html("Wins: " + player1wins);
    } else if (currentplayer == "o") {
      player2wins++
      $('#player2wins').html("Wins: " + player2wins);
    }
  };

function restart() {
  $("#restart").css("visibility", "visible");
  $("#newplayers").css("visibility", "visible");

  $("#restart").click(function() {
  boardcondition = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  turncount = 0;
  gamedone = false;
  $("#restart").css("visibility", "hidden");
  $("#newplayers").css("visibility", "hidden");
  $(".grid").children().children().removeClass("o");
  $(".grid").children().children().removeClass("x");
  $(".grid").children().children().removeClass("disable");
  $("#announcer").html(players[currentplayer] + "'s turn");
  });

  $("#newplayers").click(function() {
    location.reload();
  });
};
  function writeboard(thisid, currentplayer) {
    boardcondition[thisid] = currentplayer;
  };

  function startturn(thisid) {
    var validspace = validspacecheck(thisid);
    if (validspace == true) {
      $("#" + thisid).addClass(currentplayer);
      $("#" + thisid).addClass("disable");
      return true;
    } else {
      return false;
    }
  };

  function validspacecheck(id) {
    var check;
    if ($('#' + id).hasClass("disable")) {
      check = false;
    } else {
      check = true;
    }
    return check;
  };

  function playerswitch(current) {
    var next;
    if (current == 'x') {
      next = 'o';
    } else {
      next = 'x';
    };
    return next;
  };

  function announcer(currentplayer) {
    $("#announcer").html(players[currentplayer] + "'s turn");
  }

  function addNames(p1, p2) {
  $("#player1").html(p1);
  $("#player2").html(p2);
};

  function playerselect(player1, player2) {
    var number = Math.floor((Math.random() * 2) + 1);
    if (number === 1) {
      players = {x: player1, o: player2};
      $("#announcer").html(players.x + " goes first");
      return x;
    } else if (number === 2) {
      players = {x: player1, o: player2};
      $("#announcer").html(players.o + " goes first");
      return o;
    }
  };

});//doc ready
