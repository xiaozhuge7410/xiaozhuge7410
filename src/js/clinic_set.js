import "./components/barDom";
import "./components/httpRequest";
import "./components/dataFormat";

function CommonReportDetail() {
  this.incident();
  this.immediatelyCall();
  this.bind();
  this.call();
}
CommonReportDetail.prototype.immediatelyCall = function() {
  $(".form-control2").select2({
    placeholder: "点击选择",
    minimumResultsForSearch: -1,
    language: "zh-CN"
  });
  $(".form-control3").select2({
    placeholder: "点击选择",
    minimumResultsForSearch: -1,
    language: "zh-CN"
  });
  $(".form-control4").select2({
    placeholder: "点击选择",
    minimumResultsForSearch: -1,
    language: "zh-CN"
  });
  $(".form-control5").select2({
    placeholder: "点击选择",
    minimumResultsForSearch: -1,
    language: "zh-CN"
  });
  $(".form-control6").select2({
    placeholder: "点击选择",
    minimumResultsForSearch: -1,
    language: "zh-CN"
  });
  $(".form-control7").select2({
    placeholder: "点击选择",
    minimumResultsForSearch: -1,
    language: "zh-CN"
  });
  $(".form-control8").select2({
    placeholder: "点击选择",
    minimumResultsForSearch: -1,
    language: "zh-CN"
  });
};
CommonReportDetail.prototype.incident = function() {
  $(".tab>ul>li").on("click", function() {
    $(this).parent().find("a").removeClass("active");
    $(this).find("a").addClass("active");
  });
  $(".tab>ul>li").on("click", "a", function() {
    if ($(this).text() == "临床问卷") {
      $(".clinical-questionnaire").show();
      $(".the-grouping").hide();
      $(".summarize").hide();
    } else if ($(this).text() == "实验室检查及分组") {
      $(".summarize").hide();
      $(".clinical-questionnaire").hide();
      $(".the-grouping").show();
    } else if ($(this).text() == "实验完成情况总结") {
      $(".the-grouping").hide();
      $(".clinical-questionnaire").hide();
      $(".summarize").show();
    }
  });
};

