//. and . in the same number
//* * not allowed, replace
//cant equal if ends with operator
//Never have more close brackets than open
//e π  √  log ln sin cos tan sin-1 cos-1 tan-1   factorial percent
//p.s ! % and ) are numbers
//v2 ²³ cuberoot
function Calculator() {
    this.numbers = ["!", "%", ")", "."];
    this.operators = ["x", "÷", "^"];
    this.unary = ["√", "log", "ln", "sin", "cos", "tan", "sin-1", "cos-1", "tan-1"];
    this.reg = /[0-9]/;
    this.createArray = function (str) {
        var arr = [];
        loop1:
        for (var i = 0; i < str.length; i++) {
            if (str[i] == 'e') {
                arr.push(Math.E);
            } else if (str[i] == 'π') {
                arr.push(Math.PI);
            }else if(this.reg.test(str[i])){
                var end = i;
                for(var num=0;(i+num)<str.length;num++){
                    if(!(this.reg.test(str[num])||str[num]==".")){
                        end=num-1;
                        break;
                    }
                }
                var lent =(end-i)+1;
                arr.push(str.slice(i,lent));
                i+=lent-1;
                continue loop1;
            } else {
                loop2:
                for (var len = 5; len >= 1; len--) {
                    if (unary.includes(str.slice(i, len))) {
                        arr.push(str.slice(i, len));
                        i+=len-1;
                        continue loop1;
                    }
                }
                arr.push(str[i]);

            }
        }
    };
    this.Press = function (pr, b4) {
        //Input e and pi
        if (this.reg.test(pr)) {
            if (b4[b4.length - 1] != 0) {
                return b4 + pr;
            }
            if (b4[b4.length - 1] == 0) {
                if (this.reg.test(b4[b4.length - 2]) || b4[b4.length - 2] == ".") {
                    return b4 + pr;
                } else {
                    return b4.slice(0, b4.length - 1) + pr;
                }
            }



        }
        var brac = false;
        var point = false;
        if (pr == ")") {
            var tot = 0;
            brac = true;
        }
        if (pr == ".") {
            point = true;
            if (!(this.reg.test(b4[b4.length - 1]))) {
                return b4 + "0.";
            }
        }
        for (let i = b4.length - 1; i >= 0; i--) {
            if (point) {
                if (b4[i] == ".") {
                    return b4;
                }
                if (!(this.reg.test(b4[i]) || b4[i] == ".")) {
                    return b4 + pr;
                }
            }
            if (brac) {
                if (b4[i] == ")") {
                    tot--;
                } else if (b4[i] == "(") {
                    tot++;
                }
            }
        }
        if (brac) {
            if (tot > 0) {
                return b4 + pr;
            } else {
                return b4;
            }
        }
        if (this.numbers.includes(pr) || this.operators.includes(pr)) {
            if ((this.numbers.includes(b4[b4.length - 1])) || (this.reg.test(b4[b4.length - 1]))) {
                return b4 + pr;
            } else {
                if (!this.operators.includes(pr)) {
                    return b4;
                } else {
                    //Pop from string
                    if (b4.length == 0 || b4[b4.length - 1] == "(") {
                        return b4 + "0x";
                    }
                    b4 = b4.slice(0, b4.length - 1);
                    return this.Press(pr, b4);
                }
                return b4;
            }
        }
        if (["+", "-"].includes(pr)) {
            if (this.operators.includes(b4[b4.length - 1])) {
                //TODO remove from string
                return b4.slice(0, b4.length - 1) + pr;
            } else {
                return b4 + pr;
            }
        }

        return b4 + pr;
        /* 
        //o.1, 0.2
            * / and ! must come after a number
            ) must have less number of ( before
            . must not exist in the number


        */

    };

    this.BackSpace = function (b4) {
        /*if peek is num or op no p
        if ( 
            remove brac
            if sin or log (b4) remove
            */
            var newstr;
            if(b4[b4.length-1] == "("){
                let k = b4.length-1;
                if(this.unary.includes(b4.substring(k-3,k))){
                    newstr = b4.substring(0,k-3);
                }else{
                    newstr = b4.substring(0,b4.length-1);
                }
            }
            else{
                newstr = b4.substring(0,b4.length-1);
            }
            return newstr;
            

    };
    this.Solution = function (b4) {
        if (!((numbers.includes(b4[b4.length - 1])) || (this.reg.test(b4[b4.length - 1])))) {
            return "";
        }
        //If ends with operator(except !)
        var braccount = 0;
        for (var i = 0; i < b4.length; i++) {
            if (b4[i] == "(") {
                braccount++;
            } else if (b4[i] == ")") {
                braccount--;
            }
        }
        for (i = 0; i < braccount; i++) {
            b4 += ")";
        }

        /*Close all open brackets
 
bracket all - and + not preceeded by number, close) is a number, to (0- whatever(brackets =0) close) iterate from right
all ( not after a num put * before it and bracket number before and after
bracket all unary ops (% and ! with who hey are after)
Bracket all guys using PEDMAS and left most
Bracket all numbers preceeded or followed immediately by )( * and bracket
Exponent is right most
Push all guys into the stack, new stack with each open bracket
call resolve on stack
*/


    };
    this.Resolve = function (stack) {
        /*
        while(stack count >1)
         Pop from array
            if stack, resolve and push
            if number (e or pi), hold=right pop (operator --- if not operator, error) 
              if log, sin or unary op,
                ans = op right
                push ans
              else
                op = poped operator pop (number or stack, ---- error)
                left = poped num;
                ans = left op right
                push ans;
            if(operator % or !)
                pop num
                ans = num op
                push ans
            end while 
            retrun pop(from array)
        */
    };
}
var a = new Calculator();
function Press(inpt){
    let b4 = document.getElementById("brd").value;
    var layout = a.Press(inpt,b4);
    var ans = "";
    for(let a = 0; a <layout.length; a++){
        if(layout[a] =="÷"){
            ans += '\u00F7';
        }
        else if(layout[a] == "x"){
            ans += '\u00D7';
        }
        else if(layout[a] == "√"){
            ans += '\u221A';
        }
        else{
            ans += layout[a];
        }
    }
    

    document.getElementById("brd").value=ans;
}

function ClearFunction(){
    document.getElementById("brd").value='';
}

function BackSp(){
   var st= a.BackSpace(document.getElementById("brd").value);
   document.getElementById("brd").value= st;

   
}