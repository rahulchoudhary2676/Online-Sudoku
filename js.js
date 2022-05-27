function session(difficulty) {
    function getRandom(arr) {
        let len = arr.length;
        let idx = Math.floor(Math.random() * len);
        return idx;
    }

    function solveSudoku(puzzle) {
        let T = [
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""]
        ];

        function legel(row, col, board, val) {
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === val || board[row][i] === val) {
                    return false;
                }
            }

            let sub_r = Math.floor((row / 3)) * 3;
            let sub_c = Math.floor((col / 3)) * 3;

            for (let i = sub_r; i < sub_r + 3; i++) {
                for (let j = sub_c; j < sub_c + 3; j++) {
                    if (board[i][j] === val)
                        return false;
                }
            }
            return true;
        }

        function solve(row, col, board) {
            if (row == 9) {
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++)
                        T[i][j] = board[i][j];
                }
                return;
            }
            if (board[row][col] === "") {
                let s = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                for (let j = 0; j < 9; j++) {
                    let i = s[j];
                    if (legel(row, col, board, i.toString())) {
                        board[row][col] = i.toString();
                        solve(row + Math.floor((col + 1) / 9), Math.floor((col + 1) % 9), board);
                        board[row][col] = "";
                    }
                }
            } else {
                solve(row + Math.floor((col + 1) / 9), Math.floor((col + 1) % 9), board);
            }
        }
        solve(0, 0, puzzle);
        return T;
    }

    function getSudoku() {
        puzzle = [
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""]
        ];

        for (let k = 0; k < 3; k++) {
            let s = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let i = 0; i < 9; i++) {
                r = getRandom(s);
                puzzle[3 * k + Math.floor(i / 3)][3 * k + i % 3] = s[r].toString();
                let tmp = s[r];
                s[r] = s[s.length - 1];
                s[s.length - 1] = tmp;
                s.pop();
            }
        }
        let T = solveSudoku(puzzle);
        return T;
    }

    function isSolvable(puzzle) {
        function legel(row, col, board, val) {
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === val || board[row][i] === val) {
                    return false;
                }
            }

            let sub_r = Math.floor((row / 3)) * 3;
            let sub_c = Math.floor((col / 3)) * 3;

            for (let i = sub_r; i < sub_r + 3; i++) {
                for (let j = sub_c; j < sub_c + 3; j++) {
                    if (board[i][j] === val)
                        return false;
                }
            }
            return true;
        }
        let T = [
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""]
        ];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++)
                T[i][j] = puzzle[i][j];
        }
        let count = 0;

        function solve(row, col, board) {
            if (row == 9) {
                count++;
                if (count == 2)
                    return false;
                return true;
            }
            if (board[row][col] === "") {
                let s = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                for (let j = 0; j < 9; j++) {
                    let i = s[j];
                    if (legel(row, col, board, i.toString())) {
                        board[row][col] = i.toString();
                        let M = solve(row + Math.floor((col + 1) / 9), Math.floor((col + 1) % 9), board);
                        if (M === false) {
                            return false;
                        }
                        board[row][col] = "";
                    }
                }
                return true;
            } else {
                return solve(row + Math.floor((col + 1) / 9), Math.floor((col + 1) % 9), board);
            }
        }
        return solve(0, 0, T);
    }

    function shuffle(arr) {
        let len = arr.length;
        let curr = len - 1;
        for (let i = len; i > 0; i--) {
            let r = Math.floor(Math.random() * i);
            let tmp = arr[curr];
            arr[curr] = arr[r];
            arr[r] = tmp;
            curr--;
        }
    }

    function makeUnsolved(puzzle) {
        let ids = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let id = [i, j];
                ids.push(id);
            }
        }
        shuffle(ids);

        let T = [
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""]
        ];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++)
                T[i][j] = puzzle[i][j];
        }
        let d = 0;
        if (difficulty == "VeryEasy") d = 10;
        else if (difficulty == "Easy") d = 40;
        else if (difficulty == "Intermediate") d = 50;
        else d = 65;
        for (let i = 0; i < d; i++) {
            let curr = T[ids[i][0]][ids[i][1]];
            T[ids[i][0]][ids[i][1]] = "";
            if (!isSolvable(T)) {
                T[ids[i][0]][ids[i][1]] = curr;
            }
        }
        return T;
    }
    let Given = [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false]
    ];

    function make() {
        Given = [
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false]
        ];
        let difficulty = 50;
        puzzle = getSudoku();
        let T = makeUnsolved(puzzle);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let id = `#s${i}${j}`;
                document.querySelector(id).style.fontWeight = "300";
                document.querySelector(id).innerHTML = T[i][j].toString();
                if (T[i][j] != "")
                    Given[i][j] = true;
            }
        }
        return [T, puzzle];
    }

    let currentLocation = [0, 0];

    function highlight(i, j) {
        if (i >= 0 && i < 9 && j >= 0 && j < 9) {
            document.getElementById(`s${currentLocation[0]}${currentLocation[1]}`).classList.toggle("highlight");
            let id = `s${i}${j}`;
            document.getElementById(id).classList.toggle("highlight");
            currentLocation = [i, j];

        }
    }


    let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    document.onkeydown = ((evt) => {
        if (evt.key == "ArrowDown") {
            highlight(currentLocation[0] + 1, currentLocation[1]);

        } else if (evt.key == "ArrowUp") {
            highlight(currentLocation[0] - 1, currentLocation[1]);
        } else if (evt.key == "ArrowLeft") {
            highlight(currentLocation[0], currentLocation[1] - 1);
        } else if (evt.key == "ArrowRight") {
            highlight(currentLocation[0], currentLocation[1] + 1);
        } else if (nums.find(e => evt.key == e) && !Given[currentLocation[0]][currentLocation[1]]) {
            document.getElementById(`s${currentLocation[0]}${currentLocation[1]}`).innerHTML = evt.key;
            document.getElementById(`s${currentLocation[0]}${currentLocation[1]}`).style.fontWeight = "800";
        } else if (evt.key == "Backspace" && !Given[currentLocation[0]][currentLocation[1]]) {
            document.getElementById(`s${currentLocation[0]}${currentLocation[1]}`).innerHTML = "";
        }
    });
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`s${i}${j}`).classList.remove("highlight");
        }
    }
    document.onclick = ((e) => {
        if (e.target.classList[0] == "square") {
            let i = parseInt(e.target.id[1]);
            let j = parseInt(e.target.id[2]);
            highlight(i, j);
        }
    })
    document.getElementById("diff").blur();
    let Ans = make();
    document.getElementById(`s${currentLocation[0]}${currentLocation[1]}`).classList.toggle("highlight");
    document.getElementById("submit").onclick = (() => {
        let ans = [
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""]
        ]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                ans[i][j] = document.getElementById(`s${i}${j}`).innerHTML;
                document.getElementById(`s${i}${j}`).classList.toggle("highlight", false);
            }
        }
        let result = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (ans[i][j] != Ans[1][i][j]) {
                    result = false;
                    break;
                }
            }
        }
        let st = 'Incorrect Submission!';
        if (result)
            st = "Correct!";
        document.getElementById("result").innerHTML = st;
        document.getElementById("result").style.visibility = "visible";
        const diff2 = document.getElementById("diff");
        diff2.value = "VeryEasy";
        setTimeout(() => {
            document.getElementById("result").innerHTML = "";
            document.getElementById("result").style.visibility = "hidden";
            session("VeryEasy");
        }, 3000);
    })
}
const difficulty = document.getElementById("diff");
session("VeryEasy");
document.getElementById("new-game").onclick = (() => {
    difficulty.value = "VeryEasy";
    session("VeryEasy");
})
difficulty.onchange = (() => {
    let diff = difficulty.value;
    session(diff);
})