CommonReportDetail.prototype.judgeND = function(obj) {
  if (obj.toUpperCase() == "ND") {
    return -99;
  } else {
    return obj;
  }
};
CommonReportDetail.prototype.transitionND = function(obj) {
  if (obj == -99) {
    return "ND";
  } else {
    return obj;
  }
};
CommonReportDetail.prototype.strData = function() {
  var userNameInitial = "";
  var userName = $("input[name='userNameInitial']");
  for (var i = 0; i < userName.length; i++) {
    userNameInitial += userName[i].value;
  }
  var filterDate = $(".filterDate").val();
  var testNo = $(".testNo").val();
  var testDate = $(".testDate").val();
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var customerId = window.localStorage.getItem("customerUUID");
  var reqUrl = "caseReport/saveMain";
  var sendData = {
    customerId: customerId,
    userNameInitial: userNameInitial,
    filterDate: filterDate,
    testNo: testNo,
    testDate: testDate
  };
  $.ajax({
    type: "POST",
    url: window.urlHandler(reqUrl, uuid, token),
    dataType: "json",
    data: JSON.stringify(sendData),
    contentType: "application/json",
    success: function(data) {
      if (data.status == 200) {
        swal({
          title: "提示",
          text: "保存成功！",
          type: "success",
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        swal({
          title: "提示",
          text: data.info,
          type: "info",
          showConfirmButton: true,
          confirmButtonText: "确定",
          confirmButtonColor: "#009CAA"
        });
      }
    },
    error: function() {
      swal({
        title: "保存失败，请核查填入内容！",
        type: "info",
        showConfirmButton: true,
        confirmButtonText: "确定",
        timer: 2000,
        confirmButtonColor: "#009CAA"
      });
    }
  });
};
CommonReportDetail.prototype.clinicalQuestionnaire = function() {
  var _this = this;
  var inclusionCriteria = {
    type1: $("input[name='inclusionCriteria1']:checked").val(),
    type2: $("input[name='inclusionCriteria2']:checked").val(),
    type3: $("input[name='inclusionCriteria3']:checked").val(),
    type4: $("input[name='inclusionCriteria4']:checked").val(),
    type5: $("input[name='inclusionCriteria5']:checked").val(),
    type6: $("input[name='inclusionCriteria6']:checked").val()
  };
  var exclusionCriteria = {
    type1: $("input[name='exclusionCriteria1']:checked").val(),
    type2: $("input[name='exclusionCriteria2']:checked").val(),
    type3: $("input[name='exclusionCriteria3']:checked").val(),
    type4: $("input[name='exclusionCriteria4']:checked").val(),
    type5: $("input[name='exclusionCriteria5']:checked").val()
  };
  var parQuestionnaire = {
    type1: $("input[name='parQuestionnaire1']:checked").val(),
    type2: $("input[name='parQuestionnaire2']:checked").val(),
    type3: $("input[name='parQuestionnaire3']:checked").val(),
    type4: $("input[name='parQuestionnaire4']:checked").val(),
    type5: $("input[name='parQuestionnaire5']:checked").val(),
    type6: $("input[name='parQuestionnaire6']:checked").val(),
    type7: $("input[name='parQuestionnaire7']:checked").val()
  };
  var parQuestionnaireComment = $(
    "input[name='parQuestionnaireComment']:checked"
  ).val();
  var patientName = $(".patientName").val();
  var profession = $(".profession option:selected").val();
  var age = $(".age").val();
  var contactInfo1 = $(".contactInfo1").val();
  var sex = $("input[name='sex-20']:checked").val();
  var contactInfo2 = $(".contactInfo2").val();
  var familyAddress = $(".familyAddress").val();
  var signConsent = $("input[name='signConsent']:checked").val();
  var signConsentDate = $(".signConsentDate").val();
  var height = $(".height").val();
  var diabeticHistory = $(".diabeticHistory").val();
  var weight = $(".weight").val();

  var restingHeartRate = _this.judgeND($(".restingHeartRate").val());
  var glu = _this.judgeND($(".glu").val());
  var bp = _this.judgeND($(".bp").val());
  var hba1cBefore = _this.judgeND($(".hba1cBefore").val());

  var medicalHistory = this.checkdToString($("input[name='sex-101']:checked"));
  var familyHistoryFather = this.checkdToString(
    $("input[name='familyHistoryFather']:checked")
  );
  var familyHistoryMother = this.checkdToString(
    $("input[name='familyHistoryMother']:checked")
  );
  var everIll = $("input[name='everIll']:checked").val();
  var symptomSign = this.checkdToString($("input[name='symptomSign']:checked"));
  var smokingHistory = $(".smokingHistory option:selected").val();
  var sleepQuality = $(".sleepQuality option:selected").val();
  var movementSituation = $(".movementSituation option:selected").val();
  var dietSituation = $(".dietSituation option:selected").val();
  var likeSports = $(".likeSports option:selected").val();
  var ofenDoSports = this.checkdToString($("input[name='ofenDoSports']:checked"));
  var gtThirtyMinTimes = $(".gtThirtyMinTimes").val();
  var bmiIndex = $(".bmi").text();
  // var takeMedicineInfo = this.checkdToString($("input[name='sex-23']:checked"));

  var takeMedicineInfo = {
    type1: {
      checked: this.checkdToString($("input[name='sex-23']:checked")),
      other: $(".else-1").val()
    },
    type2: {
      checked: this.checkdToString($("input[name='sex-24']:checked")),
      other: $(".else-22").val()
    },
    type3: {
      checked: this.checkdToString($("input[name='sex-32']:checked")),
      other: $(".else-2").val()
    },
    type4: {
      checked: this.checkdToString($("input[name='sex-35']:checked")),
      other: $(".else-3").val()
    },
    type5: {
      checked: this.checkdToString($("input[name='sex-001']:checked")),
      other: null
    },
    type6: {
      checked: this.checkdToString($("input[name='sex-37']:checked")),
      other: $(".else-6").val()
    },
    type7: {
      checked: this.checkdToString($("input[name='sex-38']:checked")),
      other: $(".else-7").val()
    },
    type8: {
      checked: this.checkdToString($("input[name='sex-39']:checked")),
      other: $(".else-8").val()
    },
    type9: {
      checked: this.checkdToString($("input[name='sex-40']:checked")),
      other: $(".else-9").val()
    },
    other: $(".else-10").val(),
    no: this.checkdToString($("input[name='sex-41']:checked"))
  };

  var diabeticComplication = this.checkdToString(
    $("input[name='diabeticComplication']:checked")
  );
  var diabeticComplicationCustom = $(".diabeticComplicationCustom").val();
  var customerId = window.localStorage.getItem("customerUUID");
  var sendData = {
    customerId: customerId,
    inclusionCriteria: inclusionCriteria,
    exclusionCriteria: exclusionCriteria,
    parQuestionnaire: parQuestionnaire,
    parQuestionnaireComment: parQuestionnaireComment,
    patientName: patientName,
    profession: profession,
    age: age,
    contactInfo1: contactInfo1,
    sex: sex,
    contactInfo2: contactInfo2,
    familyAddress: familyAddress,
    signConsent: signConsent,
    signConsentDate: signConsentDate,
    height: height,
    diabeticHistory: diabeticHistory,
    weight: weight,
    restingHeartRate: restingHeartRate,
    glu: glu,
    bp: bp,
    bmiIndex: bmiIndex,
    hba1cBefore: hba1cBefore,
    medicalHistory: medicalHistory,
    familyHistoryFather: familyHistoryFather,
    familyHistoryMother: familyHistoryMother,
    everIll: everIll,
    symptomSign: symptomSign,
    smokingHistory: smokingHistory,
    sleepQuality: sleepQuality,
    movementSituation: movementSituation,
    dietSituation: dietSituation,
    likeSports: likeSports,
    ofenDoSports: ofenDoSports,
    gtThirtyMinTimes: gtThirtyMinTimes,
    takeMedicineInfo: takeMedicineInfo,
    diabeticComplication: diabeticComplication,
    diabeticComplicationCustom: diabeticComplicationCustom
  };
  /* if(patientName==''||profession==''||age==''||contactInfo1==''||sex==''||familyAddress==''||signConsent==''||signConsentDate==''||height==''||diabeticHistory==''||
         weight==''||restingHeartRate==''||glu==''||bp==''||hba1cBefore==''||smokingHistory==''||sleepQuality==''||movementSituation==''||dietSituation==''||
         likeSports==''||ofenDoSports==''||gtThirtyMinTimes==''||diabeticComplication==''){
         swal({
             title: '带星是必填的！',
             type: 'info',
             showConfirmButton: true,
             confirmButtonText: '确定',
             timer: 2000,
             confirmButtonColor: '#009CAA'
         })
     }*/
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var customerId = window.localStorage.getItem("customerUUID");
  var reqUrl = "caseReport/saveQuestionnaire";
  $.ajax({
    type: "POST",
    url: window.urlHandler(reqUrl, uuid, token),
    dataType: "json",
    data: JSON.stringify(sendData),
    contentType: "application/json",
    success: function(data) {
      if (data.status == 200) {
        swal({
          title: "提示",
          text: "保存成功！",
          type: "success",
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        swal({
          title: "提示",
          text: data.info,
          type: "info",
          showConfirmButton: true,
          confirmButtonText: "确定",
          confirmButtonColor: "#009CAA"
        });
      }
    },
    error: function() {
      swal({
        title: "保存失败，请核查填入内容！",
        type: "info",
        showConfirmButton: true,
        confirmButtonText: "确定",
        timer: 2000,
        confirmButtonColor: "#009CAA"
      });
    }
  });
};

CommonReportDetail.prototype.renderInput = function(data, name, dataFather) {
  if (dataFather != null) {
    if (dataFather[data] != null) {
      var ele = "input[name=" + name + "]";
      $(ele).eq(dataFather[data] - 1).attr("checked", true);
    }
  }
};

CommonReportDetail.prototype.renderInput2 = function(
  data1,
  data2,
  name,
  dataFather
) {
  if (dataFather != null) {
    if (dataFather[data1] != null) {
      var val = dataFather[data1][data2];
      if (val != null) {
        var ele = "input[name=" + name + "]";
        var $ele = $(ele);
        if ($ele) {
          var arr = val.substr(1, val.length - 2).split(",");
          for (var i = 0; i < arr.length; i++) {
            $ele.eq(parseInt(arr[i]) - 1).attr("checked", true);
          }
        }
      }
    }
  }
};

CommonReportDetail.prototype.renderOther2 = function(
  data1,
  data2,
  name,
  dataFather
) {
  if (dataFather != null) {
    if (dataFather[data1] != null) {
      if (dataFather[data1][data2] != null) {
        var ele = "input." + name;
        var $ele = $(ele);
        if ($ele) {
          $ele.val(dataFather[data1][data2]);
        }
      }
    }
  }
};

CommonReportDetail.prototype.renderInput3 = function(data1, name, dataFather) {
  if (dataFather != null) {
    if (dataFather[data1] != null) {
      var val = dataFather[data1];

      if (val != null) {
        var ele = "input[name=" + name + "]";
        var $ele = $(ele);
        if ($ele) {
          var arr = val.substr(1, val.length - 2).split(",");
          for (var i = 0; i < arr.length; i++) {
            $ele.eq(parseInt(arr[i]) - 1).attr("checked", true);
          }
        }
      }
    }
  }
};

CommonReportDetail.prototype.renderOther3 = function(data1, name, dataFather) {
  if (dataFather != null) {
    if (dataFather[data1] != null) {
      var ele = "input." + name;
      var $ele = $(ele);
      if ($ele) {
        $ele.val(dataFather[data1]);
      }
    }
  }
};

CommonReportDetail.prototype.getData = function(data) {
  var _this = this;
  this.renderInput("type1", "inclusionCriteria1", data.inclusionCriteria);
  this.renderInput("type2", "inclusionCriteria2", data.inclusionCriteria);
  this.renderInput("type3", "inclusionCriteria3", data.inclusionCriteria);
  this.renderInput("type4", "inclusionCriteria4", data.inclusionCriteria);
  this.renderInput("type5", "inclusionCriteria5", data.inclusionCriteria);
  this.renderInput("type6", "inclusionCriteria6", data.inclusionCriteria);

  this.renderInput("type1", "exclusionCriteria1", data.exclusionCriteria);
  this.renderInput("type2", "exclusionCriteria2", data.exclusionCriteria);
  this.renderInput("type3", "exclusionCriteria3", data.exclusionCriteria);
  this.renderInput("type4", "exclusionCriteria4", data.exclusionCriteria);
  this.renderInput("type5", "exclusionCriteria5", data.exclusionCriteria);

  this.renderInput("type1", "parQuestionnaire1", data.parQuestionnaire);
  this.renderInput("type2", "parQuestionnaire2", data.parQuestionnaire);
  this.renderInput("type3", "parQuestionnaire3", data.parQuestionnaire);
  this.renderInput("type4", "parQuestionnaire4", data.parQuestionnaire);
  this.renderInput("type5", "parQuestionnaire5", data.parQuestionnaire);
  this.renderInput("type6", "parQuestionnaire6", data.parQuestionnaire);
  this.renderInput("type7", "parQuestionnaire7", data.parQuestionnaire);

  if (data.parQuestionnaireComment) {
    $("input[name='parQuestionnaireComment']")
      .eq(data.parQuestionnaireComment - 1)
      .attr("checked", true);
  }
  $(".patientName").val(data.patientName);
  $(".profession").val(data.profession).trigger("change");
  $(".age").val(data.age);
  $(".contactInfo1").val(data.contactInfo1);
  $(".contactInfo2").val(data.contactInfo2);
  if (data.sex) {
    $("input[name='sex-20']").eq(data.sex - 1).attr("checked", true);
  }
  $(".familyAddress").val(data.familyAddress);
  if (data.signConsent) {
    $("input[name='signConsent']")
      .eq(data.signConsent - 1)
      .attr("checked", true);
  }
  $(".signConsentDate").val(data.signConsentDate);
  $(".height").val(data.height);
  bin(data.height, data.weight);
  $(".diabeticHistory").val(data.diabeticHistory);
  $(".weight").val(data.weight);

  $(".restingHeartRate").val(_this.transitionND(data.restingHeartRate));

  $(".glu").val(_this.transitionND(data.glu));

  $(".bp").val(_this.transitionND(data.bp));

  $(".hba1cBefore").val(_this.transitionND(data.hba1cBefore));

  this.checkdToFun(data.medicalHistory, "sex-101");

  this.checkdToFun(data.familyHistoryFather, "familyHistoryFather");

  this.checkdToFun(data.familyHistoryMother, "familyHistoryMother");
  if (data.everIll) {
    $("input[name='everIll']").eq(data.everIll - 1).attr("checked", true);
  }
  this.checkdToFun(data.symptomSign, "symptomSign");
  this.checkdToFun(data.diabeticComplication, "diabeticComplication");

  $(".diabeticComplicationCustom").val(data.diabeticComplicationCustom);

  $(".smokingHistory").val(data.smokingHistory).trigger("change");
  $(".sleepQuality").val(data.sleepQuality).trigger("change");
  $(".movementSituation").val(data.movementSituation).trigger("change");
  $(".dietSituation").val(data.dietSituation).trigger("change");
  $(".likeSports").val(data.likeSports).trigger("change");

  this.checkdToFun(data.ofenDoSports, "ofenDoSports");
  $(".gtThirtyMinTimes").val(data.gtThirtyMinTimes);

  this.renderInput2("type1", "checked", "sex-23", data.takeMedicineInfo);
  this.renderOther2("type1", "other", "else-1", data.takeMedicineInfo);
  this.renderInput2("type2", "checked", "sex-24", data.takeMedicineInfo);
  this.renderOther2("type2", "other", "else-22", data.takeMedicineInfo);
  this.renderInput2("type3", "checked", "sex-32", data.takeMedicineInfo);
  this.renderOther2("type3", "other", "else-2", data.takeMedicineInfo);
  this.renderInput2("type4", "checked", "sex-35", data.takeMedicineInfo);
  this.renderOther2("type4", "other", "else-3", data.takeMedicineInfo);
  this.renderInput2("type5", "checked", "sex-001", data.takeMedicineInfo);
  this.renderInput2("type6", "checked", "sex-37", data.takeMedicineInfo);
  this.renderOther2("type6", "other", "else-6", data.takeMedicineInfo);
  this.renderInput2("type7", "checked", "sex-38", data.takeMedicineInfo);
  this.renderOther2("type7", "other", "else-7", data.takeMedicineInfo);
  this.renderInput2("type8", "checked", "sex-39", data.takeMedicineInfo);
  this.renderOther2("type8", "other", "else-8", data.takeMedicineInfo);
  this.renderInput2("type9", "checked", "sex-40", data.takeMedicineInfo);
  this.renderOther2("type9", "other", "else-9", data.takeMedicineInfo);
  this.renderOther3("other", "else-10", data.takeMedicineInfo);
  this.renderInput3("no", "sex-41", data.takeMedicineInfo);

  $(".hba1c").val(_this.transitionND(data.hba1c));
  $(".totalCholesterolLevel").val(
    _this.transitionND(data.totalCholesterolLevel)
  );
  $(".triglyceride").val(_this.transitionND(data.triglyceride));
  $(".hdlcLevel").val(_this.transitionND(data.hdlcLevel));
  $(".fasting-blood-glucose ").val(_this.transitionND(data.oneMonthGlu)); //近一月空腹血糖（mmol/L）
  $(".proteinuria").val(_this.transitionND(data.twoMonthAlbuminuria)); //近两个月蛋白尿（g/d）
  $(".serum-creatinine1").val(_this.transitionND(data.twoMonthScr1)); //近两个月血肌酐（mg/dl）
  $(".serum-creatinine2").val(_this.transitionND(data.twoMonthScr2)); //近两个月血肌酐（umol/L）
  this.renderOtherExamination(data.otherExamination); //其他检查项，数组

  if (data.normalEcg) {
    $("input[name='normalEcg']").eq(data.normalEcg - 1).attr("checked", true);
  }
  if (data.haveClinicalMeaning) {
    $("input[name='haveClinicalMeaning']")
      .eq(data.haveClinicalMeaning - 1)
      .attr("checked", true);
  }
  $(".ecgDesc").val(data.ecgDesc);
  if (data.testGroup) {
    $("input[name='testGroup']").eq(data.testGroup - 1).attr("checked", true);
  }

  $(".triglycerideAfter").val(_this.transitionND(data.triglycerideAfter));

  $(".hdlcLevelAfter").val(_this.transitionND(data.hdlcLevelAfter));
  $(".hba1cAfter").val(_this.transitionND(data.hba1cAfter));
  $(".totalCholesterolLevelAfter").val(
    _this.transitionND(data.totalCholesterolLevelAfter)
  );
  this.renderOtherExamination2(data.otherExaminationAfter);
  $(".lastTestDate").val(data.lastTestDate);

  if (data.exerciseRiskHappened) {
    $("input[name='exerciseRiskHappened']")
      .eq(data.exerciseRiskHappened - 1)
      .attr("checked", true);
  }
  if (data.testFinished) {
    $("input[name='testFinished']")
      .eq(data.testFinished - 1)
      .attr("checked", true);
  }
  if (data.exerciseRiskHappened == 1) {
    _this.renderNo();
  }
  if (data.exerciseRiskResolved) {
    $("input[name='exerciseRiskResolved']")
      .eq(data.exerciseRiskResolved - 1)
      .attr("checked", true);
  }
  if (data.testFinished == 2) {
    _this.renderNoTwo();
  }
  $(".stopTestDate").val(data.stopTestDate);
  $("input[name='whoSuggestStop']")
    .eq(data.whoSuggestStop - 1)
    .attr("checked", true);
  $(".whoSuggestStopCustom").val(data.whoSuggestStopCustom);

  if (data.notFinishReason) {
    $("input[name='notFinishReason']")
      .eq(data.notFinishReason - 1)
      .attr("checked", true);
  }
  $(".notFinishReasonCustom").val(data.notFinishReasonCustom);
};
$(".height").on("blur", function() {
  bin($(".height").val(), $(".weight").val());
});

$(".weight").on("blur", function() {
  bin($(".height").val(), $(".weight").val());
  var prev = $(this).prev();
  if (prev) {
    var val = $(this).val();
    if (/^[0-9]+$/.test(val)) {
      prev.removeClass("avtive");
    } else {
      prev.addClass("avtive");
    }
  }
});
function bin(height, weight) {
  if (height && weight) {
    height = (height / 100).toFixed(2);
    if (weight > 0 && height > 0) {
      var bmi = (weight / height / height).toFixed(1);
      $(".bmi").text(bmi);
    } else {
      $(".bmi").text("0");
    }
  } else {
    $(".bmi").text("0");
  }
}

CommonReportDetail.prototype.checkdToFun = function(str, ele) {
  if (str != null) {
    var cutStr = str.substr(1, str.length - 2);
    var cutStrArr = cutStr.split(",");
    var element = "input[name=" + ele + "]";
    for (var i = 0; i < cutStrArr.length; i++) {
      $(element).eq(parseInt(cutStrArr[i] - 1)).attr("checked", true);
    }
  }
};

CommonReportDetail.prototype.checkdToString = function(elements) {
  var arr = [];
  for (var i = 0; i < elements.length; i++) {
    arr.push(elements[i].value);
  }
  return this.arrayToString(arr);
};
CommonReportDetail.prototype.arrayToString = function(arr) {
  if (arr.length == 0) {
    return "";
  } else {
    return "," + arr.join(",") + ",";
  }
};
CommonReportDetail.prototype.call = function() {
  var _this = this;
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var customerId = window.localStorage.getItem("customerUUID");
  var sendData = {
    customerId: customerId
  };
  var reqUrl = "caseReport/get";
  $.ajax({
    type: "POST",
    url: window.urlHandler(reqUrl, uuid, token),
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(sendData),
    success: function(data) {
      if (data.status == 200) {
        var dataS = data.datas;
        _this.getDataS(dataS);
        _this.getData(dataS);
      } else {
      }
    },
    error: function() {
      swal({
        title: "保存失败，请核查填入内容！",
        type: "info",
        showConfirmButton: true,
        confirmButtonText: "确定",
        timer: 2000,
        confirmButtonColor: "#009CAA"
      });
    }
  });
};
CommonReportDetail.prototype.getOtherExaminationArr = function(ele) {
    var otherExaminationArr = [];
    for (var i = 0; i < ele.length; i++) {
        var eleItem = $(ele[i]).val();
        if (eleItem != "" && eleItem != null) {
            otherExaminationArr.push($(ele[i]).val());
        }
    }
    return otherExaminationArr;

};
CommonReportDetail.prototype.renderOtherExamination = function(arr) {
    if (arr != null) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != null && arr[i] != "") {
                if (i > 0) {
                    var inspectionItem =
                        '<li><span class="add-inspection-item-btn" style="width:22px;display:inline-block;"></span><span class="item-label" style="padding-right:13px;">其他检查项</span><input type="text" class="otherExamination" maxlength="100"></li>';
                    $(inspectionItem).appendTo(".other-inspection-items-list");
                }
                $(".other-inspection-items-list li").eq(i).find("input").val(arr[i]);
            }
        }
    }
};
CommonReportDetail.prototype.renderOtherExamination2 = function(arr) {
    if (arr != null) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != null && arr[i] != "") {
                if (i > 0) {
                    var inspectionItem =
                        '<li><span class="add-inspection-item-btn2" style="width:22px;display:inline-block;"></span><span class="item-label" style="padding-right:13px;">其他检查项</span><input type="text" class="otherExamination2" maxlength="100"></li>';
                    $(inspectionItem).appendTo(".other-inspection-items-list2");
                }
                $(".other-inspection-items-list2 li").eq(i).find("input").val(arr[i]);
            }
        }
    }
};
CommonReportDetail.prototype.requestToSave = function() {
  var _this = this;
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var customerId = window.localStorage.getItem("customerUUID");
  var reqUrl = "caseReport/saveInspection";

  var sendData = {
    customerId: customerId,
    hba1c: this.judgeND($(".hba1c").val()),
    totalCholesterolLevel: this.judgeND($(".totalCholesterolLevel").val()),
    triglyceride: this.judgeND($(".triglyceride").val()),
    hdlcLevel: this.judgeND($(".hdlcLevel").val()),
    oneMonthGlu: this.judgeND($(".fasting-blood-glucose ").val()), //近一月空腹血糖（mmol/L）
    twoMonthAlbuminuria: this.judgeND($(".proteinuria").val()), //近两个月蛋白尿（g/d）
    twoMonthScr1: this.judgeND($(".serum-creatinine1").val()), //近两个月血肌酐（mg/dl）
    twoMonthScr2: this.judgeND($(".serum-creatinine2").val()), //近两个月血肌酐（umol/L）
    otherExamination: this.getOtherExaminationArr($(".otherExamination")), //其他检查项，数组
    normalEcg: $("input[name='normalEcg']:checked").val(),
    haveClinicalMeaning: $("input[name='haveClinicalMeaning']:checked").val(),
    ecgDesc: $(".ecgDesc").val()
  };
  $.ajax({
    type: "POST",
    url: window.urlHandler(reqUrl, uuid, token),
    dataType: "json",
    data: JSON.stringify(sendData),
    contentType: "application/json",
    success: function(data) {
      if (data.status == 200) {
        swal({
          title: "提示",
          text: "保存成功！",
          type: "success",
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        swal({
          title: "提示",
          text: data.info,
          type: "info",
          showConfirmButton: true,
          confirmButtonText: "确定",
          confirmButtonColor: "#009CAA"
        });
      }
    },
    error: function() {
      swal({
        title: "保存失败，请核查填入内容！",
        type: "info",
        showConfirmButton: true,
        confirmButtonText: "确定",
        timer: 2000,
        confirmButtonColor: "#009CAA"
      });
    }
  });
};
CommonReportDetail.prototype.requestToSaveProject = function() {
  var _this = this;
  var testGroup = $("input[name='testGroup']:checked").val();
  var testProject = 4;
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var customerId = window.localStorage.getItem("customerUUID");
  var reqUrl = "caseReport/saveGroup";
  var sendData = {
    customerId: customerId,
    testGroup: testGroup,
    testProject: testProject
  };
  $.ajax({
    type: "POST",
    url: window.urlHandler(reqUrl, uuid, token),
    dataType: "json",
    data: JSON.stringify(sendData),
    contentType: "application/json",
    success: function(data) {
      if (data.status == 200) {
        swal({
          title: "提示",
          text: "保存成功！",
          type: "success",
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        swal({
          title: "提示",
          text: data.info,
          type: "info",
          showConfirmButton: true,
          confirmButtonText: "确定",
          confirmButtonColor: "#009CAA"
        });
      }
    },
    error: function() {
      swal({
        title: "保存失败，请核查填入内容！",
        type: "info",
        showConfirmButton: true,
        confirmButtonText: "确定",
        timer: 2000,
        confirmButtonColor: "#009CAA"
      });
    }
  });
};
CommonReportDetail.prototype.summarizeFun = function() {
  var _this = this;
  var triglycerideAfter = _this.judgeND($(".triglycerideAfter").val());
  var hdlcLevelAfter = _this.judgeND($(".hdlcLevelAfter").val());
  var hba1cAfter = _this.judgeND($(".hba1cAfter").val());
  var totalCholesterolLevelAfter = _this.judgeND(
    $(".totalCholesterolLevelAfter").val()
  );
  var lastTestDate = $(".lastTestDate").val();
  var exerciseRiskHappened = $(
    "input[name='exerciseRiskHappened']:checked"
  ).val();
  var testFinished = $("input[name='testFinished']:checked").val();
  var exerciseRiskResolved = $(
    "input[name='exerciseRiskResolved']:checked"
  ).val(); //弹出
  var stopTestDate = $(".stopTestDate").val(); //弹出
  var whoSuggestStop = $("input[name='whoSuggestStop']:checked").val();
  var whoSuggestStopCustom = $(".whoSuggestStopCustom").val();
  var notFinishReason = $("input[name='notFinishReason']:checked").val();
  var notFinishReasonCustom = $(".notFinishReasonCustom").val();
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var customerId = window.localStorage.getItem("customerUUID");
  var sendData = {
    customerId: customerId,
    triglycerideAfter: triglycerideAfter,
    hba1cAfter: hba1cAfter,
    hdlcLevelAfter: hdlcLevelAfter,
    totalCholesterolLevelAfter: totalCholesterolLevelAfter,
    otherExaminationAfter:this.getOtherExaminationArr($(".otherExamination2")),
    lastTestDate: lastTestDate,
    exerciseRiskHappened: exerciseRiskHappened,
    testFinished: testFinished,
    exerciseRiskResolved: exerciseRiskResolved,
    stopTestDate: stopTestDate,
    whoSuggestStop: whoSuggestStop,
    whoSuggestStopCustom: whoSuggestStopCustom,
    notFinishReason: notFinishReason,
    notFinishReasonCustom: notFinishReasonCustom
  };
  var reqUrl = "caseReport/saveSummary";
  $.ajax({
    type: "POST",
    url: window.urlHandler(reqUrl, uuid, token),
    dataType: "json",
    data: JSON.stringify(sendData),
    contentType: "application/json",
    success: function(data) {
      if (data.status == 200) {
        swal({
          title: "提示",
          text: "保存成功！",
          type: "success",
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        swal({
          title: "提示",
          text: data.info,
          type: "info",
          showConfirmButton: true,
          confirmButtonText: "确定",
          confirmButtonColor: "#009CAA"
        });
      }
    },
    error: function() {
      swal({
        title: "保存失败，请核查填入内容！",
        type: "info",
        showConfirmButton: true,
        confirmButtonText: "确定",
        timer: 2000,
        confirmButtonColor: "#009CAA"
      });
    }
  });
};
CommonReportDetail.prototype.getDataS = function(dataS) {
  if (dataS.userNameInitial != null) {
    var userNameInitial = dataS.userNameInitial.split("");
    $(".container ul li").eq(4).find("input").eq(0).val(userNameInitial[0]);
    $(".container ul li").eq(4).find("input").eq(1).val(userNameInitial[1]);
    $(".container ul li").eq(4).find("input").eq(2).val(userNameInitial[2]);
    $(".container ul li").eq(4).find("input").eq(3).val(userNameInitial[3]);
  }
  var filterDate = $(".filterDate").val(dataS.filterDate);
  var testNo = $(".testNo").val(dataS.testNo);
  var testDate = $(".testDate").val(dataS.testDate);
};
CommonReportDetail.prototype.renderNo = function() {
  var html = "";
  html =
               '<div class="whether-the-risk">'
                                +'<span class="lable-name">如发生运动风险，是否均已解决</span>'
                                +'<input class="magic-radio" type="radio" name="exerciseRiskResolved" id="yes-52" value="1"/>'
                                +'<label style="margin-right:11px;" for="yes-52">是</label>'
                                +'<input class="magic-radio"  type="radio" name="exerciseRiskResolved" id="no-52" value="2"/>'
                                +'<label for="no-52" style="margin-right:15px;">否</label><b>(如否，应监测运动风险直到稳定或解决)</b>'
                            +'</div>'
            ;
  $(".risk-hide").append(html);
};
CommonReportDetail.prototype.renderNoTwo = function() {
  var html = "";
  html = '<div class="risk-hide-tow" style="margin-left: 50px;">'+'<li>'
                                    +'<p style="margin-top:1%;">如否请填写以下项目：</p>'
                                    +'<span class="lable-name">(1).患者中止试验日期</span>'
                                    +'<div class="start-date-form form-inline">'
                                        +'<div class="daterange">'
                                            +'<input type="text" class="form-control stopTestDate" name="start-date">'
                                            +'<i style="color:#333;margin-right:0;" class="fa fa-close"></i>'
                                            +'<i style="color:#333;margin-right:0;" class="fa fa-calendar"></i>'
                                        +'</div>'
                                    +'</div>'
                                +'</li>'
                                +'<li>'
                                    +'<span class="lable-name">(2).首先提出中止试验的是(选择一个)</span>'
                                +'</li>'
                                +'<li style="margin-left:13%;">'
                                    +'<input class="magic-radio" type="radio" name="whoSuggestStop" id="yes-54" value="1"/>'
                                    +'<label style="margin-right:15px;" for="yes-54">患者</label>'
                                    +'<input class="magic-radio"  type="radio" name="whoSuggestStop" id="no-54" value="2"/>'
                                    +'<label for="no-54" style="margin-right:15px;">实验研究者</label>'
                                +'</li>'
                                +'<li>'
                                    +'<p style="display:inline-block;margin-left:13%;">若为其他，请指明</p>'
                                    +'<input type="text" class="rests whoSuggestStopCustom">'
                                +'</li>'
                                +'<li>'
                                    +'<span class="lable-name">(3).中止试验的主要原因(选择一个)</span>'
                                +'</li>'
                                +'<li style="margin-left:13%;">'
                                    +'<input class="magic-radio" type="radio" name="notFinishReason" id="yes-55" value="1"/>'
                                    +'<label style="margin-right:15px;" for="yes-55">运动风险</label>'
                                    +'<input class="magic-radio"  type="radio" name="notFinishReason" id="no-56" value="2"/>'
                                    +'<label for="no-56" style="margin-right:15px;">违背试验方案</label>'

                                    +'<input class="magic-radio"  type="radio" name="notFinishReason" id="no-57" value="3"/>'
                                    +'<label for="no-57" style="margin-right:15px;">改善不佳</label>'

                                    +'<input class="magic-radio"  type="radio" name="notFinishReason" id="no-58" value="4"/>'
                                    +'<label for="no-58" style="margin-right:15px;">失访(包括受试者自行退出)</label>'

                                    +'<input class="magic-radio"  type="radio" name="notFinishReason" id="no-59" value="5"/>'
                                    +'<label for="no-59" style="margin-right:15px;">患者撤回知情同意书</label>'
                                +'</li>'
                                +'<li>'
                                    +'<p style="display:inline-block;margin-left:13%;">其他，其他原因</p>'
                                    +'<input type="text" class="rests notFinishReasonCustom">'
                                +'</li>'
                                +'</div>';
  $(".reveal-tow").append(html);
  var _this = this;
  $(document).ready(function() {
    $(".stopTestDate").daterangepicker({
      autoUpdateInput: false,
      singleDatePicker: true,
      locale: {
        applyLabel: "确定",
        cancelLabel: "清空",
        fromLabel: "起始时间",
        toLabel: "结束时间",
        customRangeLabel: "自定义",
        daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ],
        firstDay: 1
      }
    });
    $(".stopTestDate").on("apply.daterangepicker", function(ev, picker) {
      $(this).val(picker.startDate.format("YYYY-MM-DD"));
    });
  });
};
$(".userNameInitial").blur(function() {
  var oldValue = "";
  if (!this.value.match(/^[a-zA-Z]$/)) {
    this.value = oldValue;
  }
  oldValue = this.value;
});

function funVerifyNumber(i) {
  var cls = ".containerDiv" + i + " .verifyNumber-nd";
  var result = true;
  $(cls).each(function(index, o) {
    var $target = $(o);
    if ($target) {
      var val = $target.val();
      if (!val || !/^(ND|\d+(.\d{1,2})?)$/i.test(val)) {
        result = false;
        var prev = $target.prev();
        if (prev) {
          prev.addClass("avtive");
        }
      }
    }
  });
  return result;
}
function funVerifyNumberNd(i) {
  var cls = ".containerDiv" + i + " .verifyNumber";
  var result = true;
  $(cls).each(function(index, o) {
    var $target = $(o);
    if ($target) {
      var val = $target.val();
      if (!val || !/^[0-9]+$/.test(val)) {
        result = false;
        var prev = $target.prev();
        if (prev) {
          prev.addClass("avtive");
        }
      }
    }
  });
  return result;
}

CommonReportDetail.prototype.bind = function() {
  var _this = this;
  $(".save-btn-1 a").on("click", function(e) {
    e.preventDefault();
    var val = $("input[name='testNo']").val();
    _this.strData();
  });
  $(".save-btn-2 a").on("click", function(e) {
    e.preventDefault();
    _this.clinicalQuestionnaire();
  });
  $(".verifyNumber-nd").on("blur", function(e) {
    var prev = $(this).prev();
    if (prev) {
      var val = $(this).val();
      if (val && /^(ND|\d+(.\d{1,2})?)$/i.test(val)) {
        prev.removeClass("avtive");
      } else {
        prev.addClass("avtive");
      }
    }
  });
    $(".verifyNumber-integer").on("blur", function(e) {
        var prev = $(this).prev();
        if (prev) {
            var val = $(this).val();
            if (val && /^(ND|\d+([0-9])+$)/.test(val)) {
                prev.removeClass("avtive");
            } else {
                prev.addClass("avtive");
            }
        }
    });


  $(".verifyNumber-nd2").on("blur", function(e) {
    var prev = $(this).parent().find(".lable-name");
    if (prev) {
      var val = $(this).val();
      if (val && /^(ND|\d+(.\d{1,2})?)$/i.test(val)) {
        prev.removeClass("avtive");
      } else {
        prev.addClass("avtive");
      }
    }
  });
  $(".verifyNumber").on("blur", function(e) {
    var prev = $(this).prev();
    if (prev) {
      var val = $(this).val();
      if (/^[0-9]+$/.test(val)) {
        prev.removeClass("avtive");
      } else {
        prev.addClass("avtive");
      }
    }
  });
    $(".verifyNumber_decimals").on("blur", function(e) {
        var prev = $(this).prev();
        if (prev) {
            var val = $(this).val();
            if (/^\d+(\.\d{1})?$/.test(val)) {
                prev.removeClass("avtive");
            } else {
                prev.addClass("avtive");
            }
        }
    });

  $("input[name='testNo']").on("blur", function(e) {
    var val = $(this).val();
    var conntent = $(".testNoContent");
    if (val && /^[0-9]+(([.]*[0-9]+)|[0-9]*)$/.test(val)) {
      conntent.removeClass("avtive");
    } else if (val == "") {
      conntent.removeClass("avtive");
    } else {
      conntent.addClass("avtive");
    }
  });

  $(".save-btn-3 a").on("click", function(e) {
    e.preventDefault();
    if (!funVerifyNumber(3)) {
      return;
    }
    if (!funVerifyNumberNd(3)) {
      return;
    }
    _this.requestToSave();
  });
  $(".save-btn-4 a").on("click", function(e) {
    e.preventDefault();
    if (!funVerifyNumber(4)) {
      return;
    }
    if (!funVerifyNumberNd(3)) {
      return;
    }
    _this.summarizeFun();
  });
  $(".save-btn-5 a").on("click", function(e) {
    e.preventDefault();
    _this.requestToSaveProject();
  });
  $("#yes-51").on("click", function() {
    if ($("#yes-51").val() == 1) {
      if ($(".whether-the-risk").length < 1) {
        _this.renderNo();
      }
    }
  });
  $("#no-51").on("click", function() {
    if ($("#no-51").val() == 2) {
      $(".whether-the-risk").remove();
    }
  });
  $("#no-53").on("click", function() {
    if ($("#no-53").val() == 2) {
      if ($(".risk-hide-tow").length < 1) {
        _this.renderNoTwo();
      }
    }
  });
  $("#yes-53").on("click", function() {
    if ($("#yes-53").val() == 1) {
      $(".risk-hide-tow").remove();
    }
  });
    $(".add-inspection-item-btn").on("click", function() {
        if ($(".other-inspection-items-list li").length < 10) {
            var inspectionItem =
                '<li><span class="add-inspection-item-btn" style="width:22px;display:inline-block;"></span><span class="item-label" style="padding-right:13px;">其他检查项</span><input type="text" class="otherExamination" maxlength="100"></li>';
            $(inspectionItem).appendTo(".other-inspection-items-list");
        }
    });

    $(".add-inspection-item-btn2").on("click", function() {
        if ($(".other-inspection-items-list2 li").length < 10) {
            var inspectionItem =
                '<li><span class="add-inspection-item-btn2" style="width:22px;display:inline-block;"></span><span class="item-label" style="padding-right:13px;">其他检查项</span><input type="text" class="otherExamination2" maxlength="100"></li>';
            $(inspectionItem).appendTo(".other-inspection-items-list2");
        }
    });

  $(".serum-creatinine1").on("change", function() {
    var res = $(this).val();
    if (res.toUpperCase() == "ND") {
      $(".serum-creatinine2").val(res);
    } else {
      var reg = /[\d]/g;
      if (!reg.test(res)) {
        $(".serum-creatinine1").val("");
        $(".serum-creatinine2").val("");
      } else {
        $(".serum-creatinine2").val((parseInt(res) * 88.4).toFixed(0));
      }
    }
  });

  $(".serum-creatinine2").on("change", function() {
    var res = $(this).val();
    if (res.toUpperCase() == "ND") {
      $(".serum-creatinine1").val(res);
    } else {
      var reg = /[\d]/g;
      if (!reg.test(res)) {
        $(".serum-creatinine1").val("");
        $(".serum-creatinine2").val("");
      } else {
        $(".serum-creatinine1").val((parseInt(res) / 88.4).toFixed(2));
      }
    }
  });
  $('.without').on('click',function(){
    if($(this).is('checked')==false){
        $('.topic').attr('checked',false);
    }
  })
  $('.topic').on('click',function(){
    if($(this).is('checked')==false){
        $('.without').attr('checked',false);
    }
  })
  $('.without-tow').on('click',function(){
    if($(this).is('checked')==false){
        $('.topic-tow').attr('checked',false);
    }
  })
    $('.topic-tow').on('click',function(){
      if($(this).is('checked')==false){
          $('.without-tow').attr('checked',false);
      }
    })
    $('.chronic-heart').on('click',function(){
      if($(this).is('checked')==false){
        $('.check').attr('checked',false);
      }
    })
    $('.check').on('click',function(){
      if($(this).is('checked')==false){
          $('.chronic-heart').attr('checked',false);
      }
    })
};
new CommonReportDetail();
