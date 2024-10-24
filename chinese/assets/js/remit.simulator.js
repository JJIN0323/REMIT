// author : HYEJIN

$(document).ready(function() {

	/* 엔화기준 계산 버튼 */
	$("#btnSimulatorJPY").click(function() {
		var inputJPY = $("#iptSimulatorJPY").val();
		execCalcJPY(inputJPY);
	});


	/* 위엔화기준 계산 버튼 */
	$("#btnSimulatorCNY").click(function() {
		execCalcCNY();
	});
});


/* 환율 계산을 위한 기준값 설정. */
var COMMISSION_BETWEEN_0_AND_300000 			= 300000;	// 수수료 기준금액 300000
var COMMISSION_BETWEEN_300001_AND_1000000 		= 1000000;	// 수수료 기준금액 1000000

var COMMISSION_BETWEEN_0_AND_300000_AMT 		= 1000;		// 수수료 금액 1000
var COMMISSION_BETWEEN_300001_AND_1000000_AMT 	= 2000;		// 수수료 금액 2000




/* 엔화기준 계산 */
function execCalcJPY(jpyAmt) {

	var tmpExchangeRateInfo = $('#chInfo .exchangeRateResult').text();

	// 데이터 없을시 계산중지
	if (tmpExchangeRateInfo == null || tmpExchangeRateInfo == '') {
		alert('エラーが発生しました、再度ご入力お願いします。')
		return;
	}

	var arrRateInfo = tmpExchangeRateInfo.split("/");
	var rateJPY 	= arrRateInfo[0].replace("JPY", "");
	var rateCNY 	= arrRateInfo[1].replace("CNY", "");

	var inputJPY 		= 0;	// 입력금액
	var calcCNY 		= 0;	// 계산된 수취금액
	var commitionJPY 	= 0;	// 수수료
	var totalJPY		= 0;	// 송금금액 + 수수료 = 합계

	inputJPY 		= jpyAmt;
	calcCNY 		= (parseFloat(inputJPY) / parseFloat(rateJPY)) * parseFloat(rateCNY);
	commitionJPY 	= execCommitionAmt(inputJPY);

	calcCNY 		= parseFloat(calcCNY, 10).toFixed(2);
	commitionJPY 	= parseInt(commitionJPY, 10);
	totalJPY 		= parseInt(inputJPY, 10) + commitionJPY;

	setRemitSimulatorInfo(inputJPY, commitionJPY, totalJPY, calcCNY, arrRateInfo[0], arrRateInfo[1]);
}


/* 수수료 계산 */
function execCommitionAmt(jpyAmt) {

	// var inputJPY = $("#iptSimulatorJPY").val();
	var inputJPY = jpyAmt;
	var commitionAmt = 0;

	if (inputJPY <= COMMISSION_BETWEEN_0_AND_300000) {
		commitionAmt = parseInt(COMMISSION_BETWEEN_0_AND_300000_AMT, 10);
	} else if (inputJPY <= COMMISSION_BETWEEN_300001_AND_1000000) {
		commitionAmt = parseInt(COMMISSION_BETWEEN_300001_AND_1000000_AMT, 10);
	} else {
		commitionAmt = parseInt(COMMISSION_BETWEEN_300001_AND_1000000_AMT, 10);
	}

	return commitionAmt;
}



/* 위엔화기준 계산 */
function execCalcCNY() {

	var tmpExchangeRateInfo = $('#chInfo .exchangeRateResult').text();

	// 데이터 없을시 계산중지
	if (tmpExchangeRateInfo == null || tmpExchangeRateInfo == '') {
		alert('エラーが発生しました、再度ご入力お願いします。')
		return;
	}

	var arrRateInfo = tmpExchangeRateInfo.split("/");
	var rateJPY 	= arrRateInfo[0].replace("JPY", "");
	var rateCNY 	= arrRateInfo[1].replace("CNY", "");

	var inputCNY 	= $("#iptSimulatorCNY").val();
	var calcJPY 	= (parseFloat(inputCNY) / parseFloat(rateCNY)) * parseFloat(rateJPY);
	calcJPY 		= parseInt(calcJPY, 10);

	commitionJPY 	= execCommitionAmt(calcJPY);
	commitionJPY 	= parseInt(commitionJPY, 10);
	totalJPY 		= calcJPY + commitionJPY;

	setRemitSimulatorInfo(calcJPY, commitionJPY, totalJPY, inputCNY, arrRateInfo[0], arrRateInfo[1]);

}


/* 시뮬레이터 데이터 설정 */
function setRemitSimulatorInfo(sendAmt, commitionAmt, totalAmt, receiveAmt, exchangeRateJPY, exchangeRateCNY) {

	$("#txtSendAmt").text(sendAmt).number(true, 0);						// 송금금액
	$("#txtCommitionAmt").text(commitionAmt).number(true, 0);			// 수수료
	$("#txtTotalAmt").text(totalAmt).number(true, 0);					// 합계
	$("#txtReceviceAmt").text(receiveAmt);			// 수취금액
	$("#txtExchangeRateJPY").text(exchangeRateJPY + " / ");		// 송금환율
	$("#txtExchangeRateCNY").text(exchangeRateCNY);		// 송금환율

}