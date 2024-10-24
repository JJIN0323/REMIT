// author HYEJIN

$(document).ready(function() {

	/*
 엔화기준 계산 버튼 */
	$("#btnSimulatorJPY").click(function() {
		execCalcBtnJPY();
	});


	/* 원화기준 계산 버튼 */
$("#btnSimulatorKRW").click(function() {
		execCalcBtnKRW();
	});
});




/* 환율 계산을 위한 기준값 설정. S*/

var JPY_STANDARD_AMT 							= 300000;	// 환율 기준금액
var COMMISSION_BETWEEN_0_AND_50000 				= 50000;	// 수수료 기준금액 50000
var COMMISSION_BETWEEN_50001_AND_100000 		= 100000;	// 수수료 기준금액 100000
var COMMISSION_BETWEEN_100001_AND_1000000 		= 1000000;	// 수수료 기준금액 1000000

var COMMISSION_BETWEEN_0_AND_50000_AMT 			= 500;		// 수수료 금액 500
var COMMISSION_BETWEEN_50001_AND_100000_AMT 	= 1000;		// 수수료 금액 1000
var COMMISSION_BETWEEN_100001_AND_1000000_AMT 	= 1500;		// 수수료 금액 1500


/* 엔화기준 계산 */
function execCalcBtnJPY() {
	var inputJPY = $("#iptSimulatorJPY").val();

	if (inputJPY <= JPY_STANDARD_AMT) { // 30만 이하
		execCalcBelow30JPY(inputJPY);
	} else { // 30만 이상
		execCalcOver30JPY(inputJPY);
	}
}


/* 30만엔 이하 계산 */
function execCalcBelow30JPY(jpyAmt) {
	var tmpBelow30 = $('#krInfo .rate1').text();

	// 데이터 없을 시 계산중지
	if (tmpBelow30 == null || tmpBelow30 == '') {
		alert('エラーが発生しました、再度ご入力お願いします。')
		return;
	}

	var arrBelow30 = tmpBelow30.split("/");
	var below30JPY = arrBelow30[0].replace("JPY", "");
	var below30KRW = arrBelow30[1].replace("KRW", "");

	var inputJPY 		= 0;	// 입력금액
	var calcKRW 		= 0;	// 계산된 수취금액
	var commitionJPY 	= 0;	// 수수료
	var totalJPY		= 0;	// 송금금액 + 수수료 = 합계

	inputJPY 		= jpyAmt;
	calcKRW 		= (parseFloat(inputJPY) / parseFloat(below30JPY)) * parseFloat(below30KRW);
	commitionJPY 	= execCommitionAmt(inputJPY);

	calcKRW 		= parseInt(calcKRW, 10);
	commitionJPY 	= parseInt(commitionJPY, 10);
	totalJPY 		= parseInt(inputJPY, 10) + commitionJPY;


	setRemitSimulatorInfo(inputJPY, commitionJPY, totalJPY, calcKRW, below30KRW);
}

/* 30만엔 이상 계산 */
function execCalcOver30JPY(jpyAmt) {
	var tmpOver30 = $('#krInfo .rate2').text();

	// 데이터 없을시 계산중지
	if (tmpOver30 == null || tmpOver30 == '') {
		alert('エラーが発生しました、再度ご入力お願いします。')
		return;
	}

	var arrOver30 = tmpOver30.split("/");
	var over30JPY = arrOver30[0].replace("JPY", "");
	var over30KRW = arrOver30[1].replace("KRW", "");

	var inputJPY 		= 0;	// 입력금액
	var calcKRW 		= 0;	// 계산된 수취금액
	var commitionJPY 	= 0;	// 수수료
	var totalJPY		= 0;	// 송금금액 + 수수료 = 합계


	inputJPY 		= jpyAmt;
	calcKRW 		= (parseFloat(inputJPY) / parseFloat(over30JPY)) * parseFloat(over30KRW);
	commitionJPY 	= execCommitionAmt(inputJPY);


	calcKRW 		= parseInt(calcKRW, 10);
	commitionJPY 	= parseInt(commitionJPY, 10);
	totalJPY 		= parseInt(inputJPY, 10) + commitionJPY;

	setRemitSimulatorInfo(inputJPY, commitionJPY, totalJPY, calcKRW, over30KRW);
}

