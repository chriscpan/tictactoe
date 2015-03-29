(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.game = game;
    this.el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var that = this;
    $(".TTT-game li").on("click", function(event){
      // alert("You clicked on me");
      var $target = $(event.currentTarget);
      that.makeMove($target);
    });
  };

  View.prototype.makeMove = function ($square) {
    var position = $square.data("pos");
    console.log(window.TTT.Board.isValidPos(position));
    try {
      window.TTT.Board.isValidPos(position);
    }
    catch(err){
      alert(err.msg);
    }
    // if (!TTT.Board.isValidPos(position)) {
    //   alert("The move is invalid");
    // }
    this.game.playMove(position);
    $square.attr("mark", this.game.currentPlayer);
    $square.text(this.game.currentPlayer);
    if (this.game.isOver()){
      if(this.game.winner()){
        alert(this.game.winner() + " has won!");
      } else {
        alert("no one wins!");
      }
    }
  };

  View.prototype.setupBoard = function () {
    var $div = $("<div></div>");
    for (var i = 0; i < this.game.board.grid.length; i++){
        var $ul = $("<ul></ul>");
        for (var j = 0; j <this.game.board.grid[0].length; j++){
          var $li = $("<li></li>");
          $li.data("pos", [i, j]); // position array
          $li.data("mark", null);
          $ul.append($li);
        }
        $div.append($ul);
    }
    $(".TTT-game").html($div);
    // console.log(this.game.board.grid.length);
  };

  // clickHandler: function (event) {
  //  $(event.currentTarget).data("pos");
  // }
})();
