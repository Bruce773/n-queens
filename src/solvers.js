/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  var solution = new Board({ 'n': n }); //fixme
  var numOfRooks = n;
  if (n > 1) {
    //outer for loop column
    for (var i = 0; i < n; i++) {
      // inner for loop column
      for (var j = 0; j < n; j++) {
        //check if row & colum conflict
        //place the rook at that position
        solution.rows()[i][j] = 1;
        //solution.togglePiece(i, j)
        numOfRooks--
        //if conflict not present and numOfRooks not zero
        if (solution.hasColConflictAt(j) || solution.hasRowConflictAt(i)) {
          //place the rook at that position
          solution.rows()[i][j] = 0;
          // solution.togglePiece(i, j);
          numOfRooks++;
          // decrease the rook quantity       
        }
      }
    }
  } else {
    solution.rows()[0][0] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  console.log(solution);
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = new Board({ 'n': n }); //fixme
  this.GetNoConflictQueenBoardIterration(solution, 0);
  debugger;
  console.log(solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.GetCurrentRowIndex = function (board, col, n) {

  var index = -1;
  for (var i = 0; i < n; i++) {
    if (board[i][col] === 1) {
      index = i;
    }
  }
  return index;
}

window.GetNoConflictQueenBoard = function (board, col) {
  var length = board.attributes[0].length;
  if (col < length) {
    var currentRowQueenIndex = this.GetCurrentRowIndex(board.attributes, col, length)
    if (currentRowQueenIndex !== -1) {
      board.attributes[currentRowQueenIndex][col] = 0;
      if (currentRowQueenIndex === length - 1) {
        if (GetNoConflictQueenBoard(board, col - 1) === true)
          return true;
      } else {
        var index = currentRowQueenIndex + 1;
        board.attributes[index][col] = 1;
        while (index < length) {
          if (board.hasAnyQueenConflictsOn(index, col)) {
            board.attributes[index][col] = 0;
            if (index === length - 1) {
              if (GetNoConflictQueenBoard(board, col - 1) === true)
                return true;
            } else {
              index++;
              board.attributes[index][col] = 1;
            }
          } else {
            board.attributes[index][col] = 1;
            index = 4;
          }
        }
        //board.attributes[currentRowQueenIndex + 1][col] = 1;
        if (GetNoConflictQueenBoard(board, col + 1) === true)
          return true;
      }
    } else {
      //loop over each row index 
      for (var i = 0; i < length; i++) {
        //place the queen at row col location
        board.attributes[i][col] = 1;
        //check conflict
        if (board.hasAnyQueenConflictsOn(i, col)) {
          //toggle the value
          board.attributes[i][col] = 0;
          // check if the current queen is on the last row and then go previous col
          if (i === length - 1) {
            if (GetNoConflictQueenBoard(board, col - 1) === true)
              return true;
          }
        } // No conflict go to next col and recursilvely call the fucntion 
        else {
          if (GetNoConflictQueenBoard(board, col + 1) === true)
            return true;
        }
      }
    }
  }
  // this is base case when I get out of thz
  return true;

}

window.GetNoConflictQueenBoardIterration = function (board, col) {
  var length = board.attributes[0].length;

  while (col < length && col > -1) {
    // check if a queen is already present at that column
    var checkQueenIndex = this.GetCurrentRowIndex(board.attributes, col, length)
    // queen present at that colum
    if (checkQueenIndex !== -1) {
      // remove the queen at the index
      board.attributes[checkQueenIndex][col] = 0;
      //check if the queen present was on the last row then go to previous col
      if (checkQueenIndex === length - 1) {
        col -= 1;
      }// else move queen one row ahead
      else {
        //increament row index
        var increamentedIndex = checkQueenIndex + 1;
        // place the queen
        board.attributes[increamentedIndex][col] = 1;
        // now check that current queen has conflcits 
        while (increamentedIndex < length) {
          //check if board has conflict
          if (board.hasAnyQueenConflictsOn(increamentedIndex, col)) {
            //replace the queen
            board.attributes[increamentedIndex][col] = 0;
            // check if queen is place at last row in the col then reduce the col
            if (increamentedIndex === length - 1) {
              col -= 1;
              increamentedIndex = length;
            }//else move one more downwards and increament the index and check again
            else {
              increamentedIndex++;
              board.attributes[increamentedIndex][col] = 1;
            }
          } // end if for confilct
          // if board does not have conflict
          else {
            board.attributes[increamentedIndex][col] = 1;
            col += 1;
            increamentedIndex = length;
          } // end else for no conflcit
        } // end the while loop for row check 
      } // end else  if index not present at last position
    } // end if for checking index

    // no queen present in that col
    else {
      //loop over each row index 
      for (var i = 0; i < length; i++) {
        //place the queen at row col location
        board.attributes[i][col] = 1;
        //check conflict
        if (board.hasAnyQueenConflictsOn(i, col)) {
          //toggle the value
          board.attributes[i][col] = 0;
          // check if the current queen is on the last row and then go previous col
          if (i === length - 1) {
            col -= 1;
          }
        } // No conflict go to next col and recursilvely call the fucntion 
        else {
          col += 1;
          i = length;
        }
      } //end for loop
    }
  } // end while loop

}



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = new Board({ 'n': n }); //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
