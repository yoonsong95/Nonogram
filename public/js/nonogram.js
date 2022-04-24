// rule 1: have rows & cols with 0 be the number keeping areas (the pattern of blocks numbers)
// rule 2: single clicks to paint, double clicks to flag


// sample pic coordinates
// 4 x 4
var samplePicMatrix4x4_1 = [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1]
];

var samplePicMatrix8x8_1 = [
    [1, 1, 0, 0, 1, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
];

$(document).ready(function () {

    function createGrid(row, col) {
        var grid = "<div>";
        for (var i = 0; i < row; i++) {
            grid += `<div class="row">`;
            for (var j = 0; j < col; j++) {
                if (i == 0) {
                    grid += `<div class="block nums-area" id="r${i}c${j}"></div>`;
                } else if (j == 0) {
                    grid += `<div class="block nums-area" id="r${i}c${j}"></div>`;
                } else {
                    grid += `<div class="block pic-area" id="r${i}c${j}"></div>`;
                }
            }
            grid += "</div>";
        }
        grid += "</div>";
        return grid;
    }

    function refreshGrid() {
        $(".pic-area").css("background-color", "white");
    }

    function rotateMatrixSpecial(matrix) {
        var tempMatrix = [];
        for (var i = 0; i < matrix.length; i++) {
            var colArr = new Array();
            tempMatrix.push(colArr);
        }
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                tempMatrix[j][i] = matrix[i][j];
            }
        }
        return tempMatrix;
    }

    function convertArrayToPTagStr(arr) {
        var tempArr = new Array();
        var i = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == 1) {
                var value = 0;
                while (arr[i] != 0 && i < arr.length) {
                    value++;
                    i++;
                }
                tempArr.push(`<p>${value}</p>`);
            }
        }
        return tempArr.join(" ");
    }

    function calculateNumsArea(picMatrix) {
        var colNumsArea = new Array();
        for (var i = 0; i < picMatrix.length; i++) {
            colNumsArea.push(convertArrayToPTagStr(picMatrix[i]));
        }
        // rowNumsArea - flip first
        var rowNumsArea = new Array();
        var specialRoateMatrix = rotateMatrixSpecial(picMatrix);
        for (var i = 0; i < specialRoateMatrix.length; i++) {
            rowNumsArea.push(convertArrayToPTagStr(specialRoateMatrix[i]));
        }
        var numsAreas = [rowNumsArea, colNumsArea];
        return numsAreas;
    }

    function displayNumsAreas(numsAreas) {
        rowNumsArea = numsAreas[0];
        colNumsArea = numsAreas[1];
        for (var i = 0; i < rowNumsArea.length; i++) {
            $(`#r0c${i + 1}`).html(rowNumsArea[i]);
        }
        for (var i = 0; i < colNumsArea.length; i++) {
            $(`#r${i + 1}c0`).html(colNumsArea[i]);
        }
    }

    function addColNumsAreaClass(dimension) {
        for (var i = 0; i < dimension; i++) {
            $(`#r${i}c0`).addClass("col-nums-area");
        }
    }

    function addRowNumsAreaClass(dimension) {
        for (var i = 0; i < dimension; i++) {
            $(`#r0c${i}`).addClass("row-nums-area");
        }
    }

    // TODO
    // double click or right click to set FLAG on the block (i.e. x mark)

    // TODO
    // actual validation of whether got the image correct

    // grid
    var grid = createGrid(9, 9);
    $("#grid-container").html(grid);

    // nums areas numbers
    addColNumsAreaClass(9);
    addRowNumsAreaClass(9);
    displayNumsAreas(calculateNumsArea(samplePicMatrix8x8_1));

    // pic area
    $(".pic-area").on("click", function () {
        if ($(this).css("background-color") == "rgb(255, 255, 255)") {
            $(this).css("background-color", "black");
        } else {
            $(this).css("background-color", "white");
        }
    });

    // refresh grid
    $("#refreshButton").on("click", function () {
        refreshGrid();
    });

});