/* 수수료 계산  */
function execCommitionAmt(jpyAmt) {

	// var inputJPY = $("#iptSimulatorJPY").val();
	var inputJPY = jpyAmt;
	var commitionAmt = 0;

	if (inputJPY <= COMMISSION_BETWEEN_0_AND_50000) {
		commitionAmt = parseInt(COMMISSION_BETWEEN_0_AND_50000_AMT, 10);
	} else if (inputJPY <= COMMISSION_BETWEEN_50001_AND_100000) {
		commitionAmt = parseInt(COMMISSION_BETWEEN_50001_AND_100000_AMT, 10);
	} else if (inputJPY <= COMMISSION_BETWEEN_100001_AND_1000000) {
		commitionAmt = parseInt(COMMISSION_BETWEEN_100001_AND_1000000_AMT, 10);
	} else {
		commitionAmt = parseInt(COMMISSION_BETWEEN_100001_AND_1000000_AMT, 10);
	}

	return commitionAmt;
}



/* 원화기준 계산 */
function execCalcBtnKRW() {

	/* 30만엔 이하 */
	var tmpBelow30 = $('#krInfo .rate1').text();

	// 데이터 없을시 계산중지
	if (tmpBelow30 == null || tmpBelow30 == '') {
		alert('エラーが発生しました、再度ご入力お願いします。')
		return;
	}

	var arrBelow30 = tmpBelow30.split("/");
	var below30JPY = arrBelow30[0].replace("JPY", "");
	var below30KRW = arrBelow30[1].replace("KRW", "");


	/* 30만엔 이상 */
	var tmpOver30 = $('#krInfo .rate2').text();

	// 데이터 없을시 계산중지
	if (tmpOver30 == null || tmpOver30 == '') {
		alert('エラーが発生しました、再度ご入力お願いします。')
		return;
	}

	var arrOver30 = tmpOver30.split("/");
	var over30JPY = arrOver30[0].replace("JPY", "");
	var over30KRW = arrOver30[1].replace("KRW", "");


	var inputKRW 		= $("#iptSimulatorKRW").val();
	var calcBelow30JPY 	= (parseFloat(inputKRW) / parseFloat(below30KRW)) * parseFloat(below30JPY);
	calcBelow30JPY 		= parseInt(calcBelow30JPY, 10);


	var calcOver30JPY 	= (parseFloat(inputKRW) / parseFloat(over30KRW)) * parseFloat(over30JPY);
	calcOver30JPY 		= parseInt(calcOver30JPY, 10);


	var lastCalcJPY 		= 0;	// 최종 계산된 송금금액
	var lastExchangeRate 	= 0;	// 최종 환율
	var totalJPY 			= 0;	// 합계
	var commitionJPY 		= 0;	// 수수료

	if (calcBelow30JPY <= JPY_STANDARD_AMT) { // 30만엔 이하환율로 계산후 30만엔 이하의 경우 30만엔 이하환율로 적용.
		lastCalcJPY 		= calcBelow30JPY;
		lastExchangeRate 	= below30KRW;
	} else {
		lastCalcJPY 		= calcOver30JPY;
		lastExchangeRate 	= over30KRW;
	}


	commitionJPY 	= execCommitionAmt(lastCalcJPY);
	commitionJPY 	= parseInt(commitionJPY, 10);
	totalJPY 		= lastCalcJPY + commitionJPY;


	setRemitSimulatorInfo(lastCalcJPY, commitionJPY, totalJPY, inputKRW, lastExchangeRate);

}


/* 시뮬레이터 데이터 설정 */
function setRemitSimulatorInfo(sendAmt, commitionAmt, totalAmt, receiveAmt, exchangeRate) {
	$("#txtSendAmt").text(sendAmt).number(true, 0);				// 송금금액
	$("#txtCommitionAmt").text(commitionAmt).number(true, 0);	// 수수료
	$("#txtTotalAmt").text(totalAmt).number(true, 0);			// 합계
	$("#txtReceviceAmt").text(receiveAmt).number(true, 0);		// 수취금액
	$("#txtExchangeRate").text(exchangeRate);	// 송금환율
}